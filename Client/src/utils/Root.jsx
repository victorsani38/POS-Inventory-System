import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useEffect } from "react"


export const Root = () => {
    const {user, loading} = useAuth()
    const navigate = useNavigate()
    useEffect(()=> {
    if(loading)return;
    if(!user){
        navigate('/login')
        return;
    }
    if(user.role === "admin"){
        navigate('/admin-dashboard')
    }
    else if(user.role === "customer"){
        navigate('/customer-dashboard')
    }
    },[user, navigate])
    if(loading){
        return<h2>Loading...</h2>
    }
    return <h2>Redirecting...</h2>
}