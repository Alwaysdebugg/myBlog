const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')
const verifyToken = require('../verifyToken')

//Create comment
router.post('/create',verifyToken,async(req,res)=>{
    const newComment = new Comment(req.body)
    console.log('newComment',newComment)
    try{
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Update comment
router.put('/:id',verifyToken,async(req,res)=>{
    try{
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedComment)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Get comment
router.get('/post/:postId',async(req,res)=>{
    try{
        const comments = await Comment.find({postId:req.params.postId})
        res.status(200).json(comments)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Delete comment
router.delete('/:id',verifyToken,async(req,res)=>{
    try{
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({msg:"comment deleted successfully"})
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router