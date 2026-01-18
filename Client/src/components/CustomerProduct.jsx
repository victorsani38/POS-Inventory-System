
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import {toast} from "react-hot-toast"
import API from '../api/axios'

const CustomerProduct = () => {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
     const [loading, setLoading] = useState(false)
     const [addModal, setAddModal] = useState(false)
     const [data, setData] = useState({
        productId:"",
        quantity:1,
        stock:0,
        price:0,
        total:0
     })

     const fetchProducts = async() => {
            setLoading(true)
            try{
            const res = await API.get('/products/')
            if(res.data.success){
                setProducts(res.data.products)
                setCategories(res.data.categories)
                setFilteredProducts(res.data.products)
                setLoading(false)
                
            }
            }
            catch(error){
                alert('Failed to fetch products')
                console.log("Fetching products failed")
            }finally{
                setLoading(false)
            }
        }

    useEffect(()=> {
        fetchProducts()
    },[])

     const handleSearch = (e) => {
        setFilteredProducts(
            products.filter((product)=>(
                product.name.toLowerCase().includes(e.target.value.toLowerCase())
            ))
        )
    }
     const handleChangeCategory = (e) => {
        setFilteredProducts(
            products.filter((product)=>product.categoryId._id === e.target.value)
        )
    }

    const handleOrder = (product) => {
        setData({
        productId:product._id,
        quantity:1,
        stock:product.stock,
        price:product.price,
        total:product.price 
        })

        setAddModal(true)
    }

    const closeModel = ()=>{
        setAddModal(false)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
       try{
         const res = await API.post("/orders/add", {
            productId: data.productId,
      quantity: data.quantity,
      total: data.total
    
         })
        if(res.data.success){
            setAddModal(false)
            setData({
                productId:"",
                quantity:1,
                price:0,
                stock:0,
                total:0
            })
            fetchProducts()
        }
        toast.success("Order placed successfully!");
       }
       catch(error){
        toast.error("Something went wrong!");
       }
    }

    const increaseQuantity = (e) => {
        if(e.target.value > data.stock){
            alert("Quantity entered not available")
        }else{
            setData((prev)=>({
                ...prev,
                quantity:parseInt(e.target.value),
                total:parseInt(e.target.value)* parseInt(data.price)
            }))
        }
    }

  return (
    <div>
      <div className='py-4 px-6'>
        <h2 className='font-bold text-xl'>Product</h2>
      </div>
      <div className='py-4 px-6 flex justify-between'>
        <div>
            <select name="categories" id=""
            className='bg-white border p-2 rounded'
            onChange={handleChangeCategory}
            >
                <option>Select category</option>
                {categories.map((cat, index)=>(
                    <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                ))}
            </select>
        </div>
        <div>
           <input 
        onChange={handleSearch}
        className='border bg-white rounded p-1 px-4'
        type="text" placeholder='Search'/>
        </div>
      </div>

       <div>
            <table className="w-full border-collapse border border-gray-300 mt-4">
                <thead>
                    <tr className="bg-gray-200">
                         <th className="border-gray-200 border p-2">S NO</th>
                        <th  className="border-gray-200 border p-2">Product Name</th>
                        <th  className="border-gray-200 border p-2">Category</th>
                        <th  className="border-gray-200 border p-2">Price</th>
                        <th  className="border-gray-200 border p-2">Stock</th>
                        <th  className="border-gray-200 border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts&&filteredProducts.map((product, index)=>(
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border-gray-200 border p-2">{index + 1}</td>
                            <td className="border-gray-200 border p-2">{product.name}</td>
                            <td className="border-gray-200 border p-2">{product.categoryId.categoryName}</td>
                             <td className="border-gray-200 border p-2">
                               {product.currency == "USD"?"$"
                               :product.currency === "NGN"?"₦"
                               :product.currency === "EUR"?"€"
                               : " "
                            }
                            {product.price}
                            </td>
                            <td className="border-gray-200 border p-2">
                            <span className='font-semibold'>
                              {product.stock == 0 ?(
                                <span className='text-red-500 bg-red-100 rounded-full px-2 py-1' >{product.stock}</span>
                              ):product.stock < 5 ?(
                                <span className='text-yellow-500 bg-yellow-100 rounded-full px-2 py-1'>{product.stock}</span>
                              ):<span className='text-green-500 bg-green-100 rounded-full px-2 py-1'>{product.stock}</span>}  
                            </span> 
                            </td>
                            <td className="border-gray-200 border p-2">
                                <button
                                className="px-2 
                                py-1 bg-green-500 text-white rounded
                                mr-2 cursor-pointer"
                                onClick={()=>handleOrder(product)}
                                >Order</button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {filteredProducts.length == 0 &&<div>No records</div>}
        </div>
        {addModal&&(
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 justify-center items-center flex z-20">
            <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
                <h2  className="text-xl font-bold ">Place Order</h2>
                <button 
                className="absolute top-4 right-4 font-bold text-lg cursor-pointer"
                onClick={closeModel}>X</button>
                <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-4"
                >
                    <div>
                        <input 
                        className="border rounded
                       bg-white p-1 px-4 w-full" 
                        type="number" placeholder='Increase Quantity' 
                        required
                        min="1"
                        value={data.quantity}
                        onChange={increaseQuantity}
                        />
                    </div>
                    <p>{data.quantity * data.price}</p>
                     <div className='flex space-x-2'>
                        <button
                      className=" w-full mt-2 rounded-md
                      bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600"
                      type='submit'>Place Order</button>
                      
                        <button
                        onClick={closeModel}
                        className=" w-full mt-2 rounded-md
                       bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
                        >
                            Cancel
                        </button>
                     </div>
                </form>
            </div>
        </div>
      )}
    </div>
  )
}

export default CustomerProduct
