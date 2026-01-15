import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../controllers/products.js";
;


const router = express.Router();

router.post("/add", protect,addProduct);
router.get("/", protect,getProduct);
router.put("/:id", protect,updateProduct);
router.delete("/:id", protect,deleteProduct);


export default router