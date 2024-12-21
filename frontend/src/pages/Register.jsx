import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import { useState } from "react"
import { register } from "../services/api"
import { useNavigate } from "react-router-dom"
import { IoMdLogIn } from "react-icons/io"
import { FaMoon } from "react-icons/fa"

const Register = () => {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async()=>{
    event.preventDefault()
    try{
      const res = await register(username,email,password)
      setUsername(res.username)
      setEmail(res.email)
      setPassword(res.password)
      setError(false)
      navigate("/login")
      console.log(res)
    }catch(err){
      console.log("Error registering", err)
      setError(true)
    }
  }
  // 切换暗模式
  const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
  };


  return (
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 dark:bg-gray-900">
        <h1 className="text-lg md:text-xl font-extrabold dark:text-white"><Link to="/">Blog Market</Link></h1>
        <div className="flex items-center space-x-2">
        <h3><Link to="/Login" className="flex items-center dark:text-white">Login<IoMdLogIn className="dark:text-white"/></Link></h3>
        <button onClick={toggleDarkMode} className="p-2 bg-gray-200 dark:bg-gray-800 rounded">
        <FaMoon className="dark:text-white"/>
        </button>
        </div>
    </div>
    <div className="flex items-center justify-center h-[80vh] min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-6 text-center font-serif dark:text-white">Sign up with email</h1>
        <form className="flex flex-col items-center justify-center">
        <div className="mb-4 w-full">
            <input
              onChange={(e)=>setUsername(e.target.value)}
              type="Username"
              id="Username"
              name="Username"
              placeholder="username"
              className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <input
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="email"
              className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <input
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <button
            onClick={handleRegister}
            type="submit"
            className="w-[100px] mb-3 py-2 bg-black text-white rounded-3xl hover:bg-slate-500 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-500 dark:text-white"
          >
          <span className="font-light font-serif">sign up</span>
          </button>
        </form>
        {error && <p className="text-red-500 text-center">Error registering</p>}
        <div className="flex justify-center items-center space-x-3">
        <p className="text-gray-500 hover:text-black">Already have a account?</p>
        <p className="text-gray-500 hover:text-black"><Link to="/Login"><IoMdLogIn/></Link></p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Register
