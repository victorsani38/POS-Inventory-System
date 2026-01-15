import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addCategory, deleteCategory, getCategory, updateCategory } from "../controllers/category.js";


const router = express.Router();

router.post("/add", protect,addCategory);
router.get("/", protect,getCategory);
router.put("/:id", protect,updateCategory);
router.delete("/:id", protect,deleteCategory);


export default router