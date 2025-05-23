/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Typography,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import Layout from "../../layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../../utils/url";
import productContext from "../../context/productContext/productContext";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useContext(productContext);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}product/allproducts`);
      // console.log(data);
      if (data.success) {
        setProducts(data.allproducts);
        console.log("data = ", data.allproducts);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error occured");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  // useEffect(() => {
  //   console.log("products = ", products);
  // }, []);

  const remove = async (id) => {
    const token = JSON.parse(localStorage.getItem("auth")).token;

    try {
      setLoading(true);

      let { data } = await axios.delete(`${url}product/delete-product/${id}`, {
        headers: {
          authorization: `${token}`,
        },
      });
      // console.log(deletedproduct);
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [remove]);

  return (
    <>
      <Layout title={"Admin Dashboard"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {products.length !== 0 ? (
              <>
                <Typography
                  variant="h4"
                  gutterBottom
                  align="center"
                  sx={{ marginTop: "1vw" }}
                >
                  All Products
                </Typography>
                <Box sx={{ width: "95vw", margin: "auto" }}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ textAlign: "center" }}>
                            Img
                          </TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product._id}>
                            <TableCell>
                              <CardMedia
                                component="img"
                                alt={product.bookname}
                                image={`${product.img}`}
                                title={product.bookname}
                                sx={{
                                  width: { xs: "5rem", md: "9rem" },
                                  height: { md: "8rem" },
                                  margin: "auto",
                                }}
                              />
                            </TableCell>
                            <TableCell>{product.bookname}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>
                              <Button onClick={() => remove(product._id)}>
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </>
            ) : (
              <>
                <Typography
                  variant="h4"
                  gutterBottom
                  align="center"
                  sx={{ marginTop: "1vw" }}
                >
                  No Products
                </Typography>
              </>
            )}
          </>
        )}
      </Layout>
    </>
  );
};

export default Dashboard;
