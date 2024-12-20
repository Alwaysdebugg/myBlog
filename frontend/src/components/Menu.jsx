import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { logout } from "../services/api";

const Menu = () => {
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const handleLogout = async()=>{
        try{
            await logout()
            setUser(null)
            navigate('/')
        }catch(err){
            console.log("Error logging out", err)
        }
    }
    return (
        <div className="bg-black w-[100px] flex flex-col items-start absolute top-8 right-16 p-4 md:right-20 rounded-lg space-y-4">
            {!user && <h3 className="text-white text-sm hover:text-gray-400 cursor-pointer" onClick={()=>navigate('/login')}>Login</h3>}
            {!user && <h3 className="text-white text-sm hover:text-gray-400 cursor-pointer" onClick={()=>navigate('/register')}>Register</h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-400 cursor-pointer" onClick={()=>navigate('/write')}>Write</h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-400 cursor-pointer" onClick={()=>navigate('/profile')}>Profile</h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-400 cursor-pointer" onClick={()=>navigate('/myblogs')}>My blogs</h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-400 cursor-pointer" onClick={handleLogout}>Logout</h3>}
        </div>
    )
}

export default Menu