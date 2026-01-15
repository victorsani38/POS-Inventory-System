import React, { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'

const Users = () => {
    const [data, setData] = useState({
        name:"", email:"", password:"", address:"",role:""
    })
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    

    const handleSubmit = async(e) => {
        e.preventDefault()
        const {name, email, password, address, role} = data
        try{
        const res = await axios.post('/users/add',{
            name, email, password, address, role
        })
        if(res.data.success){
            setData({name:"", email:"", password:"", address:"", role:""})
            alert("New user added")
            fetchUsers()
        }
        }
        catch(error){
            console.error("Failed to add user")
            alert("unable to add user")
        }
        
        
    }

    const fetchUsers = async() => {
        setLoading(true)
        try{
          const res = await axios.get('/users')
          if(res.data.success){
          setUsers(res.data.users)
          }
        }
        catch(error){
          console.error('unable to fetch users', error.message)
          alert("failed to fetch users")
        }finally{
          setLoading(false)
        }
      }

    useEffect(()=> {
      fetchUsers()
    },[])

    const handleDelete = async(id) => {
      try{
      if(window.confirm("Are you sure you want to delete this user?")){
        const res = await axios.delete(`/users/${id}`)
        if(res.data.success){
          alert("user deleted")
          fetchUsers()
        }
      }
      }
      catch(error){
      console.error("deleting user failed", error)
      alert("failed to delete user")
      }
    }
    if(loading)return<div>Loading...</div>
  return (
    <div  className='p-4'>
      <h2 className='text-2xl font-bold mb-8'>Users Management</h2>
      <div className='flex flex-col lg:flex-row gap-4'>
        <div className='lg:w-1/3'>
           <div className='bg-white shadow-md rounded-lg p-4'>
              <h2 className='text-center font-bold mb-4 text-xl'>Add User</h2>
             <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <input type="text"
                     className='border w-full p-2 rounded-md' 
                     placeholder='User Name'
                     value={data.name}
                     onChange={(e)=>{setData({...data, name:e.target.value})}}
                     />
                </div>
                <div>
                    <input type="text"
                     className='border w-full p-2 rounded-md' 
                     placeholder='Email' 
                     value={data.email}
                     onChange={(e)=>{setData({...data, email:e.target.value})}}
                     />
                </div>
                 <div>
                    <input type="password"
                     className='border w-full p-2 rounded-md' 
                     placeholder='Password' 
                     value={data.password}
                     onChange={(e)=>{setData({...data, password:e.target.value})}}
                     />
                </div>
                 <div>
                    <input type="text"
                     className='border w-full p-2 rounded-md' 
                     placeholder='Address' 
                     value={data.address}
                     onChange={(e)=>{setData({...data, address:e.target.value})}}
                     />
                </div>
                <div>
                  <select name="user-role" id=""
                  className='border w-full p-2 rounded-md' 
                  value={data.role}
                  onChange={(e)=>{setData({...data, role:e.target.value})}}
                  >
                    <option>Role</option>
                    <option
                    >admin</option>
                    <option
                    >customer</option>
                  </select>
                </div>
                <div>
                    <button
                    className='w-full p-3 rounded-md
                     mt-2
                     bg-green-500
                     text-white cursor-pointer hover:bg-green-300' 
                    type='submi'>Add User</button>
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
                <th className='border border-gray-200 p-2'> Name</th>
                 <th className='border border-gray-200 p-2'>Email</th>
                  <th className='border border-gray-200 p-2'>Address</th>
                   <th className='border border-gray-200 p-2'>Role</th>
                <th className='border border-gray-200 p-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {users&&users.map((user, index)=>(
                <tr key={index}>
                  <td  className='border border-gray-200 p-2'>{index + 1}</td>
                  <td  className='border border-gray-200 p-2'>{user.name}</td>
                  <td  className='border border-gray-200 p-2'>{user.email}</td>
                  <td  className='border border-gray-200 p-2'>{user.address}</td>
                  <td  className='border border-gray-200 p-2'>{user.role}</td>
                   <td  className='border border-gray-200 p-2'>
                      <button 
                      className='bg-red-500
                       text-white p-2 
                      rounded-md hover:bg-red-600 cursor-pointer'
                      type='submit'
                      onClick={()=>handleDelete(user._id)}
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

export default Users
