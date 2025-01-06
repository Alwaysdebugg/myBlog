import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import { useState,useContext } from "react"
import { login } from "../services/api"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { FaMoon } from "react-icons/fa"
const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(false)
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // 邮箱验证
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e) => {
    const emailValue = e.target.value
    
    if (!emailValue) {
      setEmailError("Email cannot be empty")
    } else if (!validateEmail(emailValue)) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
      setEmail(emailValue)
    }
  }

  // 密码验证
  const validatePassword = (password) => {
    const passwordRegex = /^.{4,}$/
    return passwordRegex.test(password)
  }
  
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value
    if (!passwordValue) {
      setPasswordError("Password cannot be empty")
    } else if (!validatePassword(passwordValue)) {
      setPasswordError("Password must be at least 6 characters long")
    } else {
      setPasswordError("")
      setPassword(passwordValue)
    }
  }

  // 登录
  const handleLogin = async(event)=>{
    event.preventDefault()
    
    try{
      const res = await login(email,password)   
      localStorage.setItem("token", res.token)
      setUser(res)
      navigate("/")
    }catch(err){
      console.log("Error logging in", err)
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
        <h1 className="text-lg md:text-xl font-extrabold"><Link to="/" className="dark:text-white">Blog Market</Link></h1>
        <div className="flex items-center space-x-2">
          <Link to="/register" className="flex items-center cursor-pointer hover:bg-gray-200 hover:shadow-md hover:rounded-full p-2">
          <i className="fas fa-user-plus"></i>
          </Link>
        <button onClick={toggleDarkMode} className="p-2 bg-gray-200 dark:bg-gray-800 rounded">
        <FaMoon className="dark:text-white"/>
        </button>
        </div>
    </div>
    <div className="flex items-center justify-center h-[80vh] min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-6 text-center font-serif dark:text-white">Sign in with email</h1>
        <form className="flex flex-col items-center justify-center">
          <div className="mb-4 w-full">
            <input
              onChange={handleEmailChange}
              type="email"
              id="email"
              name="email"
              placeholder="email"
              className={`w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 
                ${emailError ? 'ring-red-500 focus:ring-red-500' : 'focus:ring-gray-200'} 
                dark:bg-gray-800 dark:text-white`}
              required
              aria-invalid={emailError ? "true" : "false"}
              aria-describedby="email-error"
            />
            {emailError && (
              <p id="email-error" className="mt-1 text-sm text-red-500">
                {emailError}
              </p>
            )}
          </div>
          <div className="mb-4 w-full">
            <input
              onChange={handlePasswordChange}
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className={`w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 
                ${passwordError ? 'ring-red-500 focus:ring-red-500' : 'focus:ring-gray-200'} 
                dark:bg-gray-800 dark:text-white`}
              required
              aria-invalid={passwordError ? "true" : "false"}
              aria-describedby="password-error"
            />
            {passwordError && (
              <p id="password-error" className="mt-1 text-sm text-red-500">
                {passwordError}
              </p>
            )}
          </div>
          <button
            onClick={handleLogin}
            type="submit"
            className="w-[100px] mb-3 py-2 bg-black text-white rounded-3xl hover:bg-slate-500 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-500 dark:text-white"
          >
            <span className="font-light font-serif">sign in</span>
          </button>
        </form>
        {error && <p className="text-red-500 text-center">Email or password is incorrect</p>}
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
