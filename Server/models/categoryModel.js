import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema({
    categoryName:{type:String, required:true},
    categoryDescription:{type:String, required:true},
})

const Category = new mongoose.model("Category", CategorySchema)
export default Category 