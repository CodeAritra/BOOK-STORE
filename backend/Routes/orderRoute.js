import express from "express";
import { isAdmin, isLoggedIn } from "../middlewares/auth.js";
import {
  createOrder,
  getallorder,
  userOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-order", isLoggedIn, createOrder);
router.get("/user", isLoggedIn, userOrder);
router.get("/admin", isLoggedIn, isAdmin, getallorder);

export default router;
