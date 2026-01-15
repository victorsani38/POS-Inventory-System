import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addOrder, getOrder } from "../controllers/order.js";



const router = express.Router();

router.post("/add", protect,addOrder);
router.get("/", protect,getOrder);



export default router