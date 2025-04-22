import express from "express"
import {createProduct,updateProduct,deleteProduct,allproducts,product, searchProducts} from "../controllers/productController.js"
import {isAdmin,isLoggedIn} from "../middlewares/auth.js"
import upload from "../middlewares/multerConfig.js"

const router = express.Router()

router.post("/create-product",isLoggedIn,isAdmin,upload.single('image'),createProduct)
router.put("/update-product/:pid",isLoggedIn,isAdmin,updateProduct)
router.delete("/delete-product/:pid",isLoggedIn,isAdmin,deleteProduct)
router.get("/allproducts",allproducts)
router.get("/product/:slug",product)
router.get("/search",searchProducts)

export default router