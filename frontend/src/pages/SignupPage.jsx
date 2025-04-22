import  {  useState } from "react";
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
import axios from "axios";
import {toast} from "react-toastify";
import { url } from "../utils/url";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
        `${url}auth/signup`,
        formData
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  return (
    <Layout title={"Book Store - Sign Up"}>
      <Container maxWidth="xs" sx={{ marginTop: "1rem" }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            onChange={handleChange}
            value={formData.username}
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            onChange={handleChange}
            value={formData.email}
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
            Sign Up
          </Button>
        </Box>
        <Divider sx={{ my: 2 }}>OR</Divider>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Already have an account? <Link to="/login">Log In</Link>
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default SignupPage;
