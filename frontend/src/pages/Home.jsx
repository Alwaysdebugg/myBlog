import HomePosts from "../components/HomePosts"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useState,useEffect } from "react"
import { fetchBlogPosts } from '../services/api'
const Home = () => {
  const [blog,setBlog] = useState([])

  useEffect(()=>{
    const fetchPosts = async()=>{
      try{
        const res = await fetchBlogPosts()
        setBlog(res)
        console.log(res)
      }catch(err){
        console.log("Error fetching blog posts", err)
      }
    }
    fetchPosts()
  },[])
  return (
    <>
    <Navbar/>
    <div className="px-8 md:px-[200px] py-8">
      { blog.map((blog)=>(
        <HomePosts key={blog._id} blog={blog}/>
      ))}
    </div>
    <Footer/>
    </>
  )
}

export default Home
