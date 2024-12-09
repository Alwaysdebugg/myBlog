import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import Comment from "../components/Comment"
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'

const PostDetails = () => {
  return (
    <div>
      <Navbar/>
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">10 challenges of machine learning</h1>
            <div className="flex items-center justify-center space-x-2">
                <p><BiEdit/></p>
                <p><MdDelete/></p>
            </div>
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@jacky</p>
            <div className="flex space-x-2">
                <p>16/06/2023</p>
                <p>16:45</p>
            </div>
        </div>
        <img src="https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="" 
            className="w-[20%] h-[20%] md:w-[50%] mt-8"
        />
        <p className="mx-auto mt-8">Are you looking for an easy guide on how to start a blog?The step-by-step guide on this page will show you how to create a blog in 20 minutes with just the most basic computer skills.After completing this guide you will have a beautiful blog that is ready to share with the world.This guide is made especially for beginners. I will walk you through each and every step, using plenty of pictures and videos to make it all perfectly clear.If you get stuck or have questions at any point, simply send me a message and I will do my best to help you out.</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
                <div className="bg-gray-400 rounded-lg px-3 py-1">Tech</div>
                <div className="bg-gray-400 rounded-lg px-3 py-1">Life</div>
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
      <Footer/>
    </div>
  )
}

export default PostDetails
