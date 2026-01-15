import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    phone:{type:String, required:true},
    address:{type:String},

})

const Supplier = new mongoose.model("Supplier", SupplierSchema)
export default Supplier