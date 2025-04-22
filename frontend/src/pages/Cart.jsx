import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Layout from "../layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { url } from "../utils/url";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("auth")).token;

  const cartData = async () => {
    try {
      const { data } = await axios.get(`${url}cart/all`, {
        headers: {
          authorization: `${token}`,
        },
      });
      if (data.success) {
        setCartItems(data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cartData();
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const total = getTotalPrice();

  const remove = async (id) => {
    try {
      const { data } = await axios.delete(`${url}cart/remove/${id}`, {
        headers: {
          authorization: `${token}`,
        },
      });
      if (data.success) {
        setCartItems(data.user.cartData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlepayment = async () => {
    const orderdata = {
      items: cartItems,
      amount: total,
    };
    try {
      let { data } = await axios.post(`${url}order/create-order`, orderdata, {
        headers: {
          authorization: `${token}`,
        },
      });
      let options = {
        key: import.meta.env.VITE_RZP_KEY,
        amount: total * 100,
        name: "Book store",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data.razoppayOrderId,
        callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        prefill: {
          name: data.newOrder.userId,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      toast.success(data.message);
      navigate("/order");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Container>
        {cartItems.length > 0 ? (
          <div>
            <Typography variant="h4" component="h1" gutterBottom>
              Shopping Cart
            </Typography>
            <Grid container spacing={4}>
              {cartItems.map((item) => (
                <Grid item key={item._id} xs={12} md={6}>
                  <Card>
                    <Grid container>
                      <Grid item xs={8}>
                        <CardContent>
                          <Typography variant="h5" component="h2">
                            {item.bookname}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            RS. {item.price} x {item.quantity}
                          </Typography>
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginTop: "10px" }}
                            onClick={() => remove(item.id)}
                          >
                            Remove
                          </Button>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box mt={4}>
              <Typography variant="h5">Total: RS. {total}</Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
                onClick={handlepayment}
              >
                Checkout
              </Button>
            </Box>
          </div>
        ) : (
          <Typography variant="h4">Cart is empty</Typography>
        )}
      </Container>
    </Layout>
  );
};

export default CartPage;
