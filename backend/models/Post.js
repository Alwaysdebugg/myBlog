const mongoose=require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    categories:{
        type:Array
    }
},{timestamps:true})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;