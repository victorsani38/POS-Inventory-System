import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    address:{type:String},
    role:{type:String, enum:["admin", "customer"], default:"customer"}

})

const User = new mongoose.model("User", UserSchema)
export default User