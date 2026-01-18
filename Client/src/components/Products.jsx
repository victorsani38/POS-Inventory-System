
import React, { useEffect, useState } from 'react'
import API from '../api/axios'


const Products = () => {
    const [data, setData] = useState({
        name:"", des:"", price:"", stock:"", categoryId:"", supplierId:"", currency:"NGN"
    })
    const [addModal, setAddModal] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [loading, setLoading] = useState(false)
    const [editProduct, setEditProduct] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState([])

    const handleSubmit = async(e)=> {
        e.preventDefault()
        if(editProduct){
        const {name, des, price, stock, categoryId, supplierId, currency} = data
        try{
        const res = await API.put(`/products/${editProduct}`, {
            name, des, price, stock, categoryId, supplierId, currency
        })
        if(res.data.success){
        alert("product updated")
        setData({name:"", des:"", price:"", stock:"", categoryId:"", supplierId:"", currency:""})
        fetchProducts()
        setAddModal(false)
        }
        }
        catch(error){
        alert("Failed to update product")
        console.log('Error updating, product', error)
        }
        }else{
        const {name, des, price, stock, categoryId, supplierId, currency} = data
        try{
        const res = await API.post("/products/add", {
            name, des, price, stock, categoryId, supplierId, currency
        })
        if(res.data.success){
        alert("New Product Added")
        setData({name:"", des:"", price:"", stock:"", categoryId:"", supplierId:"", currency:""})
        fetchProducts()
        setAddModal(false)
        }
        }
        catch(error){
        alert("Failed to add product")
        console.log('Error adding product', error)
        }
        }
    }

    const fetchProducts = async() => {
            setLoading(true)
            try{
            const res = await API.get('/products/')
            if(res.data.success){
                setProducts(res.data.products)
                setCategories(res.data.categories)
                setSuppliers(res.data.suppliers)
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

    const handleEdit = (product) => {
        setData({
            name:product.name, 
            des:product.des, 
            price:product.price, 
            stock:product.stock,
            categoryId:product.categoryId._id,
            supplierId:product.supplierId._id
        })
        setEditProduct(product._id)
        setAddModal(true)
    }
    const handleClose = ()=> {
        setAddModal(false)
        setEditProduct(false)
        setData({
            name:"",email:"",phone:"",address:"", categoryId:"", supplierId:"",currency:""
        })
    }

    const handleDelete = async(id)=> {
        try{
        if(window.confirm("Are you sure you want to delete this product?")){
        const res = await API.delete(`/products/${id}`)
        if(res.data.success){
        alert("product deleted")
        fetchProducts()
        }
        }
        }
        catch(error){
        alert("Failed to delete product")
        console.log("Error deleting product")
        }
    }  
     
    const handleSearch = (e) => {
        setFilteredProducts(
            products.filter((product)=>(
                product.name.toLowerCase().includes(e.target.value.toLowerCase())
            ))
        )
    }
  return (
    <div className='w-full h-full flex flex-col gap-4 p-4'>
      <h2 className='text-2xl font-bold'>Products Management</h2>
      <div className='flex justify-between items-center'>
        <input 
        onChange={handleSearch}
        className='border bg-white rounded p-1 px-4'
        type="text" placeholder='Search'/>
        <button 
         className='px-4 py-1.5 bg-blue-500
         text-white rounded cursor-pointer'
        onClick={()=>setAddModal(addModal + 1)}>Add Products</button>
      </div>
      {loading?"loading...":(
        <div>
            <table className="w-full border-collapse border border-gray-300 mt-4">
                <thead>
                    <tr className="bg-gray-200">
                         <th className="border-gray-200 border p-2">S NO</th>
                        <th  className="border-gray-200 border p-2">Product Name</th>
                        <th  className="border-gray-200 border p-2">Price</th>
                        <th  className="border-gray-200 border p-2">Stock</th>
                        <th  className="border-gray-200 border p-2">Category</th>
                        <th  className="border-gray-200 border p-2">Supplier</th>
                        <th  className="border-gray-200 border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts&&filteredProducts.map((product, index)=>(
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border-gray-200 border p-2">{index + 1}</td>
                            <td className="border-gray-200 border p-2">{product.name}</td>
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
                            <td className="border-gray-200 border p-2">{product.categoryId.categoryName}</td>
                            <td className="border-gray-200 border p-2">{product.supplierId.name}</td>
                            <td className="border-gray-200 border p-2">
                                <button
                                className="px-2 
                                py-1 bg-yellow-500 text-white rounded
                                mr-2 cursor-pointer"
                                onClick={()=>handleEdit(product)}
                                >Edit</button>
                                <button
                                className="px-2 py-1 bg-red-500
                                text-white rounded mr-2 cursor-pointer"
                                onClick={()=>handleDelete(product._id)}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredProducts.length == 0 &&<div>No records</div>}
        </div>
      )}
      {addModal&&(
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 justify-center items-center flex">
            <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
                <h2  className="text-xl font-bold ">{editProduct?"Edit Product":"Add Product"}</h2>
                <button 
                className="absolute top-4 right-4 font-bold text-lg cursor-pointer"
                onClick={()=>setAddModal(null)}>X</button>
                <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-4"
                >
                    <div>
                        <input 
                        className="border rounded
                       bg-white p-1 px-4 w-full" 
                        type="text" placeholder='Products Name' 
                        required
                        value={data.name}
                        onChange={(e)=>{setData({...data, name:e.target.value})}}
                        />
                    </div>
                    <div>
                        <input 
                        className="border rounded
                       bg-white p-1 px-4 w-full"  
                        type="text" placeholder='Description'
                        required
                        value={data.des}
                        onChange={(e)=>{setData({...data, des:e.target.value})}}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select name="Price" id=""
                        className="border rounded
                        bg-white p-1 px-4 w-full"

                        value={data.currency}
                        onChange={(e)=>{setData({...data, currency:e.target.value})}}
                        >
                            <option value="NGN">₦ NGN</option>
                            <option value="USD">$ USD</option>
                            <option value="EUR">€ EUR</option>
                        </select>
                         <input
                        className="border rounded bg-white p-1 px-4 w-full"
                        type="number"
                        placeholder="Enter price"
                        value={data.price}
                        onChange={(e) => setData({ ...data, price: e.target.value })}
                        />
                    </div>
                    <div>
                        <input 
                        className="border rounded
                        bg-white p-1 px-4 w-full" 
                        type="number" placeholder='Stock'
                        required
                        value={data.stock}
                        onChange={(e)=>{setData({...data, stock:e.target.value})}}
                        />
                    </div>
                    <div>
                    <div>
                        <select
                        className="border rounded
                        bg-white p-1 px-4 w-full"  
                        name="category name" id=""
                        required
                        value={data.categoryId}
                        onChange={(e)=>{setData({...data, categoryId:e.target.value})}}
                        >
                            <option 
                            >Select category</option>
                            {categories.map((category)=>(
                                <option key={category._id} value={category._id}>{category.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                        className="border rounded
                        bg-white p-1 px-4 w-full" 
                         name="supplier name" id=""
                         required
                        value={data.supplierId}
                        onChange={(e)=>{setData({...data, supplierId:e.target.value})}}
                         >
                            <option >Select Supplier</option>
                            {suppliers.map((supplier)=>(
                                <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
                            ))}
                        </select>
                    </div>
                     <div>
                        <button
                      className=" w-full mt-2 rounded-md
                      bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600"
                      type='submit'>{editProduct?"Save Changes":"Add Product"}</button>
                      {editProduct&&(
                        <button
                        onClick={handleClose}
                        className=" w-full mt-2 rounded-md
                       bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
                        >
                            Cancel
                        </button>
                      )}
                     </div>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  )
}

export default Products
