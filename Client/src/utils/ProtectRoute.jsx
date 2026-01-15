import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useEffect } from "react"



export const ProtectRoute = ({children, requiredRole}) => {
    const {user, loading} = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        if(loading)return;
        if(!user){
        navigate('/login')
        return;
        }
        if(requiredRole && user.role !==requiredRole){
            navigate('/Unauthorized')
            return
        }
    },[user, navigate, loading])
    if(loading)return <h2>Loading...</h2>
    if(!user)return null
    if(requiredRole && user.role !==requiredRole) return null

    return children
}