/* eslint-disable react/prop-types */
import { IF } from '../url'
const HomePosts = ({blog}) => {

  if(!blog) return <div className="flex justify-center items-center h-[30vh]">Loading...</div>

  return (
    <div className="w-full flex mt-8 space-x-4">
        <div className="flex w-full space-x-4">
          <div className="w-[35%] h-[200px] flex justify-center items-center">
            <img 
              src={IF+blog.photo} 
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col w-[65%]">
            <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
              {blog.title}
            </h1>
            <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
              <p>@{blog.username}</p>
              <div className="flex space-x-2">
                <p>{new Date(blog.updatedAt).toString().slice(0,15)}</p>
                <p>{new Date(blog.updatedAt).toString().slice(16,24)}</p>
              </div>
            </div>
            <p className="text-sm md:text-lg overflow-hidden text-ellipsis" 
               style={{ 
                 display: '-webkit-box', 
                 WebkitLineClamp: 3, 
                 WebkitBoxOrient: 'vertical', 
                 overflow: 'hidden' 
               }}>
              {blog.desc}
            </p>
          </div>
        </div>

    </div>
  )
}

export default HomePosts
