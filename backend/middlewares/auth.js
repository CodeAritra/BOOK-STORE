import userModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded
      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ message: "Not authorized, token failed", error });
    }
  }

  if (!token) {
    res.status(401).send({ message: "Not authorized, no token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findOne({username:req.user.username});
    if (user.role!==1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
        user
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "error in admin middleware",
      error,
    });
  }
};
