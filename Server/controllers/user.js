
import transporter from "../db/email.js"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"


export const addUser = async(req, res) => {
    try{
    const {name, email, password, address, role} = req.body
    const existUser = await User.findOne({email})
    if(existUser){
    return res.status(401).json({success:false, message:"user already exist"})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
        name,
        email,
        password:hashedPassword,
        address,
        role
    })
    await user.save()
    const mailOptions = {
         from:process.env.EMAIL_SENDER,
        to:email,
        subject:"Welcome to AUTH-MERN",
        html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background: #f9f9f9; border: 1px solid #eee;">
      <div style="text-align: center; padding-bottom: 20px;">
        <h1 style="color: #4F46E5;">Welcome to AUTH-MERN 🎉</h1>
      </div>
      <div style="background: #ffffff; padding: 20px; border-radius: 8px;">
        <p style="font-size: 16px; color: #333;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 15px; color: #333;">We’re thrilled to have you on board! Your account has been successfully created with this email:</p>
        <p style="font-size: 16px; color: #4F46E5;"><strong>${email}</strong></p>
        <p style="font-size: 15px; color: #333;">You can now log in and explore our features.</p>

        <div style="text-align: center; margin-top: 30px;">
          <a href="http://localhost:4000/login" style="background-color: #4F46E5; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold;">Go to Dashboard</a>
        </div>

        <p style="font-size: 13px; color: #777; margin-top: 30px;">If you didn’t create this account, please ignore this message.</p>
      </div>
      <div style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
        <p>© ${new Date().getFullYear()} AUTH-MERN. All rights reserved.</p>
      </div>
    </div>
  `,
    }

    await transporter.sendMail(mailOptions)
    return res.status(201).json({success:true, message:"New user added"})
    }
    catch(error){
    return res.status(500).json({success:false, message:"Server error"})
    }
}

export const getUser = async(req, res)=> {
    try{
    const users = await User.find()
     return res.status(200).json({success:true, users})
    }
    catch(error){
     return res.status(500).json({success:false, message:"Server error"})
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


export const deleteUser = async(req, res)=> {
    try{
    const {id} = req.params
    const existUser = await User.find()
    if(!existUser){
    return res.status(404).json({success:false, message:"User not found"})
    }
    await User.findByIdAndDelete(id)
     return res.status(200).json({success:true, message:"user deleted"}) 
    }
    catch(error){
     return res.status(500).json({success:false, message:"Server error"})   
    }
}

export const editUser = async(req, res)=> {
    const {name, address, email, password} = req.body
    try{
    const user = req.user
    if(!user){
    return res.status(404).json({success:false, message:"user not found"})
    }
    if(user){
    user.name = name
    user.email = email
    user.address = address
    }
    if(password&&password.trim() !==""){
        const hashedPassword = await bcrypt.hash(password.trim(), 10)
        user.password = hashedPassword
    }
    await user.save()
    return res.status(200).json({success:true, message:"user updated successfully"})
    }
    catch(error){
        console.log(error)
    return res.status(500).json({success:false, message:"server error"})
    }
}