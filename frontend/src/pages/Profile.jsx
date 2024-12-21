import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { UserContext } from "../context/UserContext"
import { useContext, useState } from "react"

const Profile = () => {
  const {user} = useContext(UserContext)
  const [edit, setEdit] = useState(false)
  // const [username, setUsername] = useState(user.username)
  // const [email, setEmail] = useState(user.email)
  // const [bio, setBio] = useState(user.bio)
  return (
    <div>
      <Navbar/>
      <div className="h-screen px-8 md:px-[200px] mt-8 flex flex-col">
          <img src='data:image/png;base64,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'
          alt="avatar" 
          className="w-[100px] h-[100px] object-cover rounded-full" 
          />
        <div className="flex flex-col w-full mt-2 mb-4">
            {user && <h1 className="text-2xl font-bold mb-2 font-serif">{user.username}</h1>}
            {user && <p className="text-lg font-thin font-serif">email: {user.email}</p>}
            {user && <span className="text-lg font-thin font-serif">Bio: Life is a journey, and I&apos; m on the path to success. Let&apos;s explore the world together!</span>}
        </div>
        <span onClick={()=>setEdit(true)} className="w-[100px] cursor-pointer text-green-500 hover:text-black focus:outline-none focus:ring-0 focus:ring-gray-200 text-sm font-medium">Edit Profile</span>
      </div>

      {/* edit profile */}
      {edit && <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Profile information</h2>
            <button onClick={()=>setEdit(false)} className="text-gray-500 hover:text-black">&times;</button>
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <img src="your-image-url" alt="Profile" className="w-16 h-16 rounded-full mr-4" />
              <div>
                <button className="text-green-500 hover:underline">Update</button>
                <button className="text-red-500 hover:underline ml-2">Remove</button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name*</label>
            <input type="text" className="w-full px-4 py-2 bg-gray-100 rounded-lg mt-1" placeholder={user.username} />
            <p className="text-right text-xs text-gray-500">10/50</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Pronouns</label>
            <input type="text" className="w-full px-4 py-2 bg-gray-100 rounded-lg mt-1" placeholder="Add..." />
            <p className="text-right text-xs text-gray-500">0/4</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Short bio</label>
            <textarea className="w-full px-4 py-2 bg-gray-100 rounded-lg mt-1" rows="3" placeholder="Add a short bio..."></textarea>
            <p className="text-right text-xs text-gray-500">0/160</p>
          </div>
          <div className="flex justify-between items-center">
            <button className="text-green-500 hover:underline">About Page</button>
            <div>
              <button onClick={()=>setEdit(false)} className="text-gray-500 hover:text-black mr-2">Cancel</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed">Save</button>
            </div>
          </div>
        </div>
      </div>}
      <Footer/>
    </div>
  )
}

export default Profile
