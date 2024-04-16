const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
    try {
        //We can also use .create method to create a new Post
        //Here new Post is created using save() method

        const {title, body} = req.body;
        const post = new Post({
            title, body,
        });
        const savedPost = await post.save();

        res.json({
            post : savedPost,
        });
        
    }
    catch (error) {
        return res.status(400).json({
            error: "Error while creating post",
        });
    }
};

//need some more testing after completing likeController
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.json({
            posts,
        })
    }
    catch (error) {
        return res.status(400).json({
            error: "Error while fetching all posts",
        })
    }
}


exports.updatePosts = async(req,res)=>{
   
     const{title,body,postId}  = req.body;

     const updatedDetails = await Post.findByIdAndUpdate({postId},{
          title,body
     })

     res.status(200).json({
         success : true,
         updatedDetails
     })

}


exports.deletePost = async(req,res)=>{


    try{

        const{postId} = req.body;

        await Post.findByIdAndDelete({postId})

        res.status(200).json({
            success : true,
            message : "file deleted successfully"
        })
   

    }
       catch(error){

         console.log(error);

         res.status(500).json({
             success : false,
             message : error.message
         })

       }
}