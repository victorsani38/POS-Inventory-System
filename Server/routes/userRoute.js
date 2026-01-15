import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addUser, deleteUser, editUser, get, getUser } from "../controllers/user.js";



const router = express.Router();

router.post("/add", protect,addUser);
router.get("/", protect,getUser);
router.delete("/:id", protect,deleteUser);
router.get("/profile", protect,get);
router.put("/edit", protect,editUser);


export default router