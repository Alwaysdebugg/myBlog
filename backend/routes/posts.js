const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

//Create post
router.post('/create',verifyToken,async(req,res)=>{
    try{
        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Update post
router.put('/:id',verifyToken,async(req,res)=>{
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)
    }
    catch(err){
        res.status(500).json(err)
    }
}) 

//Get post detail
router.get('/:id',async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Get All posts
router.get('/',async(req,res)=>{
    const query = req.query
    try{
        const searchFilter = query.search ? 
            { title: { $regex: query.search, $options: "i" } } : 
            {};
        const posts = await Post.find(searchFilter)
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})  

//Get POSTS by USER ID
router.get('/user/:userId',async(req,res)=>{
    try{
        const posts = await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Delete post
router.delete('/:id',verifyToken,async(req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({msg:"post deleted successfully"})
    }
    catch(err){
        res.status(500).json(err)
    }
})
module.exports = router