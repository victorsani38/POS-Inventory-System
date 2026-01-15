import Order from "../models/orderModel.js";
import Product from "../models/productModel.js"




export const getData = async(req, res) => {
    try{
    const totalProduct = await Product.countDocuments();
    const stockResult = await Product.aggregate([
        {$group:{_id:null, totalStock:{$sum:"$stock"}}}
    ])
     const totalStock = stockResult[0]?.totalStock || 0
     const startOfDay = new Date()
     startOfDay.setHours(0,0,0)
     const endOfDate = new Date()
     endOfDate.setHours(23,59, 999)
     const orderToday = await Order.countDocuments({
        orderDate:{$gte:startOfDay, $lte:endOfDate}
     })

     const revenueResult = await Order.aggregate([
        {$group:{_id:null, totalRevenue:{$sum:"$totalPrice"}}}
    
     ])
     const revenue = revenueResult[0]?.totalRevenue || 0

     const outOfStock = await Product.find({stock:0})
     .select("name stock")
     .populate("categoryId", "categoryName")

     const highestSalesResult = await Order.aggregate([
        {$group:{_id:"$product", totalQuantity:{$sum:"$quantity"}}},
        {$sort:{totalQuantity:-1}},
        {$limit:1},
        {
            $lookup:{
                from:"products",
                localField:"_id",
                foreignField:"_id",
                as:"product"
            }
        },
        {$unwind:"$product"},
        {
            $lookup:{
                from:"categories",
                localField:"product.categoryId",
                foreignField:"_id",
                as:"product.categoryId"
            }
        },
        {$unwind:"$product.categoryId"},
        {
            $project:{
                name:"$product.name",
                category:"$product.categoryId.categoryName",
                totalQuantity:1
            }
        }
     ])
     const highestSalesProduct = highestSalesResult[0] || {message:"No sale data available"}

     const lowOfStock = await Product.find({stock:{$gt:0, $lt:5}})
     .select("name stock")
     .populate("categoryId", "categoryName")

     const dashboardData = {
        totalProduct,
        totalStock,
        orderToday,
        revenue,
        outOfStock,
        highestSalesProduct,
        lowOfStock
     }

     return res.status(200).json({success:true, dashboardData})
    }

    catch(error){
    console.log(error)
    return res.status(500).json({success:false, message:"server error"})
    }
}