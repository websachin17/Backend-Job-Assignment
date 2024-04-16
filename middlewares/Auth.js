require("dotenv").config();


  const jwt = require("jsonwebtoken")




  exports.auth = (req,res,next)=>{   // auth is used to authorize the wheter the token is valid or not


        try{

            const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");


            if(!token || token===undefined){
               res.status(401).json({
                success : false,
                message : "token missing"
               })
            }

            // verify the token

            try{

                const decode = jwt.verify(token,process.env.JWT_SECRET)

                req.emailexists = decode  // ye decode value bhi data ke andar dal di

            }

            catch(error){

               res.status(401).json({
                    success : false,
                    message : " token is invalid"
               })

            }


            next()

             

        }

        catch(error){

              res.status(401).json({
                 success : false,
                 message : "cant verified token"
              })
        }
            
      
         
  }


  exports.isStudent = (req,res,next)=>{

        try{
            if(req.emailexists.role != "Student"){

               res.status(401).json({
                  success : false,
                  message : " route only for student "
               })

            }
        }

        catch(error){

             res.status(500).json({
               success : false,
               message : " some error while matching role"
             })
            
        }
       
  }



  exports.isAdmin = (req,res,next)=>{

    try{
        if(req.emailexists.role != "Admin"){

           res.status(401).json({
              success : false,
              message : " route only for Admin "
           })

        }
    }

    catch(error){

         res.status(500).json({
           success : false,
           message : " some error while matching role"
         })
        
    }
   
}