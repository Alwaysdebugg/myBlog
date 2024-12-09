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


// get Blog Posts
export const fetchBlogPosts = async () => {
    try{
        const response = await api.get("/posts")
        return response.data
    }catch(error){
        console.error("Error fetching blog posts", error)
        throw error
    }
}

//REFETCH USER
export const loggedIn = async () => {
    const response = await api.get("/auth/refetch",{withCredentials:true})
    return response.data
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
