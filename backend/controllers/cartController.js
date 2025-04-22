import userModel from "../models/User.js";
import productModel from "../models/Product.js";

export const add = async (req, res) => {
  try {
    const { quantity } = req.body;
    const id = req.params.pid;
    const product = await productModel.findById(id);
    const user = await userModel.findOne({ username: req.user.username });
    if (!user) {
      res.send({
        success: false,
        message: "Please log in",
      });
    }
    let item = user.cartData.find((i) => i.id === id);
    if (item) {
      item.quantity++;
    } else {
      user.cartData.push({
        id: product.id,
        bookname: product.bookname,
        price: product.price,
        quantity: quantity,
      });
    }
    await user.save();
    res.send({
      success: true,
      message: "Added to cart",
      user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    // const { userId, id } = req.query;
    // const user = await userModel.findById(userId);
    const id = req.params.pid;
    const user = await userModel.findOne({ username: req.user.username });
    user.cartData = user.cartData.filter((i) => i.id !== id);
    await user.save();
    res.send({
      success: true,
      message: "Item removed",
      user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error,
    });
  }
};

export const removeAll = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.user.username });
    user.cartData = [];
    await user.save();
    res.send({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.send({
      success: false,
      message: error,
    });
  }
};

export const allData = async (req, res) => {
  try {
    let userData = await userModel.findOne({ username: req.user.username });
    let cartData = userData.cartData;
    res.send({
      success: true,
      message: "Cart details",
      cartData,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error,
    });
  }
};
