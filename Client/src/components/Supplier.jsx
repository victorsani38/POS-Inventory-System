
import React, { useEffect, useState } from 'react'
import API from '../api/axios'


const Supplier = () => {
    const [data, setData] = useState({
        name:"", email:"", phone:"", address:""
    })
    const [addModal, setAddModal] = useState(false)
    const [suppliers, setSuppliers] = useState([])
    const [loading, setLoading] = useState(false)
    const [editSupplier, setEditSupplier] = useState(null)
    const [filteredSuppliers, setFilteredSuppliers] = useState([])

    const handleSubmit = async(e)=> {
        e.preventDefault()
        if(editSupplier){
        const {name, email, phone, address} = data
        try{
        const res = await API.put(`/suppliers/${editSupplier}`, {
            name, email,phone, address
        })
        if(res.data.success){
        alert("Supplier updated")
        setData({name:"", email:"", phone:"", address:""})
        fetchSupplier()
        setAddModal(false)
        }
        }
        catch(error){
        alert("Failed to update supplier")
        console.log('Error updating, supplier', error)
        }
        }else{
        const {name, email, phone, address} = data
        try{
        const res = await API.post("/suppliers/add", {
            name, email,phone, address
        })
        if(res.data.success){
        alert("New Supplier Added")
        setData({name:"", email:"", phone:"", address:""})
        fetchSupplier()
        setAddModal(false)
        }
        }
        catch(error){
        alert("Failed to add supplier")
        console.log('Error adding, supplier', error)
        }
        }
    }

    const fetchSupplier = async() => {
            setLoading(true)
            try{
            const res = await API.get('/suppliers/')
            if(res.data.success){
                setSuppliers(res.data.suppliers)
                setFilteredSuppliers(res.data.suppliers)
                
            }
            }
            catch(error){
                alert('Failed to fetch suppliers')
                console.log("Fetching supplier failed")
            }finally{
                setLoading(false)
            }
        }

    useEffect(()=> {
        fetchSupplier()
    },[])

    const handleEdit = (supplier) => {
        setData({
            name:supplier.name, 
            email:supplier.email, 
            phone:supplier.phone, 
            address:supplier.address
        })
        setEditSupplier(supplier._id)
        setAddModal(true)
    }
    const handleClose = ()=> {
        setAddModal(false)
        setEditSupplier(false)
        setData({
            name:"",email:"",phone:"",address:""
        })
    }

    const handleDelete = async(id)=> {
        try{
        if(window.confirm("Are you sure you want to delete this supplier?")){
        const res = await API.delete(`/suppliers/${id}`)
        if(res.data.success){
        alert("Supplier deleted")
        fetchSupplier()
        }
        }
        }
        catch(error){
        alert("Failed to delete supplier")
        console.log("Error deleting supplier")
        }
    }  
     
    const handleSearch = (e) => {
        setFilteredSuppliers(
            suppliers.filter((supplier)=>(
                supplier.name.toLowerCase().includes(e.target.value.toLowerCase())
            ))
        )
    }
  return (
    <div className='w-full h-full flex flex-col gap-4 p-4'>
      <h2 className='text-2xl font-bold'>Supplier Management</h2>
      <div className='flex justify-between items-center'>
        <input 
        onChange={handleSearch}
        className='border bg-white rounded p-1 px-4'
        type="text" placeholder='Search'/>
        <button 
         className='px-4 py-1.5 bg-blue-500
         text-white rounded cursor-pointer'
        onClick={()=>setAddModal(addModal + 1)}>Add Supplier</button>
      </div>
      {loading?"loading...":(
        <div>
            <table className="w-full border-collapse border border-gray-300 mt-4">
                <thead>
                    <tr className="bg-gray-200">
                         <th className="border-gray-200 border p-2">S NO</th>
                        <th  className="border-gray-200 border p-2">Supplier Name</th>
                        <th  className="border-gray-200 border p-2">Email</th>
                        <th  className="border-gray-200 border p-2">Phone</th>
                        <th  className="border-gray-200 border p-2">Address</th>
                        <th  className="border-gray-200 border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSuppliers&&filteredSuppliers.map((supplier, index)=>(
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border-gray-200 border p-2">{index + 1}</td>
                            <td className="border-gray-200 border p-2">{supplier.name}</td>
                            <td className="border-gray-200 border p-2">{supplier.email}</td>
                            <td className="border-gray-200 border p-2">{supplier.phone}</td>
                            <td className="border-gray-200 border p-2">{supplier.address}</td>
                            <td className="border-gray-200 border p-2">
                                <button
                                className="px-2 
                                py-1 bg-yellow-500 text-white rounded
                                mr-2 cursor-pointer"
                                onClick={()=>handleEdit(supplier)}
                                >Edit</button>
                                <button
                                className="px-2 py-1 bg-red-500
                                text-white rounded mr-2 cursor-pointer"
                                onClick={()=>handleDelete(supplier._id)}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredSuppliers.length == 0 &&<div>No records</div>}
        </div>
      )}
      {addModal&&(
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 justify-center items-center flex">
            <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
                <h2  className="text-xl font-bold ">{editSupplier?"Edit Supplier":"Add Supplier"}</h2>
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
                        type="text" placeholder='Supplier Name' 
                        required
                        value={data.name}
                        onChange={(e)=>{setData({...data, name:e.target.value})}}
                        />
                    </div>
                    <div>
                        <input 
                        className="border rounded
                       bg-white p-1 px-4 w-full"  
                        type="email" placeholder='Email'
                        required
                        value={data.email}
                        onChange={(e)=>{setData({...data, email:e.target.value})}}
                        />
                    </div>
                    <div>
                        <input 
                       className="border rounded
                       bg-white p-1 px-4 w-full"  
                        type="text" placeholder='Phone Number'
                        value={data.phone}
                        onChange={(e)=>{setData({...data, phone:e.target.value})}}
                        />
                    </div>
                    <div>
                        <input 
                        className="border rounded
                        bg-white p-1 px-4 w-full" 
                        type="text" placeholder='Address'
                        required
                        value={data.address}
                        onChange={(e)=>{setData({...data, address:e.target.value})}}
                        />
                    </div>
                    <div>
                     <button
                      className=" w-full mt-2 rounded-md
                      bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600"
                      type='submit'>{editSupplier?"Save Changes":"Add Supplier"}</button>
                      {editSupplier&&(
                        <button
                        onClick={handleClose}
                        className=" w-full mt-2 rounded-md
                       bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
                        >
                            Cancel
                        </button>
                      )}
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  )
}

export default Supplier
