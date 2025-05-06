import { useContext, useState } from "react";
import Layout from "../../layout/Layout";
import { TextField, Button, Paper, Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import img from "../../../assests/default_product_image.png";
import { url } from "../../utils/url";
import productContext from "../../context/productContext/productContext";
import Loader from "../../components/Loader";

const Createproduct = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    bookname: "",
    quantity: "",
    price: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);
  const { loading, setLoading } = useContext(productContext);

  const handlechange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("auth")).token;

    const formData = new FormData();
    formData.append("bookname", productData.bookname);
    formData.append("quantity", productData.quantity);
    formData.append("price", productData.price);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    console.log("Form = ", formData);

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${url}product/create-product`,
        formData,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <Layout title={"Admin Create Product"}>
      {loading && <Loader/>}
      <Paper style={{ padding: "16px", margin: "16px" }}>
        <Typography variant="h6" gutterBottom>
          Create Product
        </Typography>
        <form onSubmit={handlesubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box mt={2}>
                <img
                  src={image || img}
                  alt="Image Preview"
                  style={{
                    maxHeight: "140px",
                    maxWidth: "100%",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="Name"
                name="bookname"
                fullWidth
                onChange={handlechange}
                value={productData.bookname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                name="price"
                fullWidth
                onChange={handlechange}
                value={productData.price}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock"
                name="quantity"
                fullWidth
                onChange={handlechange}
                value={productData.quantity}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Create Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Layout>
  );
};

export default Createproduct;
