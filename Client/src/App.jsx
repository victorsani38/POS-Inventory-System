import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
import axios from "axios"
import { ProtectContext } from '../context/AuthContext'
import { Root } from './utils/Root'
import Login from './pages/Login'
import { ProtectRoute } from './utils/ProtectRoute'
import Dashboard from './pages/Dashboard'
import Categories from './components/Categories'
import Supplier from './components/Supplier'
import Products from './components/Products'
import Users from './components/Users'
import Logout from './components/Logout'
import CustomerProduct from './components/CustomerProduct'
import Order from './components/Order'
import Profile from './components/Profile'
import Summary from './components/Summary'

function App() {

  axios.defaults.baseURL = "http://localhost:1000/api"
  axios.defaults.withCredentials = true
 

  return (
    <>
     <Router>
      <Toaster position='top-right' toastOptions={{duration:2000}}/>
      <ProtectContext>
        <Routes>
        <Route path="/" element={<Root/>}/>
         <Route path="/login" element={<Login/>}/>
        <Route path="/admin-dashboard"
         element={<ProtectRoute requiredRole={"admin"}>
         <Dashboard/>
         </ProtectRoute>}
         >
          <Route index element={<Summary/>}/>
           <Route path="/admin-dashboard/categories" element={<Categories/>}/>
           <Route path="/admin-dashboard/Products" element={<Products/>}/>
           <Route path="/admin-dashboard/suppliers" element={<Supplier/>}/>
           <Route path="/admin-dashboard/orders" element={<Order/>}/>
           <Route path="/admin-dashboard/users" element={<Users/>}/>
           <Route path="/admin-dashboard/profile" element={<Profile/>}/>
           <Route path="/admin-dashboard/logout" element={<Logout/>}/>
         </Route>
        <Route path="/customer-dashboard"
         element={<ProtectRoute requiredRole={"customer"}>
          <Dashboard/>
          </ProtectRoute>}
         >
           <Route index element={<CustomerProduct/>}/>
           <Route path="/customer-dashboard/products" element={<CustomerProduct/>}/>
           <Route path="orders" element={<Order/>}/>
           <Route path="profile" element={<Profile/>}/>
            <Route path="logout" element={<Logout/>}/>
         </Route>
         <Route path="/Unauthorized" element={<h2>Unauthorized, invalid User</h2>}/>
      </Routes>
      </ProtectContext>
    </Router> 
    </>
  )
}

export default App
