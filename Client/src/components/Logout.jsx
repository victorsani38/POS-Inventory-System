import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useEffect } from "react"
import { useRef } from "react"

const Logout = () => {
    const {logout} = useAuth()
    const navigate = useNavigate()
    const hasRun = useRef(false)
    useEffect(()=> {
        if(hasRun.current)return ;
        hasRun.current = true
        
       const confirm = window.confirm("Are you sure you want to log out?")
       if(confirm){
        logout()
        navigate('/login')
       }else{
        navigate(-1)
       }
    },[])
    return null
}

export default Logout