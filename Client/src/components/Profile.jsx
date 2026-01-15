import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Profile = () => {

    const [user, setUser] = useState({
        name:"",
        email:"",
        address:"",
        password:""
    })
    const [edit, setEdit] = useState(false)

    const fetchUser = async() => {
        try{
        const res = await axios.get('/users/profile')
        if(res.data.success){
            setUser({
            name:res.data.user.name,
            email:res.data.user.email,
            address:res.data.user.address,
            })
        }
        }
        catch(error){
            console.log(error)
            alert('failed to fetch user, please try again')
        }
    }
    useEffect(()=>{
        fetchUser()
    },[])

    const handleSubmit = async(e)=> {
        e.preventDefault()
        try{
        const res = await axios.put('/users/edit', user) 
        if(res.data.success){
            setEdit(false)
            alert("user updated successfully")

        }
        }
        catch(error){
            console.log(error)
            alert("Error updating user")
        }
    }
  return (
    <div className='p-5'>
            <form action="" className='bg-white p-6 max-w-md shadow rounded-lg'
            onSubmit={handleSubmit}
            >
                <h2 className='font-bold text-2xl'>User Profile</h2>
                <div className='mb-4 mt-2'>
                    <label htmlFor="name" className='text-sm font-medium text-gray-700 mb-1 block'
                    >Name</label>
                    <input 
                    type="text" id='userName'
                     name='user name'
                     className={`w-full p-2 rounded-md border 
                     focus:outline-none focus:ring-2
                     ${edit ? "bg-white":"bg-gray-100"}
                     focus:to-blue-50`}
                      value={user.name}
                     onChange={(e)=>{setUser({...user, name:e.target.value})}}
                     disabled={!edit}
                     />
                </div>
                <div className='mb-4'>
                    <label htmlFor=""
                    className='text-sm font-medium text-gray-700 mb-1 block'
                    >Email
                    </label>
                    <input type="email"
                    id='email'
                    name='email'
                    className={`w-full p-2 rounded-md border 
                     focus:outline-none focus:ring-2
                     ${edit ? "bg-white":"bg-gray-100"}
                     focus:to-blue-50`}
                     value={user.email}
                     onChange={(e)=>{setUser({...user, email:e.target.value})}}
                      disabled={!edit}
                      />
                </div>
                <div className='mb-4'>
                    <label 
                    htmlFor=""
                    className='text-sm font-medium text-gray-700 mb-1 block'
                    >Address</label>
                    <input type="text"
                     id='address' 
                     name='address' 
                     className={`w-full p-2 rounded-md border 
                     focus:outline-none focus:ring-2
                     ${edit ? "bg-white":"bg-gray-100"}
                     focus:to-blue-50`}
                     value={user.address}
                     onChange={(e)=>{setUser({...user, address:e.target.value})}} 
                      disabled={!edit}
                     />
                </div>
                {edit &&(
                    <div>
                        <label htmlFor="password"
                        className='text-sm font-medium text-gray-700 mb-1 block'
                        >Password</label>
                        <input type="password"
                        placeholder='New Password(optional)'  
                        className='w-full p-2 rounded-md border 
                    focus:outline-none focus:ring-2 focus:to-blue-50'
                    onChange={(e)=>setUser({...user, password:e.target.value})}
                        />
                    </div>
                )}
                {!edit ?(
                <button 
                className='bg-yellow-600 text-white px-4 py-2 
                rounded-md mt-4 hover:bg-yellow-500 cursor-pointer'
                onClick={(e)=>{e.preventDefault(),setEdit(!edit)}}
                >Edit Profile
                </button>
                ):
                <div className='mt-4'>
                <button className='bg-green-400 text-white 
                px-4 py-2 rounded-md hover:bg-green-500 cursor-pointer'
                type='submit'
                >
                    Save Changes</button>
                <button
                className='bg-gray-300 text-gray-700 
                px-4 py-2 rounded-md hover:bg-gray-400 ml-2 cursor-pointer'
                onClick={()=>setEdit(!edit)}
                >Cancel
                </button>
                </div>
                }
            </form>
    </div>
  )
}

export default Profile
