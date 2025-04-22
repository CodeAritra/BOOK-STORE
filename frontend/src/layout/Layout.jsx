/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
const Layout = ({ children, title }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <Navbar />
      <main style={{ minHeight: "70vh", width: "97vw" }}>
        {children}
      </main>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Footer />
      </Box>
    </div>
  );
};

export default Layout;
