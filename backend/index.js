const express = require('express')
const { default: mongoose } = require('mongoose')
const app=express()
const dotenv=require('dotenv')
const authRoute=require('./routes/auth')
const usersRoute=require('./routes/users')
const postsRoute=require('./routes/posts')
const commentRoute=require('./routes/comment')
const cookieParser = require('cookie-parser')

//database
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'blog'
        })
        console.log("database is connected successfully!")
    } catch(err){
        console.log(err)
    }
}

//middlewares
dotenv.config() //加载环境变量 .env
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/posts",postsRoute)
app.use("/api/comments",commentRoute)
app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is running on port" + process.env.PORT)
})