// My post page
// 1. show all posts of the user
import { useContext, useState, useEffect } from "react"  
import { UserContext } from "../context/UserContext"
import { getPostsByUserId } from "../services/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import HomePosts from "../components/HomePosts"
import { Link } from "react-router-dom"


const MyBlog = () => {
    const {user} = useContext(UserContext)
    const [blog,setBlog] = useState([])
    const [loading,setLoading] = useState(true)
    const fetchPosts = async()=>{
        setLoading(true)
        try{
            const posts = await getPostsByUserId(user._id)
            setBlog(posts)
            setLoading(false)
        }catch(err){
            setLoading(true)
            console.log('Error fetching posts by user',err)
        }
    }
    useEffect(()=>{
        fetchPosts()
    },[])
    return (
        <>
        <Navbar/>
        <div className="flex flex-col items-center justify-center min-h-[80vh] dark:bg-gray-900">
        <div className="flex justify-center items-center px-8 md:px-[200px] mt-8">
            <h1 className="text-2xl md:text-3xl font-bold font-serif dark:text-white">My Blog</h1>
        </div>
        { loading ? <div className="flex justify-center items-center min-h-[40vh]"><Loader/></div> :
        <div className="px-8 md:px-[200px] py-4 min-h-[80vh]">
          {blog.map((blog)=>(
            <>
            <Link to={`/posts/post/${blog._id}`}>
            <HomePosts key={blog._id} blog={blog}/>
            </Link>
            </>
          ))}
        </div>
        }
        </div>
        <Footer/>
        </>
    )
}

export default MyBlog
