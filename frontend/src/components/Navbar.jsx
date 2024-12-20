import { Link,useNavigate } from "react-router-dom"
import { FaSearch,FaBars,FaRegEdit } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
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
      <h1 className="text-lg md:text-xl font-extrabold font-serif">
        <Link to="/">Blog Market</Link>
      </h1>
      {pathname === '/' && (
      <div className="flex justify-center items-center space-x-2 bg-gray-100 p-2 rounded-full shadow-sm">
        <p onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))} className="cursor-pointer p-2">
          <FaSearch />
        </p>
        <input
          onChange={(e) => setPrompt(e.target.value)}
          className="outline-none bg-transparent text-gray-800"
          placeholder="Search"
          type="text"
        />
      </div>
      )}

      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user? 
        <h3><Link to="/write" className="flex justify-center items-center cursor-pointer hover:bg-gray-200 hover:shadow-md hover:rounded-full p-2"><span className="mr-2">write</span><FaRegEdit/></Link></h3> :
        <h3><Link to="/login" className="flex items-center cursor-pointer hover:bg-gray-200 hover:shadow-md hover:rounded-full p-2">Login<IoMdLogIn/></Link></h3>
        }
        {user &&
        <div onClick={showMenu}>
        <p className="cursor-pointer relative hover:bg-gray-200 hover:shadow-md hover:rounded-full p-2">
          <FaBars />
        </p>
        {menu && <Menu/>}
        </div>}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative hover:bg-gray-200 hover:shadow-md hover:rounded-full p-2">
          <FaBars />
        </p>
        {menu && <Menu/>}
      </div>
    </div>

  )
}

export default Navbar
