const mongoose=require('mongoose')

const CommentSchema = new mongoose.Schema({
    Comment:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        require:true
    }
},{timestamps:true})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;