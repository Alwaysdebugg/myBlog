import axios from "axios"

const api = axios.create({
    baseURL: `/api`,
  });

//Login
export const login = async (email,password) => {
    try{
        const res = await api.post("/auth/login",{email,password},{withCredentials:true})
        return res.data
    }catch(err){
        console.log("Error logging in", err)
        throw err
    }
}

//Register
export const register = async (username,email,password) => {
    try{
        const res = await api.post("/auth/register",{username,email,password})
        return res.data
    }catch(err){
        console.log("Error registering", err)
        throw err
    }
}

// Get Blog Posts
export const fetchBlogPosts = async (search) => {
    try{
        const response = await api.get("/posts",{params:{search}})
        return response.data
    }catch(error){
        console.error("Error fetching blog posts", error)
        throw error
    }
}
//Get Posts by User ID
export const getPostsByUserId = async (userId) => {
    try{
        const response = await api.get(`/posts/user/${userId}`)
        return response.data
    }catch(error){
        console.error("Error fetching posts by user", error)
        throw error
    }
}

// Get Post Details by Post ID
export const fetchBlogPostById = async (id) => {
    try{
        const response = await api.get(`/posts/${id}`)
        return response.data
    }catch(error){
        console.error("Error fetching blog post by id", error)
        throw error
    }
}

//REFETCH USER
export const loggedIn = async () => {
    const response = await api.get("/auth/refetch",{withCredentials:true})
    return response.data
}

//Create Blog content
export const createBlogContent = async (post) => {
    try{
        const response = await api.post("/posts/create",post,{withCredentials:true})
        return response.data
    }catch(error){
        console.error("Error creating blog content", error)
        throw error
    }
}

// Upload Image
export const uploadImage = async (file) => {
    try{
        const response = await api.post("/upload",file)
        return response.data
    }catch(error){
        console.error("Error uploading image", error)
        throw error
    }
}

//Delete Blog Post
export const deleteBlogPostById = async (id) => {
    try{
        const response = await api.delete(`/posts/${id}`,{withCredentials:true})
        return response.data
    }catch(error){
        console.error("Error deleting blog post", error)
        throw error
    }
}

//Update Blog Post
export const updateBlogPostById = async (id,post) => {
    try{
        const response = await api.put(`/posts/${id}`,post,{withCredentials:true})
        return response.data
    }catch(error){
        console.error("Error updating blog post", error)
        throw error
    }
}

//Comments

//Get Comments by Post ID
export const fetchCommentsByPostId = async (id) => {
    try{
        const response = await api.get(`/comments/post/${id}`)
        return response.data
    }catch(error){
        console.error("Error fetching comments by post id", error)
        throw error
    }
}

//Post Comment
export const postComment = async (comment,author,postId,userId) => {
    try{
        const response = await api.post("/comments/create",{
            comment,
            author,
            postId,
            userId
        },{withCredentials:true})
        return response.data
    }catch(error){
        console.error("Error posting comment", error)
        throw error
    }
}

//Delete Comment
export const deleteComment = async (id) => {
    try{
        const response = await api.delete(`/comments/${id}`,{withCredentials:true})
        return response.data
    }catch(error){
        console.error("Error deleting comment", error)
        throw error
    }
}

//Logout
export const logout = async () => {
    try{
        const response = await api.get("/auth/logout",{withCredentials:true})
        return response.data
    }catch(err){
        console.log("Error logging out", err)
        throw err
    }
}

export default api
