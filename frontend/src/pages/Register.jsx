import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import { useState } from "react"
import { register } from "../services/api"
import { useNavigate } from "react-router-dom"
import { IoMdLogIn } from "react-icons/io"

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


  return (
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog Market</Link></h1>
        <h3><Link to="/Login" className="flex items-center">Login<IoMdLogIn/></Link></h3>
    </div>
    <div className="flex items-center justify-center h-[80vh] min-h-screen bg-white">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome</h1>
        <form>
        <div className="mb-4">
            <input
              onChange={(e)=>setUsername(e.target.value)}
              type="Username"
              id="Username"
              name="Username"
              placeholder="Enter your Username"
              className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
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
            onClick={handleRegister}
            type="submit"
            className="w-full py-2 bg-black text-white rounded-lg hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Register
          </button>
        </form>
        {error && <p className="text-red-500 text-center">Error registering</p>}
        <div className="flex justify-center items-center space-x-3">
        <p>Already have a account?</p>
        <p className="text-gray-500 hover:text-black"><Link to="/Login">Login</Link></p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Register
