
import React, { useEffect, useState } from 'react'
import API from '../api/axios'

const Order = () => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false) 

  const fetchOrders = async() => {
    try{
    const res = await API.get('/orders')
    if(res.data.success){
      setOrders(res.data.orders)
    }
    }
    catch(error){
      console.log(error)
      alert("unable to fetch orders")
    }
  }

  useEffect(()=>{
   fetchOrders()
  },[])
  return (
    <div className='w-full h-full flex flex-col gap-4 p-4'>
     <h2 className='text-2xl font-bold'>Orders</h2>
      {loading?"loading...":(
        <div>
            <table className="w-full border-collapse border border-gray-300 mt-4">
                <thead>
                    <tr className="bg-gray-200">
                         <th className="border-gray-200 border p-2">S NO</th>
                        <th  className="border-gray-200 border p-2">Product Name</th>
                        <th  className="border-gray-200 border p-2">Category</th>
                        <th  className="border-gray-200 border p-2">Quantity</th>
                        <th  className="border-gray-200 border p-2">Price</th>
                        <th  className="border-gray-200 border p-2">Total Price</th>
                        <th  className="border-gray-200 border p-2">Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders&&orders.map((order, index)=>(
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border-gray-200 border p-2">{index + 1}</td>
                            <td className="border-gray-200 border p-2">{order.product.name}</td>
                            <td className='border-gray-200 border p-2'>{order.product.categoryId.categoryName}</td>
                            <td className="border-gray-200 border p-2">{order.quantity}</td>
                            <td className="border-gray-200 border p-2">{order.price}</td>
                            <td className="border-gray-200 border p-2">
                            {order.totalPrice}
                            </td>
                            <td className="border-gray-200 border p-2">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  )
}

export default Order
