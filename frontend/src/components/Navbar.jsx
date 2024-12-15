import { Link,useNavigate } from "react-router-dom"
import { FaSearch,FaBars } from "react-icons/fa";
import { useState,useContext } from "react";
import Menu from "./menu";
import { UserContext } from "../context/UserContext";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const [menu,setMenu] = useState(false)
  const [prompt,setPrompt] = useState('')
  const navigate = useNavigate()
  const {pathname} = useLocation()

  const showMenu = () => {
    setMenu(!menu)
  }
  const {user} = useContext(UserContext)
  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog Market</Link></h1>
      {pathname === '/' && (
      <div className="flex justify-center items-center space-x-1">
      <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer"><FaSearch /></p>
      <input onChange={(e)=>setPrompt(e.target.value)} className="text-center outline-none px-3 border border-gray-300 rounded-md" placeholder="search" type="text"/>
      </div>
      )}

      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user? 
        <h3><Link to="/write" className="cursor-pointer hover:text-gray-400">write</Link></h3> :
        <h3><Link to="/login" className="cursor-pointer hover:text-gray-400">Login</Link></h3>
        }
        {user? 
        <div onClick={showMenu}>
        <p className="cursor-pointer relative"><FaBars/></p>
        {menu && <Menu/>}
        </div>:
        <h3><Link to="/register" className="cursor-pointer hover:text-gray-400">Register</Link></h3>}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative"><FaBars/></p>
        {menu && <Menu/>}
      </div>
    </div>

  )
}

export default Navbar
