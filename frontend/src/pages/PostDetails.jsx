import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import Comment from "../components/Comment"
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { fetchBlogPostById } from "../services/api"
import { useParams } from "react-router-dom"
import { useEffect,useState,useContext } from "react"
import { UserContext } from "../context/UserContext"
import Loader from "../components/Loader"

const PostDetails = () => {
  const {id:postId} = useParams()
  console.log('postId',postId)
  const [postDetails,setPostDetails] = useState({})
  const {user} = useContext(UserContext)
  const [loading,setLoading] = useState(true)
  const fetchPost = async()=>{
    setLoading(true)
    try{
      const res = await fetchBlogPostById(postId)
      console.log('postDetails',res)
      setPostDetails(res)
      setLoading(false)
    }catch(err){
      setLoading(true)
      console.log('Error fetching post details',err)
    }
  }
  useEffect(()=>{
    fetchPost()
  },[postId])
  return (
    <div>
      <Navbar/>
      {loading? <div className="flex justify-center items-center h-[80vh] w-full"><Loader/></div>:
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">{postDetails.title}</h1>
            {user && user.id === postDetails.userId && (
            <div className="flex items-center justify-center space-x-2">
                <p><BiEdit/></p>
                <p><MdDelete/></p>
            </div>
            )}
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{postDetails.username}</p>
            <div className="flex space-x-2">
            <p>{new Date(postDetails.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(postDetails.updatedAt).toString().slice(16,24)}</p>
            </div>
        </div>
        <img src={postDetails.photo} 
            alt={postDetails.title} 
            className="w-[20%] h-[20%] md:w-[30%] mt-8"
        />
        <p className="mx-auto mt-8">{postDetails.desc}</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              { postDetails.categories && postDetails.categories.map((category,index)=>(
                <div className="bg-gray-400 rounded-lg px-3 py-1" key={index}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
              ))}
            </div>
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          {/* comments: */}
          {/* Two mock comments */}
          <Comment/>
          <Comment/>
        </div>
        {/* Write a comment */}
        <div className="w-full flex flex-col mt-4 md:flex-row">
          <input type="text" placeholder="Write a comment" className="md:w-[80%] outline-none px-4 mt-4 md:mt-0"/>
          <button className="px-4 py-2 bg-black text-sm text-white rounded-lg hover:bg-slate-500 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
        </div>
      </div>
      }
      <Footer/>
    </div>
  )
}

export default PostDetails
