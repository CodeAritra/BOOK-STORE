/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import  { useContext, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import authContext from "../context/authContext/authContext";
import { url } from "../utils/url.js";


const LoginPage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(authContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${url}auth/login`,
        formData
      );
      //  console.log(data);
      if (data.success) {
        setAuth({ user: data.user, token: data.token });
        toast.success(data.message);
        navigate("/")
        const parsed = JSON.stringify(data);
        localStorage.setItem("auth", parsed);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);

//   useEffect(() => {
//     console.log(auth);
//   }, [auth]);

  return (
    <Layout>
      <Container maxWidth="xs" sx={{ marginTop: "1rem" }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Log In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            onChange={handleChange}
            value={formData.username}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Log In
          </Button>
        </Box>
        <Divider sx={{ my: 2 }}>OR</Divider>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default LoginPage;
