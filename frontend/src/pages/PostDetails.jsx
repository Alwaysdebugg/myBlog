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
      setComment('')
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

  const removeCommentFromList = (commentId) => {
    setCommentList((prevComments) => prevComments.filter(comment => comment._id !== commentId));
  };

  return (
    <div>
      <Navbar/>
      {loading? <div className="flex justify-center items-center h-[80vh] w-full"><Loader/></div>:
      <div className="px-8 py-8 md:px-[200px] dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center">
        <img 
            src={IF + postDetails.photo} 
            alt={postDetails.title} 
            className="w-auto h-[50vh] rounded-lg"
        />
        </div>
        <div className="flex justify-between items-center mt-4">
            <h1 className="text-2xl font-bold font-serif text-black md:text-3xl dark:text-white">{postDetails.title}</h1>
            {user && user._id === postDetails.userId && (
            <div className="flex items-center justify-center space-x-2">
                <p className="cursor-pointer" onClick={()=>navigate("/edit/"+postId)}><BiEdit className="dark:text-white"/></p>
                <p className="cursor-pointer" onClick={()=>deletePost(postId)}><MdDelete className="dark:text-white"/></p>
            </div>
            )}
        </div>
        <div className="flex items-center justify-start mt-4 space-x-2">
            <p className="text-sm dark:text-white">@{postDetails.username}</p>
            <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(postDetails.updatedAt).toLocaleDateString()}</p>
            <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(postDetails.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <p className="mx-auto mt-8 text-lg leading-relaxed dark:text-white font-serif">{postDetails.desc}</p>
        <div className="flex items-center mt-8 mb-4 space-x-4 font-semibold">
            <p className="dark:text-white text-sm">Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              { postDetails.categories && postDetails.categories.map((category,index)=>(
                <div className="bg-gray-400 rounded-lg px-3 py-1 text-sm dark:bg-gray-800 dark:text-white" key={index}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
              ))}
            </div>
        </div>
        <div className="w-full flex items-center space-x-2 bg-white rounded-full shadow-md p-2 dark:bg-gray-800">
          <input 
            onChange={(e) => setComment(e.target.value)} 
            type="text" 
            placeholder="What are your thoughts?" 
            className="outline-none bg-transparent flex-grow text-sm px-4 py-2 rounded-full dark:text-white"
          />
          <button 
            onClick={handlePostComment} 
            className="bg-green-100 text-green-700 text-sm rounded-full px-4 py-2 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-700"
          >
            Reply
          </button>
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          <h3 className="mt-6 mb-2 font-semibold dark:text-white">Comments:</h3>
          {commentList.length > 0 ? commentList.map((comment)=>(
            <Comment key={comment._id} comment={comment} onDelete={removeCommentFromList} />
          )) : <p className="text-gray-500 dark:text-white">No comments yet</p>}
        </div>
      </div>
      }
      <Footer/>
    </div>
  )
}

export default PostDetails
