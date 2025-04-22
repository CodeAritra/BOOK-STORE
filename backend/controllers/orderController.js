import userModel from "../models/User.js";
import orderModel from "../models/order.js";
import Razorpay from "razorpay";
import { configDotenv } from "dotenv";

configDotenv();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEYID,
  key_secret: process.env.RAZORPAY_SECRETKEY,
});

export const createOrder = async (req, res) => {
  try {
    let user = await userModel.findOne({ username: req.user.username });
    const { items, amount } = req.body;

    // Create Razorpay order
    const razorpayOrderOptions = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_${new Date().getTime()}`,
    };

    const razorpayOrder = await razorpay.orders.create(razorpayOrderOptions);

    // Create new order in the database
    const newOrder = await orderModel.create({
      userId: user.username,
      items,
      amount,
      razorpayOrderId: razorpayOrder.id,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(user._id, { cartData: [] });
    user.order.push(newOrder);
    await user.save();

    res.send({
      success: true,
      message: "Order placed",
      newOrder,
      razorpayOrderId: razorpayOrder.id,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export const userOrder = async (req, res) => {
  const user = await userModel.findOne({ username: req.user.username });
  const orderData = user.order;
  res.send({ success: true, orderData });
};

export const getallorder = async (req, res) => {
  try {
    let order = await orderModel.find({});

    res.send({
      success: true,
      message: "order",
      order,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error,
    });
  }
};
