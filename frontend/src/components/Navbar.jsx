import { Link } from "react-router-dom"
import { FaSearch,FaBars } from "react-icons/fa";
import { useState,useContext } from "react";
import Menu from "./menu";
import { UserContext } from "../context/UserContext";
const Navbar = () => {
  const [menu,setMenu] = useState(false)

  const showMenu = () => {
    setMenu(!menu)
  }
  const {user} = useContext(UserContext)
  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog Market</Link></h1>

      <div className="flex justify-center items-center space-x-1">
      <p><FaSearch /></p>
      <input className="text-center outline-none px-3 border border-gray-300 rounded-md" placeholder="search" type="text"/>
      </div>

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
