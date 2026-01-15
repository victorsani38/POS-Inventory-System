import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{type:String, required:true},
    des:{type:String},
    price:{type:Number, required:true},
    stock:{type:Number},
    currency:{type:String, enum:["NGN", "USD", "EUR"], default:"NGN"},
    categoryId:{type:mongoose.Schema.Types.ObjectId, ref:"Category", required:true},
    supplierId:{type:mongoose.Schema.Types.ObjectId, ref:"Supplier", required:true},
    isDeleted:{type:Boolean, default:false}

})

const Product = new mongoose.model("Product", ProductSchema)
export default Product