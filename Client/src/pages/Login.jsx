

import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-hot-toast"

const Login = () => {
    const [data, setData] = useState({email:"", password:""})
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const {login} = useAuth()
    const navigate = useNavigate()
    

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try{
        const user = await login(data)
        toast.success("user logged in successfully")
        if(user.role === "admin"){
            navigate("/admin-dashboard", {replace:true})
        }else if(user.role === "customer"){
            navigate("/customer-dashboard", {replace:true})
        }
        }
        catch(error){
            if(error.response){
                toast.error(error.response.data.error)
            }else{
                toast.error(error.message)
            }
        }finally{
            setLoading(false)
        }
    }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f7f3ff] px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//          <div className="text-center mb-6">
//           <h1 className="text-4xl font-extrabold text-purple-600 tracking-widest">VICS</h1>
//         </div>
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">
//           Welcome Back
//         </h2>
//         <p className="text-center text-gray-500 mb-8">
//           Enter your email address and your password
//         </p>
//         <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   <span className="text-red-500">*</span>Email Address or User Name 
//                 </label>
//                 <input 
//                 className="w-full px-4 py-3 rounded-lg border
//                  border-gray-300 focus:outline-none focus:ring-2
//                   focus:ring-purple-500 transition"
//                 type='text' 
//                 placeholder='Enter you email address or username' required
//                 value={data.email} 
//                 onChange={(e)=>{setData({...data, email:e.target.value})}}
//                 />
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                     <span className="text-red-500">*</span>Password 
//                 </label>
//                 <input type='password'
//                 className="w-full px-4 py-3 rounded-lg border
//                  border-gray-300 focus:outline-none focus:ring-2
//                   focus:ring-purple-500 transition"
//                  placeholder='Enter your password' required
//                  value={data.password} 
//                  onChange={(e)=>{setData({...data, password:e.target.value})}}
//                  />
//             </div>
//             <button type='submit'>Login</button>
//         </form>
//       </div>
//     </div>
//   )
return (
    <div className="min-h-screen bg-[#f7f3ff] relative overflow-hidden">
      {/* Top-left Logo (outside card) */}
      <header className="absolute top-6 left-8 z-30">
        <h1 className="text-4xl font-extrabold tracking-widest text-purple-600">
          VICS
        </h1>
      </header>

      {/* Top-right 'Create Account' (outside card) */}
      <div className="absolute top-6 right-8 z-30 text-sm text-gray-600">
        <span className="mr-2">Don’t have an account?</span>
        <a
          href="#"
          className="text-purple-600 font-medium hover:underline"
        >
          Create Account
        </a>
      </div>

      {/* Decorative arrows/background (bottom-left, behind card) */}
      <svg
        className="absolute -left-12 -bottom-8 w-96 h-96 pointer-events-none opacity-90 z-10"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g-orange" x1="0" x2="1">
            <stop offset="0%" stopColor="#ff7a18" />
            <stop offset="100%" stopColor="#ffb319" />
          </linearGradient>
          <linearGradient id="g-yellow" x1="0" x2="1">
            <stop offset="0%" stopColor="#ffc857" />
            <stop offset="100%" stopColor="#ffb84d" />
          </linearGradient>
        </defs>

        {/* big arrow - orange */}
        <g transform="translate(40,220) rotate(-18)">
          <path
            d="M10 80 L140 80 L140 40 L200 90 L140 140 L140 100 L10 100 Z"
            fill="url(#g-orange)"
            opacity="0.95"
          />
        </g>

        {/* smaller arrow - yellow, overlapping */}
        <g transform="translate(120,160) rotate(-10)">
          <path
            d="M10 60 L100 60 L100 30 L140 70 L100 110 L100 80 L10 80 Z"
            fill="url(#g-yellow)"
            opacity="0.95"
          />
        </g>

        {/* medium arrow - orange slightly transparent */}
        <g transform="translate(0,260) rotate(-6)">
          <path
            d="M10 60 L120 60 L120 30 L170 70 L120 110 L120 80 L10 80 Z"
            fill="url(#g-orange)"
            opacity="0.6"
          />
        </g>
      </svg>

      {/* Centered card */}
      <main className="flex items-center justify-center min-h-screen px-6 relative z-20">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Card content */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-semibold text-purple-600">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2">
              Enter your email address and your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500">*</span>Email Address or User Name 
              </label>
              <input
                type="text"
                name="email"
                autoComplete="username"
                placeholder="Enter your email address or username"
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fbf8ff] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
               <span className="text-red-500">*</span> Password 
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#fbf8ff] placeholder-gray-400 focus:outline-none focus:ring-2
                   focus:ring-purple-300 transition pr-12"
                />
                {/* eye toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-3 flex items-center px-2 text-gray-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {/* simple eye icon (SVG) */}
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10A9.96 9.96 0 014.11 4.125M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="text-right mt-2">
                <a href="#" className="text-sm text-purple-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
              >
                {loading?"loading...":"Login"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login
