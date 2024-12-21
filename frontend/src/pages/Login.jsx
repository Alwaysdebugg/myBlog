import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import { useState,useContext } from "react"
import { login } from "../services/api"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(false)
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  
  const handleLogin = async(event)=>{
    try{
      event.preventDefault()
      const res = await login(email,password)   
      localStorage.setItem("token", res.token)
      setUser(res)
      navigate("/")
      console.log(res,"login_token")
    }catch(err){
      console.log("Error logging in", err)
      setError(true)
    }
  }

  return (
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog Market</Link></h1>
        <h3 className="flex items-center">
          <Link to="/register" className="flex items-center cursor-pointer hover:bg-gray-200 hover:shadow-md hover:rounded-full p-2">
          <i className="fas fa-user-plus"></i>
          </Link>
        </h3>
    </div>
    <div className="flex items-center justify-center h-[80vh] min-h-screen bg-white ">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center font-serif">Sign in with email</h1>
        <form className="flex flex-col items-center justify-center">
          <div className="mb-4 w-full">
            <input
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="email"
              className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
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
              className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>
          <button
            onClick={handleLogin}
            type="submit"
            className="w-[100px] mb-3 py-2 bg-black text-white rounded-3xl hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-center">Error logging in</p>}
        <div className="flex justify-center items-center space-x-3">
        <p className="text-gray-500 hover:text-black">Don&apos;t have an account?</p>
        <p className="text-gray-500 hover:text-black">
          <Link to="/register">
            <i className="fas fa-user-plus"></i>
          </Link>
        </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Login
