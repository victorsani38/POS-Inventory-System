
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
const Categories = () => {
    const [data, setData] = useState({
        categoryName:"", categoryDescription:""
    })
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [editCategory, setEditCategory] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(editCategory){
        const {categoryName, categoryDescription} = data
        try{
        const res = await axios.put(`/categories/${editCategory}`,{
            categoryName, categoryDescription
        })
        if(res.data.success){
            setData({categoryName:"", categoryDescription:""})
            alert("category updated")
            fetchCategory()
            setEditCategory(null)
        }
        }
        catch(error){
            console.error("Failed to category category", error)
            alert("unable to updatecategory category")
        }
        }else{
        const {categoryName, categoryDescription} = data
        try{
        const res = await axios.post('/categories/add',{
            categoryName, categoryDescription
        })
        if(res.data.success){
            setData({categoryName:"", categoryDescription:""})
            alert("New category added")
            fetchCategory()
        }
        }
        catch(error){
            console.error("Failed to add category")
            alert("unable to add category")
        }
        }
        
    }

    const fetchCategory = async() => {
        setLoading(true)
        try{
          const res = await axios.get('/categories')
          if(res.data.success){
          setCategories(res.data.categories)
          }
        }
        catch(error){
          console.error('unable to fetch categories', error.message)
          alert("failed to fetch categories")
        }finally{
          setLoading(false)
        }
      }

    useEffect(()=> {
      fetchCategory()
    },[])

    const handleEdit = (category)=> {
      setEditCategory(category._id)
      setData({
        categoryName:category.categoryName,
        categoryDescription:category.categoryDescription
      })
    }
    const handleClose = () => {
      setEditCategory(false)
      setData({categoryName:"", categoryDescription:""})
    }
    const handleDelete = async(id) => {
      try{
      if(window.confirm("Are you sure you want to delete this category?")){
        const res = await axios.delete(`/categories/${id}`)
        if(res.data.success){
          alert("Category deleted")
          fetchCategory()
        }
      }
      }
      catch(error){
      console.error("deleting category failed", error)
      alert("failed to delete category")
      }
    }
    if(loading)return<div>Loading...</div>
  return (
    <div  className='p-4'>
      <h2 className='text-2xl font-bold mb-8'>Category Management</h2>
      <div className='flex flex-col lg:flex-row gap-4'>
        <div className='lg:w-1/3'>
           <div className='bg-white shadow-md rounded-lg p-4'>
              <h2 className='text-center font-bold mb-4 text-xl'>{editCategory?"Edit Category":"Add Category"}</h2>
             <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <input type="text"
                     className='border w-full p-2 rounded-md' 
                     placeholder='Category Name'
                     value={data.categoryName}
                     onChange={(e)=>{setData({...data, categoryName:e.target.value})}}
                     />
                </div>
                <div>
                    <input type="text"
                     className='border w-full p-2 rounded-md' 
                     placeholder='Category Description' 
                     value={data.categoryDescription}
                     onChange={(e)=>{setData({...data, categoryDescription:e.target.value})}}
                     />
                </div>
                <div>
                    <button
                    className='w-full p-3 rounded-md
                     mt-2
                     bg-green-500
                     text-white cursor-pointer hover:bg-green-300' 
                    type='submi'>{editCategory?"Save Changes":"Add Category"}</button>
                    {editCategory&&(
                      <button
                      className='w-full mt-2 rounded-md bg-red-500 text-white 
                      p-3 cursor-pointer hover:bg-red-600'
                      onClick={handleClose}
                      >Cancel</button>
                    )}
                </div>
             </form>
            </div> 
        </div>
         <div className='lg:w-2/3'>
            <div className='bg-white shadow-md rounded-lg p-4'>
              <table className='w-full border-collapse border border-gray-200'>
            <thead className='bg-gray-100'>
              <tr className='bg-gray-100'>
                <th className='border border-gray-200 p-2'>S NO</th>
                <th className='border border-gray-200 p-2'>Category name</th>
                <th className='border border-gray-200 p-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index)=>(
                <tr key={index}>
                  <td  className='border border-gray-200 p-2'>{index + 1}</td>
                  <td  className='border border-gray-200 p-2'>{category.categoryName}</td>
                   <td  className='border border-gray-200 p-2'>
                      <button 
                      className='bg-blue-500
                       text-white p-2 
                      rounded-md hover:bg-blue-600 mr-2 cursor-pointer'
                      type='submit'
                      onClick={()=>handleEdit(category)}
                      >Edit</button>
                      
                      <button 
                      className='bg-red-500
                       text-white p-2 
                      rounded-md hover:bg-red-600 cursor-pointer'
                      type='submit'
                      onClick={()=>handleDelete(category._id)}
                      >Delete</button>
                   </td>
                </tr>
              ))}
            </tbody>
         </table>
            </div>
         </div>
      </div>
    </div>
  )
}

export default Categories
