import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/userModel.js";


export const login = async(req, res) => {
    try{
    const {name, email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
    return res.status(404).json({success:false, error:"user not found"})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
     return res.status(401).json({success:false, error:"invalid credentials"})
    }
    const token = jwt.sign({id:user._id, role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token", token, {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"lax",
        maxAge:24*60*60*1000
    })
     return res.status(200).json({success:true, 
        message:"user login successfully",
        user:{...user._doc, password:undefined},
        token
    })
    }
    catch(error){
    return res.status(500).json({success:false, message:"server error"})
    }
}

export const get = async(req, res) => {
    try{
    const user = req.user
    if(!user){
     return res.status(404).json({success:false, message:"user not found"})
    }
     return res.status(200).json({success:true, user})
    }
    catch(error){
     return res.status(500).json({success:false, message:"server error"})
    }
}

export const logout = async(req, res) => {
    try{
    res.clearCookie("token",{
        httpOnly:true,
        seure:process.env.NODE_ENV === "production",
        sameSite:"lax"
    })
    return res.status(200).json({success:true, message:"user logged out successfully"})
    }
    catch(error){
     return res.status(500).json({success:false, message:"server error"})
    }
}