/* eslint-disable react/prop-types */
//USER CONTEXT
import { createContext, useState,useEffect } from "react"
import { loggedIn } from "../services/api"   
import { useNavigate } from "react-router-dom"
export const UserContext = createContext({})

export const UserProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        const checkLoggedIn = async()=>{
            try{
                const token = localStorage.getItem("token")
                if(token){
                    const res = await loggedIn()
                    setUser(res)
                }
            }catch(err){
                console.log("Error fetching user", err)
                navigate("/login")
            }
        }
        checkLoggedIn()
    },[])

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}
