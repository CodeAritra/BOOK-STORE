import { useState, useEffect, useContext } from "react";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../utils/url";
import ProductContext from "../context/productContext/productContext";
import Loader from "../components/Loader";

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([1]);
  const { searchQuery, loading, setLoading } = useContext(ProductContext);

  //fetch all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}product/allproducts`);
      if (data.success) {
        setProducts(data.allproducts);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        if (searchQuery.trim()) {
          const { data } = await axios.get(
            `${url}product/search?query=${searchQuery}`
          );
          console.log("data = ", data);

          setResults(data.products);
          setLoading(false);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);

        toast.error("Product not found");
      }
    };

    fetchResults();
  }, [searchQuery]);

  //handle quantity
  const handleQuantityChange = (productId, amount) => {
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + amount),
    }));
  };

  const addToCart = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${url}cart/add/${id}`, {
        quantity: quantity[id],
      });
      if (data.success) {
        setLoading(false);
        toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Please login")
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Loading = ", loading);
  }, [loading]);

  return (
    <>
      <Layout title={"Book Store"}>
        {loading && <Loader />}
        <Container sx={{ marginTop: "1rem" }}>
          <Grid container spacing={4}>
            {(results.length > 0 ? results : products).map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Card>
                  <CardActionArea>
                    <Box sx={{ height: "200px" }}>
                      <CardMedia
                        component="img"
                        alt={product.bookname}
                        image={`${product.img}`}
                        title={product.bookname}
                        style={{
                          height: "200px",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                    <CardContent sx={{ height: "150px" }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.bookname}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          sx={{ marginTop: "9px" }}
                        >
                          Rs. {product.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          onClick={() => handleQuantityChange(product._id, 1)}
                          component="p"
                        >
                          {quantity[product._id] || 1}
                          <IconButton>
                            <AddIcon />
                          </IconButton>
                        </Typography>
                      </Box>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => addToCart(product._id)}
                        >
                          Add to Cart
                        </Button>
                      </CardActions>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default HomePage;
