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
import { IF } from "../url"
import { useNavigate } from "react-router-dom"
import { deleteBlogPostById } from "../services/api"
import { fetchCommentsByPostId,postComment } from "../services/api"

const PostDetails = () => {
  const {id:postId} = useParams()
  const [postDetails,setPostDetails] = useState({})
  const {user} = useContext(UserContext)
  const [loading,setLoading] = useState(true)
  const [commentList,setCommentList] = useState([])
  const [comment,setComment] = useState('')
  const navigate = useNavigate()
  const fetchPost = async()=>{
    setLoading(true)
    try{
      const res = await fetchBlogPostById(postId)
      setPostDetails(res)
      setLoading(false)
    }catch(err){
      setLoading(true)
      throw err
    }
  }
  const fetchComments = async()=>{
    setLoading(true)
    try{
      const res = await fetchCommentsByPostId(postId)
      setCommentList(res)
      setLoading(false)
      console.log(res,"comments")
    }catch(err){
      console.log(err)
    }
  }
  const handlePostComment = async()=>{
    try{
      const res = await postComment(comment, user.username, postId, user._id)
      console.log(res,"comment posted successfully")
      fetchComments()
    }catch(err){
      console.log(err)
    }
  }

  const deletePost = async(id)=>{
    try{
      await deleteBlogPostById(id)
      navigate('/')
    }catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=>{
    fetchPost()
    fetchComments()
  },[postId])
  return (
    <div>
      <Navbar/>
      {loading? <div className="flex justify-center items-center h-[80vh] w-full"><Loader/></div>:
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">{postDetails.title}</h1>
            {user && user._id === postDetails.userId && (
            <div className="flex items-center justify-center space-x-2">
                <p className="cursor-pointer" onClick={()=>navigate("/edit/"+postId)}><BiEdit/></p>
                <p className="cursor-pointer" onClick={()=>deletePost(postId)}><MdDelete/></p>
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
        <img src={IF+postDetails.photo} 
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
          {commentList.length > 0 ? commentList.map((comment)=>(
            <Comment key={comment._id} comment={comment}/>
          )) : <p className="text-gray-500">No comments yet</p>}
        </div>
        <div className="w-full flex flex-col mt-4 md:flex-row">
          <input onChange={(e)=>setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[80%] outline-none px-4 mt-4 md:mt-0"/>
          <button onClick={handlePostComment} className="px-4 py-2 bg-black text-sm text-white rounded-lg hover:bg-slate-500 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
        </div>
      </div>
      }
      <Footer/>
    </div>
  )
}

export default PostDetails
