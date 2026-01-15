import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addSupplier, deleteSupplier, getSupplier, updateSupplier } from "../controllers/supplier.js";


const router = express.Router();

router.post("/add", protect,addSupplier);
router.get("/", protect,getSupplier);
router.put("/:id", protect,updateSupplier);
router.delete("/:id", protect,deleteSupplier);


export default router