
import React from 'react'
import  { FaBox, FaCog, FaHome, FaShoppingCart, FaSignOutAlt, FaTable, FaTruck, FaUser } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { useEffect } from 'react'


const Sidebar = () => {
    const itemsMenu = [
        {name:"Dashboard", path:"/admin-dashboard", icon:<FaHome/>, isParent:true},
        {name:"Categories", path:"/admin-dashboard/categories", icon:<FaTable/>, isParent:true},
        {name:"Products", path:"/admin-dashboard/products", icon:<FaBox/>,isParent:true},
        {name:"Supplier", path:"/admin-dashboard/suppliers", icon:<FaTruck/>,isParent:true},
        {name:"Orders", path:"/admin-dashboard/orders", icon:<FaShoppingCart/>,isParent:true},
        {name:"Users", path:"/admin-dashboard/users", icon:<FaUser/>,isParent:true},
        {name:"Profile", path:"/admin-dashboard/profile", icon:<FaCog/>,isParent:true},
        {name:"Logout", path:"/admin-dashboard/logout", icon:<FaSignOutAlt/>,isParent:true},
    ]

    const customerItems = [
         {name:"Products", path:"/customer-dashboard/products", icon:<FaBox/>,isParent:true},
         {name:"Orders", path:"/customer-dashboard/orders", icon:<FaShoppingCart/>,isParent:true},
         {name:"Profile", path:"/customer-dashboard/profile", icon:<FaCog/>,isParent:true},
         {name:"Logout", path:"/customer-dashboard/logout", icon:<FaSignOutAlt/>,isParent:true},
    ]

    const {user} = useAuth()
    const [menuLinks, setMenulinks] = useState(customerItems)

    useEffect(()=> {
        if(user?.role =="admin"){
        setMenulinks(itemsMenu)
    }else{
        setMenulinks(customerItems)
    }
    },[user])
    
  return (
    <div className="flex flex-col h-screen p-3 bg-black text-white w-16 md:w-64 fixed">
      <div className="h-16 flex items-center justify-center">
          <span className="hidden md:block text-xl font-bold">Inventory MS</span>
          <span className="md:hidden text-xl">IMS</span>
       </div>
        <div>
            <ul className="space-y-2 p-2">
                {menuLinks.map((item)=>(
                    <li key={item.path}>
                        <NavLink
                        to={item.path}
                        end={item.isParent}
                        className={({isActive}) => `${isActive ? "bg-gray-700" : ""}
                         flex items-center p-2 rounded-md
                         hover:bg-gray-700 transition duration-200`}
                        >
                            <span
                            className="text-xl"
                            >{item.icon}</span>
                            <span className=" ml-4 hidden md:block">{item.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Sidebar
