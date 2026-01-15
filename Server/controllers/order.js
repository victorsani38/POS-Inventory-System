import { populate } from "dotenv";
import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"


export const addOrder = async(req, res) => {
    try{
        console.log("✅ Request body:", req.body); 
        const {productId, quantity, total} = req.body
        const userId = req.user?._id
        const product = await Product.findById({_id:productId})
        if(!product){
        return res.status(404).json({success:false, error:"product not found"}) 
        }

        if(quantity > product.stock){
        return res.status(401).json({success:false, error:"quantity entered not available"}) 
        }else{
            product.stock -= parseInt(quantity)
        }
        await product.save()

        const OrderObj = new Order({
            customer:userId,
            product:productId,
            price:product.price,
            quantity,
            totalPrice:total
        })
        await OrderObj.save()
        return res.status(200).json({success:true, message:"order added"}) 
    }
    catch(error){
        console.error("❌ Error in addOrder controller:", error.message); // 👈 main debug log
    console.error(error.stack); // optional full stack trace
       return res.status(500).json({success:false, error:"server error"}) 
    }

}

export const getOrder = async(req, res)=> {
    try{
    const userId = req.user._id
    const query = {}
    if(req.user.role == "customer"){
       query = {customer:userId}
    }
    const orders = await Order.find(query).populate({path:"product", populate:{
        path:"categoryId",
        select:"categoryName"
    },select: "name price"}).populate("customer", "name email")
    return res.status(200).json({success:true, orders})
    
    }
    catch(error){
    console.log(error)
     return res.status(500).json({success:false, message:"server error"})
    }
}