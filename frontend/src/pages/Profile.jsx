import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProfilePosts from "../components/ProfilePosts"

const Profile = () => {
  return (
    <div>
      <Navbar/>
      <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full">
            <h1 className="text-xl font-bold mb-2">Your posts:</h1>
            <ProfilePosts/>
        </div>
        <div className="md:sticky md:top-16 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
            <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input className="outline-none px-4 py-2 text-gray-500 bg-slate-200" placeholder="Your username" type="text" />
            <input className="outline-none px-4 py-2 text-gray-500 bg-slate-200" placeholder="Your email" type="text" />
            <input className="outline-none px-4 py-2 text-gray-500 bg-slate-200" placeholder="Your password" type="text" />
            <div className="flex items-center space-x-4 mt-8 px-2">
                <button className="w-full p-2 bg-black text-white rounded-lg hover:bg-slate-500 focus:outline-none text-sm">Update</button>
                <button className="w-full p-2 bg-black text-white rounded-lg hover:bg-slate-500 focus:outline-none text-sm">Delete</button>
            </div>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Profile
