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
  
  const handleLogin = async()=>{
    try{
      event.preventDefault()
      const res = await login(email,password)   
      localStorage.setItem("token", res.token)
      setUser(res)
      navigate("/")
      console.log(res,"login")
    }catch(err){
      console.log("Error logging in", err)
      setError(true)
    }
  }

  return (
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog Market</Link></h1>
        <h3><Link to="/register">Register</Link></h3>
    </div>
    <div className="flex items-center justify-center h-[80vh] min-h-screen bg-white ">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form>
          <div className="mb-4">
            <input
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            onClick={handleLogin}
            type="submit"
            className="w-full py-2 bg-black text-white rounded-lg hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-center">Error logging in</p>}
        <div className="flex justify-center items-center space-x-3">
        <p>New here?</p>
        <p className="text-gray-500 hover:text-black"><Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Login
