import HomePosts from "../components/HomePosts"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useState,useEffect,useContext } from "react"
import { fetchBlogPosts } from '../services/api'
import { useLocation } from "react-router-dom"
import Loader from "../components/Loader"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"
const Home = () => {
  const [noResult,setNoResult] = useState(false)
  const [loading,setLoading] = useState(false)
  const [blog,setBlog] = useState([])
  const {search} = useLocation()
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("search"); // 提取特定查询参数
  const {user} = useContext(UserContext)
  console.log('user',user)
  console.log('query',query)
  const fetchPosts = async()=>{
    setLoading(true)
    try{
      const res = await fetchBlogPosts(query)
      setBlog(res)
      if(res.length === 0){
        setNoResult(true)
      } else {
        setNoResult(false)
      }
      console.log('Blog list',res)
    }catch(err){
      setLoading(true)
      console.log('Error fetching blog posts in home',err)
    }
    setLoading(false)
  }
  useEffect(()=>{
    fetchPosts()
  },[query])
  return (
    <>
    <Navbar/>
    { loading ? <div className="flex justify-center items-center min-h-[40vh]"><Loader/></div> :
    <div className="px-8 md:px-[200px] py-8 min-h-[80vh]">
      {blog.map((blog)=>(
        <>
        <Link to={user?`/posts/post/${blog._id}`:`/login`}>
        <HomePosts key={blog._id} blog={blog}/>
        </Link>
        </>
      ))}
      {noResult && <h1 className="text-center text-2xl font-bold">No result found</h1>}
    </div>
    }
    <Footer/>
    </>
  )
}

export default Home
