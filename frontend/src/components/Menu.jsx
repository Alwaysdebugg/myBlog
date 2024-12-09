import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Menu = () => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    return (
        <div className="bg-black w-[200px] flex flex-col items-start absolute top-12 right-0 p-4 md:right-32 rounded-lg space-y-4">
            {!user && <h3 className="text-white text-sm hover:text-gray-400 cursor-pointer" onClick={()=>navigate('/login')}>Login</h3>}
            {!user && <h3 className="text-white text-sm hover:text-gray-400 cursor-pointer" onClick={()=>navigate('/register')}>Register</h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-400 cursor-pointer" onClick={()=>navigate('/write')}>Write</h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-400 cursor-pointer" onClick={()=>navigate('/profile')}>Profile</h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-400 cursor-pointer" onClick={()=>navigate('/myblogs')}>My blogs</h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-400 cursor-pointer" onClick={()=>navigate('/logout')}>Logout</h3>}
        </div>
    )
}

export default Menu