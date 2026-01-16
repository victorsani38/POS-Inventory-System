//import axios from "../api/axios";
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const AuthContext = createContext()
export const ProtectContext = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=> {
        const fetchProfile = async() => {
            try{
            const {data} = await axios.get("/users/profile")
            setUser(data.user)
            }
            catch(err){
                setUser(null)
                navigate('/login')
            }finally{
                setLoading(false)
            }
        }
        fetchProfile()
    },[navigate])

    const login = async(credentials) => {
        setLoading(true)
        try{
        const {data} = await axios.post("/users/login", credentials)
        setUser(data.user)
        const rolePath = {
            admin:"/admin-dashboard",
            customer:"/customer-dashboard"
        }
        const path = rolePath[data.user.role || "/login"]
        navigate(path, {replace:true})
        return data.user
        }
        catch(error){
        setUser(null)
        if(error.response && error.response.data.error){
            throw new Error(error.response.data.error)
        }
        throw new Error("Something went wrong, please try again")
        }finally{
            setLoading(false)
        }
    }

    const logout = async() => {
        try{
        await axios.post('/users/logout')
        }
        catch(err){
            setUser(null)
            console.error("error occured", err.message)
        }finally{
            setLoading(false)
        }
    }

    return(
        <AuthContext.Provider value={{user, setUser, loading, setLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)