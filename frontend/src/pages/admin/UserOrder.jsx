import { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { url } from "../../utils/url";
import productContext from "../../context/productContext/productContext";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const { loading, setLoading } = useContext(productContext);

  const getUserOrder = async () => {
    const token = JSON.parse(localStorage.getItem("auth")).token;
    console.log("token = ", token);

    try {
      setLoading(true);
      const { data } = await axios.get(`${url}order/admin`, {
        headers: {
          auhtoriztaion: `${token}`,
        },
      });
      if (data.success) {
        setOrders(data.order);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error occured");
    }
  };
  useEffect(() => {
    getUserOrder();
  }, []);

  return (
    <Layout title={"User Orders"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {orders.length !== 0 ? (
            <>
              <Typography
                variant="h4"
                gutterBottom
                align="center"
                sx={{ marginTop: "1vw" }}
              >
                All Orders
              </Typography>
              <Box sx={{ width: "95vw", margin: "auto" }}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell>{order.userId}</TableCell>
                          <TableCell key={order._id}>
                            {order.items.map((i, index) => (
                              <TableRow key={index}>{i.bookname}</TableRow>
                            ))}
                          </TableCell>
                          <TableCell>
                            {order.items.map((i, index) => (
                              <TableRow key={index}>{i.quantity}</TableRow>
                            ))}
                          </TableCell>
                          <TableCell>Rs. {order.amount}</TableCell>
                          <TableCell>{order.status}</TableCell>
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
                No Orders
              </Typography>
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default UserOrder;
