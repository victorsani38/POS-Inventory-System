
import Category from "../models/categoryModel.js"
import Product from "../models/productModel.js"
import Supplier from "../models/supplierModel.js"

export const addProduct = async(req, res) => {
    try{
    const {name, des, price, stock, currency,categoryId, supplierId} = req.body
    const product = new Product({
        name,
        des,
        price,
        stock,
        currency,
        categoryId,
        supplierId
    })
    await product.save()
    return res.status(201).json({success:true, message:"New product added"})
    }
    catch(error){
    console.log("failed to add product", error.message)
    return res.status(500).json({success:false, message:"Server error"})
    }
}

export const getProduct = async(req, res)=> {
    try{
    const products = await Product.find({isDeleted:false}) 
    .populate("categoryId","categoryName")
    .populate("supplierId", "name")
    const categories = await Category.find()
    const suppliers = await Supplier.find()
     return res.status(200).json({success:true, suppliers, categories, products})
    }
    catch(error){
    console.log('error fetching products', error.message)
     return res.status(500).json({success:false, message:"Server error"})
    }
}

export const updateProduct = async(req, res)=> {
    try{
        const {id} = req.params
        const {name, des, price, stock, currency,categoryId, supplierId} = req.body
        const existProduct = await Supplier.find()
        if(!existProduct){
        return res.status(404).json({success:false, message:"product not found"})
        }
        const updatedProduct = await Product.findByIdAndUpdate(id,
            {name, des, price, stock, currency,categoryId, supplierId},
            {new:true}
        )
       await updatedProduct.save()
       return res.status(200).json({success:true, message:"product updated"})
    }
    catch(error){
     return res.status(500).json({success:false, message:"Server error"})
    }
}

export const deleteProduct = async(req, res)=> {
    try{
    const {id} = req.params
    const existProduct = await Product.findById(id)
    if(!existProduct){
    return res.status(404).json({success:false, message:"Product not found"})
    }
    if(existProduct.isDeleted){
     return res.status(404).json({success:false, message:"Product already deleted"})
    }
    await Product.findByIdAndUpdate(id,{isDeleted:true}, {new:true})
     return res.status(200).json({success:true, message:"product deleted"}) 
    }
    catch(error){
     return res.status(500).json({success:false, message:"Server error"})   
    }
}
