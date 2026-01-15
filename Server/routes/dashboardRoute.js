import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getData } from "../controllers/dashboard.js";




const router = express.Router();

router.get("/", protect,getData);



export default router