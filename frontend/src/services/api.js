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

// Get Blog Post by ID
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
        const response = await api.post("/upload",file,{withCredentials:true})
        return response.data
    }catch(error){
        console.error("Error uploading image", error)
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
