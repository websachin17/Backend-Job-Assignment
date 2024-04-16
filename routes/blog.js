const express = require('express');
const router = express.Router();

//import controller
const { dummyLink } = require('../controllers/dummyController');
const {createComment,getAllComments,updateComments,deleteComments} = require('../controllers/commentController');
const {createPost, getAllPosts,updatePosts,deletePost} = require('../controllers/postController');
const {likePost, unlikePost} = require('../controllers/likeController');

//Mapping Create
router.get("/dummyRoute", dummyLink);
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);
router.put("/posts/update",updatePosts);
router.delete("/posts/delete",deletePost)
router.get("/comments/fetch",getAllComments);
router.put("/comments/update",updateComments)
router.delete("/comments/delete",deleteComments)



const{signUpHandler,loginHandler} = require("../controllers/loginAndSignup")


  router.post("/signup", signUpHandler)

  router.post("/login",loginHandler)


  // protected routes -: using middlewares 

  const{ auth , isStudent , isAdmin} = require("../middlewares/Auth")

    router.get("/test" , auth , (req,res)=>{
        res.json({
          succes : true,

          message : "welcome to protected route"
        })

    })

  router.get("/student" , auth , isStudent ,(req,res)=>{
       res.json({
         succes : true,
         message : " welcome to student dashboard"
       })
  })

  router.get("/admin" , auth , isAdmin ,(req,res)=>{
    res.json({
      succes : true,
      message : " welcome to admin dashboard"
    })
})
   
//export
module.exports = router;