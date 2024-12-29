const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//REGISTER
router.post("/register",async(req,res)=>{
    try{
        const {username,email,password} = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        
        const newUser = new User({username,email,password:hashedPassword})
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }
    catch(err){
        console.error("Error during registration:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
})


//LOGIN
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json({msg:"user not found"})
        }
        const match = await bcrypt.compare(req.body.password,user.password)

        if(!match){
            return res.status(401).json({msg:"wrong password", password:req.body.password,match:match,user:user})
        }

        const token = jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.JWT_SECRET,{expiresIn:"3d"})
        const {password,...info} = user._doc
        res.cookie("token",token).status(200).json(info)
        
        // res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
  });


//LOGOUT
router.get('/logout', (req, res) => {
    // 清除身份验证令牌的 cookie
    try{
        res.clearCookie("token", {
            sameSite: "none", // 允许跨站请求发送 cookie
            secure: true      // 仅在 HTTPS 连接上发送 cookie
        })
        res.status(200).json({ msg: "Logout successfully" }); // 返回成功消息
    }
    catch(err){
        res.status(500).json(err)
    }
});


//REFETCH USER
router.get("/refetch",(req,res)=>{
    const token = req.cookies.token
    try{
        jwt.verify(token,process.env.JWT_SECRET, async (err,info)=>{
            res.status(200).json(info)
        })
    }
    catch(err){
        res.status(404).json({msg:"please login first"})
    }
})  


module.exports = router