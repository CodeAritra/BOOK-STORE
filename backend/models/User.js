import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema({
  id: String,
  bookname: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: [cartItemSchema],
    order: [
      {
        type: Array,
      },
    ],
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", UserSchema);
export default userModel;
