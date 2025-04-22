import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    bookname: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    img: { type: String},
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);
export default productModel;
