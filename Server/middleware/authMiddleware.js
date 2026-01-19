import jwt from "jsonwebtoken"
import User from "../models/userModel.js";

export const protect = async(req, res, next) => {
    try{
    const token = req.cookies.token
    if(!token){
    return res.status(401).json({success:false, message:"User not authorized"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded){
    return res.status(500).json({success:false, message:"invalid token"})
    }
    const user = await User.findById(decoded.id).select("-password")
    if(!user){
     return res.status(404).json({success:false, message:"user not found"})
      } 
      req.user = user
      next()
    }
    catch(error){
    console.error("middleware error", error.message)
    return res.status(500).json({success:false, message:"server error"})
    }
}
