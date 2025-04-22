import userModel from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //chechking if user exist or not
     let existinguser = await userModel.findOne({ username });
     if (existinguser) {
       return res.send({message:"User already exist"});
     }

    //creating new user
    bcrypt.hash(password, 10,async function(err, hash) {
        let createdUser = await userModel.create({
            username,
            email,
            password:hash,
          })

          const user = await createdUser.save()

          let token = jwt.sign({username},process.env.JWT_KEY)
      
          if (user) {
            res.cookie("token",token)
            res.send({
              success:true,
              message:"Created successfully",
              token:token,
              createdUser
            });
          }
    });
  } catch (error) {
    res.send({
      success:false,
      message:"error",
      error
    });
  }
};

export const loginController = async(req,res)=>{
    try {
        const {username,password} = req.body

        let user = await userModel.findOne({username})
        if(!user){
            return res.send({success:false,message:"Incorrect Credentials"})
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                let token = jwt.sign({username},process.env.JWT_KEY)
                  res.cookie("token",token)
                  res.send({
                    success:true,
                    message:"LoggedIn successfully",
                    token:token,
                    user
                  });
                
            }
            else{
                res.send({
                  success:false,
                  message:"Incorrect Credentials",
                })
            }
        });

    } catch (error) {
        res.send({
          success:false,
          error
        })
    }
}