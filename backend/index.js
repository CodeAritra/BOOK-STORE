// import { configDotenv } from "dotenv";
// configDotenv();
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import UserRoute from "./Routes/UserRoute.js"
import productRoute from "./Routes/productRoute.js"
import cartRoute from "./Routes/cartRoute.js"
import orderRoute from "./Routes/orderRoute.js"
import path from "path"
import { fileURLToPath } from 'url';

connectDB();

const app = express();
const PORT = parseInt(process.env.PORT);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/auth/',UserRoute)
app.use('/product/',productRoute)
app.use("/cart/",cartRoute)
app.use("/order/",orderRoute)

app.get("/", (req, res) => {
  res.send("HIIIII");
});

try {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.log("error = " + error);
}
