//import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//business logic

exports.createComment = async (req, res) => {
    try { 
        //fetch data from req body
        const {post, user, body} = req.body;
        //create a comment object
        const comment = new Comment ({
            post,user,body
        });

        //save the new comment into the database
        const savedComment = await comment.save();

        //find the post by ID, add the new comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push : {comments: savedComment._id} }, {new: true} )
                .populate("comments") //populate the comments array with comment documents
                .exec();

        res.json({
             success:true,
            post: updatedPost,
        });
    }
    catch (err) {
        return res.status(500).json({
            error : "Error While Creating Comment",
        });
    }
}


exports.getAllComments = async(req,res)=>{
      try{
          
            const comments = await Comment.find({})

            res.status(200).json({
                success:true,
                 comment : comments
           });

      }

      catch(error){

        return res.status(500).json({
            error : "Error While fetching Comment",
        });

      }
}


exports.updateComments = async(req,res)=>{
      try{


        const{user,body,commentId} = req.body


        const updatedDetails = await Comment.findByIdAndUpdate({
              user,body
        })


        
        res.status(200).json({
            success:true,
             comment : updatedDetails
       });

         
           

      }
      catch(error){


        return res.status(500).json({
            error : "Error While updating Comment",
        });

           
      }
}


exports.deleteComments = async(req,res)=>{
      
       try{

        const{commentId} = req.body;
        await Comment.findByIdAndDelete({commentId})


        res.status(200).json({
            success:true,
             message : "comment deleted successfully"
       });

       }

       catch(error){


        return res.status(500).json({
            error : "Error While updating Comment",
        });

       }
}

