import Category from "../models/categoryModel.js"


export const addCategory = async(req, res) => {
    try{
    const {categoryName, categoryDescription} = req.body
    const existCategory = await Category.findOne({categoryName})
    if(existCategory){
    return res.status(401).json({success:false, message:"category already exist"})
    }
    const category = new Category({
        categoryName,
        categoryDescription
    })
    await category.save()
    return res.status(201).json({success:true, message:"New category added"})
    }
    catch(error){
    return res.status(500).json({success:false, message:"Server error"})
    }
}

export const getCategory = async(req, res)=> {
    try{
    const categories = await Category.find()
     return res.status(200).json({success:true, categories})
    }
    catch(error){
     return res.status(500).json({success:false, message:"Server error"})
    }
}
export const updateCategory = async(req, res)=> {
    try{
        const {id} = req.params
        const {categoryName, categoryDescription} = req.body
        const existCategory = await Category.find()
        if(!existCategory){
        return res.status(404).json({success:false, message:"category not found"})
        }
        const updatedCategory = await Category.findByIdAndUpdate(id,
            {categoryName, categoryDescription},
            {new:true}
        )
       await updatedCategory.save()
       return res.status(200).json({success:true, message:"category updated"})
    }
    catch(error){
     return res.status(500).json({success:false, message:"Server error"})
    }
}

export const deleteCategory = async(req, res)=> {
    try{
    const {id} = req.params
    const existCategory = await Category.find()
    if(!existCategory){
    return res.status(404).json({success:false, message:"category not found"})
    }
    await Category.findByIdAndDelete(id)
     return res.status(200).json({success:true, message:"category deleted"}) 
    }
    catch(error){
     return res.status(500).json({success:false, message:"Server error"})   
    }
}