import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Processing" },
    payment: { type: Boolean, default: false },
    razorpayOrderId:{type:String}
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order",orderSchema)
export default orderModel