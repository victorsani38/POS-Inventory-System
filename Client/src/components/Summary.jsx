import axios from "../api/axios";
import React, { useEffect, useState } from 'react'

const Summary = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProduct:0,
    totalStock:0,
    orderToday:0,
    revenue:0,
    outOfStock:[],
    highestSalesProduct:null,
    lowOfStock:[]
  })

  const [loading, setLoading] = useState(false)

  const fetchDashboard = async() => {
    setLoading(true)
    try{
    const res = await axios.get("/dashboard")
    if(res.data?.success && res.data?.dashboardData){
      console.log(res.data.dashboardData)
      setDashboardData(res.data.dashboardData)
    }else{
       console.error("Invalid dashboard response", res.data)
    }
    }
    catch(error){
      alert(error.message)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
fetchDashboard()
  },[])  
  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div className='p-5'>
       <h2 className='text-3xl font-bold'>Dashboard</h2>
       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-6 gap-4'>
          <div className='bg-blue-500 text-white p-5 rounded-lg flex flex-col justify-center items-center'>
            <p className='text-lg font-semibold'>Total Product</p>
              <p className='text-2xl font-bold'>{dashboardData.totalProduct}</p>
          </div>
          <div className='bg-yellow-500 text-white p-5 rounded-lg flex flex-col justify-center items-center'>
            <p className='text-lg font-semibold'>Total Stock</p>
              <p className='text-2xl font-bold'>{dashboardData.totalStock}</p>
          </div>
          <div className='bg-green-500 text-white p-5 rounded-lg flex flex-col justify-center items-center'>
            <p className='text-lg font-semibold'>Order Today</p>
              <p className='text-2xl font-bold'>{dashboardData.orderToday}</p>
          </div>
          <div className='bg-purple-500 text-white p-5 rounded-lg flex flex-col justify-center items-center'>
            <p className='text-lg font-semibold'>Revenue</p>
              <p className='text-2xl font-bold'>${dashboardData.revenue}</p>
          </div>
       </div>
       <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-white rounded-lg shadow-md p-4'>
              <h3 className='text-xl mb-3 font-semibold text-gray-800'>Out of Stock product</h3>
              {dashboardData.outOfStock.length > 0?(
                <ul className='space-y-2'>
                  {dashboardData.outOfStock.map((product, index)=>(
                    <li key={index} className='text-gray-400'>
                      {product.name}{" "}
                      <span className='text-gray-600'>{product.categoryId.categoryName}</span>
                    </li>
                  ))}
                </ul>
              ):(
                <p className='text-gray-500'>No product out of stock</p>
              )}
            </div>
            <div className='bg-white rounded-lg shadow-md p-4'>
              <h3 className='text-xl mb-3 font-semibold text-gray-800'>Highest sales of Product</h3>
              {dashboardData.highestSalesProduct?.name?(
                <div className='text-gray-600'>
                  <p><strong>name:</strong>{dashboardData.highestSalesProduct.name}</p>
                  <p><strong>Category:</strong>{dashboardData.highestSalesProduct.category}</p>
                  <p><strong>Total sales unit:</strong>{dashboardData.highestSalesProduct.totalQuantity}</p>
                </div>
              ):(
                <p className='text-gray-400'>{dashboardData.highestSalesProduct?.message||"loading..."}</p>
              )}
            </div>
            <div className='bg-white rounded-lg shadow-md p-4'>
              <h3 className='text-xl mb-3 font-semibold text-gray-800'>Low stock product</h3>
              {dashboardData.lowOfStock.length > 0?(
                <ul className='space-y-2'>
                  {dashboardData.lowOfStock.map((product, index)=>(
                    <li key={index} className='text-gray-600'>
                      <strong>{product.name}</strong>-{product.stock}left{" "}
                      <span className='text-gray-400'>{product.categoryId.categoryName}</span>
                    </li>
                  ))}
                </ul>
              ):(
                <p className='text-gray-500'>No low stock product.</p>
              )}
            </div>
          </div>
    </div>
  )
}

export default Summary
