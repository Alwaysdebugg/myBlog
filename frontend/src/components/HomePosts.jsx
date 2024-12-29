/* eslint-disable react/prop-types */
import { IF } from '../url'

const HomePosts = ({blog}) => {
  // Helper function to strip HTML tags and get plain text
  const stripHtml = (html) => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  // Get post excerpt: if excerpt exists use it, otherwise generate from content
  const getExcerpt = (content, maxLength = 200) => {
    const plainText = stripHtml(content);
    if (!plainText) return '';
    
    // If text is shorter than maxLength, return as is
    if (plainText.length <= maxLength) return plainText;
    
    // Find the last complete sentence within maxLength
    const truncated = plainText.substring(0, maxLength);
    const lastPeriod = truncated.lastIndexOf('。');
    const lastQuestion = truncated.lastIndexOf('？');
    const lastExclamation = truncated.lastIndexOf('！');
    
    // Get the last sentence end position
    const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);
    
    // If we found a sentence end, use it; otherwise use the full truncated text
    return lastSentenceEnd !== -1 
      ? truncated.substring(0, lastSentenceEnd + 1)
      : truncated + '...';
  };

  if(!blog) return <div className="flex justify-center items-center h-[30vh]">Loading...</div>

  return (
    <div className="w-full flex mt-8 space-x-4">
        <div className="flex w-full space-x-4 bg-gray-100 p-2 rounded-lg shadow-sm">
          <div className="w-[35%] h-[200px] flex justify-center items-center shadow-lg">
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
              {blog.excerpt || getExcerpt(blog.desc)}
            </p>
          </div>
        </div>
    </div>
  )
}

export default HomePosts
