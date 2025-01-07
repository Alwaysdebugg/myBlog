import { Link,useNavigate } from "react-router-dom"
import { FaSearch,FaBars,FaRegEdit,FaMoon } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { useState,useContext,useEffect } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const [menu,setMenu] = useState(false)
  const [prompt,setPrompt] = useState('')
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const {user} = useContext(UserContext)

  const handleMenuClick = (e) => {
    e.stopPropagation()
    console.log(menu)
    setMenu(!menu)
  }
  useEffect(() => {
  if (menu) {
    document.addEventListener('click', handleOutsideClick)
  }
 }, [menu])
 
  const handleOutsideClick = () => {
    if (menu) setMenu(false)
  }

  // 切换暗模式
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div onClick={handleOutsideClick} className="flex items-center justify-between px-6 md:px-[200px] py-4 dark:bg-gray-800">
      <h1 className="text-lg md:text-xl font-extrabold font-serif">
        <Link to="/" className="dark:text-white">Blog Market</Link>
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
      <div className="flex items-center justify-center space-x-2">
        <div className="hidden md:flex items-center justify-center space-x-2">
        {user? 
        <h3><Link to="/write" className="flex justify-center items-center cursor-pointer hover:bg-gray-200 hover:shadow-md hover:rounded-full p-2"><span className="mr-2 dark:text-white">Write</span><FaRegEdit className="dark:text-white"/></Link></h3> :
        <h3><Link to="/login" className="flex items-center cursor-pointer hover:bg-gray-200 hover:shadow-md hover:rounded-full p-2"><span className="mr-2 dark:text-white">Login</span><IoMdLogIn className="dark:text-white"/></Link></h3>
        }
        {user && (
            <div className="relative">
                <p onClick={handleMenuClick} 
                   className="cursor-pointer relative hover:bg-gray-200 hover:shadow-md hover:rounded-full p-2">
                    <FaBars className="dark:text-white"/>
                </p>
                {menu && <Menu setMenu={setMenu} navigate={navigate}/>}
            </div>
        )}
      </div>
      {!user && (
        <div className="md:hidden text-lg">
        <p onClick={handleMenuClick} 
           className="cursor-pointer relative hover:bg-gray-200 hover:shadow-md hover:rounded-full p-2">
            <FaBars className="dark:text-white"/>
        </p>
        {menu && <Menu setMenu={setMenu} navigate={navigate}/>}
      </div>
      )}
      <button onClick={toggleDarkMode} className="p-2 bg-gray-200 dark:bg-gray-800 rounded">
        <FaMoon className="dark:text-white"/>
      </button>
      </div>
    </div>

  )
}

export default Navbar
