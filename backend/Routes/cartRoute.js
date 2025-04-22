import express from "express";
import { add, allData, remove, removeAll } from "../controllers/cartController.js";
import {isLoggedIn} from "../middlewares/auth.js"

const router = express.Router()

router.post("/add/:pid",isLoggedIn,add)
router.delete("/remove/:pid",isLoggedIn,remove)
router.delete("/removeall",isLoggedIn,removeAll)
router.get("/all",isLoggedIn,allData)

export default router