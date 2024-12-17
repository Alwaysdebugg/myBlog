import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {ImCross} from 'react-icons/im'
import { useState,useEffect } from 'react';
import { updateBlogPostById } from "../services/api";
import { useParams } from "react-router-dom";
import { fetchBlogPostById } from "../services/api";
import { uploadImage } from "../services/api";
import { useNavigate } from "react-router-dom";


const EditPost = () => {
  const {id:postId} = useParams()
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file,setFile] = useState(null)
  const [status, setStatus] = useState('');
  const [cat, setCat] = useState('');
  const [cats, setCatList] = useState([]);
  const navigate = useNavigate()

  const addCategory=()=>{
      let updatedCats = [...cats]
      if(cat != ""){
        updatedCats.push(cat)
        setCat("")
        setCatList(updatedCats)
      }
  };

  const deleteCategory=(i)=>{
      let updatedCats = [...cats]
      updatedCats.splice(i)
      setCatList(updatedCats)
  }

  const fetchPost = async()=>{
    try{
      const res = await fetchBlogPostById(postId)
      setTitle(res.title)
      setDesc(res.desc)
      setCatList(res.categories)
    }catch(err){
      console.log(err)
    }
  }

  const handleUpdate = async(e) => {
    e.preventDefault()
    const post = {
        title,
        desc,
        categories:cats
    }
    if(file){
        const formData = new FormData()
        const filename = Date.now() + file.name
        formData.append('img',filename)
        formData.append('file',file)
        post.photo = filename

        //img upload update
        try{
            await uploadImage(formData)
        }catch(err){
            console.log('Error updating post',err)
        }

    }
    //blog-content-update
    try{
        const res = await updateBlogPostById(postId,post)
        navigate("/posts/post/"+res._id)
        setStatus('Post updated successfully')
    }catch(err){
        console.log(err)
        setStatus('Error updating post')
    }
  };

  useEffect(()=>{
    fetchPost()
  },[postId])
  
  return (
    <div>
        <Navbar/>
        <div className="px-6 md:px-[200px] mt-8">
        <div className="flex justify-center items-center">
            <h1 className="font-bold md:text-2xl text-xl">Update A Post</h1>
        </div>
        <form onSubmit={handleUpdate} className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
        <div className="mb-4">
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
        </div>
        <div className="mb-4">
        <textarea
          id="content"
          placeholder="Content"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows="6"
          required
        ></textarea>
        </div>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
        <div className="flex flex-row items-center py-2 space-x-2">
            <input value={cat} onChange={(e)=>setCat(e.target.value)} type="text" placeholder="category" className="w-[50%] px-3 py-2 border border-gray-300 rounded-md"/>
            <div onClick={addCategory} required className="px-2 py-1 rounded-md bg-black text-white">+</div>
        </div>
        {/* category display */}
        <div className="flex mt-3">
            {cats?.map((c,i)=>(
            <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
            <p>{c}</p>
            <p onClick={()=>deleteCategory(i)} className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"><ImCross/></p>
            </div>                    
            ))}
        </div>
        <button
        type="submit"
        className="w-full py-2 bg-black text-white rounded-lg hover:bg-slate-500 focus:outline-none"
        >
        update
        </button>
        {status && (
        <p className={`mt-4 ${status.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
          {status}
        </p>
        )}
        </form>
        </div>
        <Footer/>
    </div>
  )
}

export default EditPost
