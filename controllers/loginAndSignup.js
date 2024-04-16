const User = require("../models/auth")

 const bcrypt = require("bcrypt")

 const jwt = require("jsonwebtoken")

 require("dotenv").config()
  
  
 
 exports.signUpHandler =  async(req,res)=>{
    try{

         //step 1 -: user ka dta nikal lege request ki body se
    const {name,email,password,role} = req.body
    
    // step2 -: check that user already exists in dtabase or not

    const userexists = await User.findOne({email}) // if email is already present in db then it will be fetched by findone method
      

    if(userexists){
        res.status(400).json({
          success : false,
          message : "user already exists"
        })
    }

    // step 4 -: we will encrypt the passowrd 
    let hashpassword;

     try{

        hashpassword = await bcrypt.hash(password,10);

    }

    catch(err){

      res.status(500).json({
         success : false,
         message : " password cant hashed"
      })

    }//

     //ste5 -; create user in dtabase
     
      const user = await User.create({
         name , email , password : hashpassword , role
      })

       res.status(200).json({
          success : true,
          message : "user created",
           data : user
      })

    }

    catch(error){


      console.log("error");

       res.status(500).json({
         success : false,
      })

         
    }
          
 }

 exports.loginHandler = async(req,res)=>{
         
       try{


             // step 1 -> get email and password from request body
         const {email,password} = req.body

         //step2-> check if email and password are not empty -> validation

         if(!email || !password){
             res.status(400).json({
               success : false,
               message : "no email or password"
             })
         }

         // step 3 -> check if email is present in database or not  

         let emailexists = await User.findOne({email})

         if(!emailexists){   // it means email data  is not foound in database 
             res.status(401).json({
               success : false,
               message : "user is not signed up"
             })
         }

      

         //step  4 : compare password that is if correct password is entered or not

           // this compare function compares normal and encrypted password , encrypted password is stored in db


           const payload ={
           
               email : emailexists.email,
               id : emailexists._id,
               role : emailexists.role
              
           }


         if(await bcrypt.compare(password , emailexists.password)){

            // step 5 -: as password is matched create a jwt 

            let token = jwt.sign(payload, process.env.JWT_SECRET , {
                expiresIn : "2hr",
            })

            emailexists.toObject()


            emailexists.token = token;

            emailexists.password = undefined


            //pass the token in a cookie and send the cookie in respones

            const options ={
                 expires : new Date(Date.now() +  3*24*60*60*1000),  // cookie will expire in 3 days
                 httpOnly : true,  //cant see the cookie in client side 
            }

            res.cookie("token", token, options ).status(200).json({
                success : true,
                token,
                emailexists,
                message : "user logged in successfully"
            })



             
         }

         else{
             res.status(403).json({
                success : false,
                message : " password does not match "
             })
         }


       }


       catch(error){


         console.log(error)


         res.status(500).json({
            success : false,
            message : " error while login"
         })


             
       }


 }