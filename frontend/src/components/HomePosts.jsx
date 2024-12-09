import { useState,useEffect } from 'react'
import { fetchBlogPosts } from '../services/api'

const HomePosts = () => {
  const [blogList,setBlogList] = useState([])

  useEffect(()=>{
    const fetchPosts = async()=>{
      try{
        const res = await fetchBlogPosts()
        setBlogList(res)
      }catch(err){
        console.log("Error fetching blog posts", err)
      }
    }
    fetchPosts()
  },[])

  if(blogList.length === 0) return <div className="flex justify-center items-center h-[30vh]">Loading...</div>

  return (
    <div className="w-full flex mt-8 space-x-4">
      { Array.isArray(blogList) && blogList.length > 0 &&blogList.map((blog, index) => (
        <div key={index} className="flex w-full">
          <div className="w-[35%] h-[200px] flex justify-center items-center">
            <img 
              src={blog.image} 
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col w-[65%]">
            <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
              {blog.title}
            </h1>
            <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
              <p>{blog.author}</p>
              <div className="flex space-x-2">
                <p>{blog.createdAt}</p>
                <p>{blog.time}</p>
              </div>
            </div>
            <p className="text-sm md:text-lg">{blog.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HomePosts
