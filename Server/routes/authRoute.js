import express from "express";
import { get, login, logout } from "../controllers/auth.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/login", login);
router.get("/profile", protect, get);
router.post("/logout", logout)

export default router