import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apierror.js";
// import { uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiresponse.js";
import jwt from "jsonwebtoken"
// import {sendPasswordChangeNotification} from "../utils/emailService.js"


const generateAccessAndRefereshTokens = async(userId) =>{
   try {
       const user = await User.findById(userId)
       const accessToken = user.generateAccessToken()
       //console.log("Access Token : ", accessToken)
       const refreshToken = user.generateResfreshToken()
        // console.log("Refresh Token: ", refreshToken)
       user.refreshToken = refreshToken
       await user.save({ validateBeforeSave: false })

       return {accessToken, refreshToken}


   } catch (error) {
       throw new ApiError(500, "Something went wrong while generating referesh and access token")
   }
}

const registerUser = asyncHandler(async (req, res) => {
   const {username, mobileNo, email, password} = req.body
   
   //INdividual validation
  /* if(fullName==="")
   {
      throw new ApiError(400,"Full Name is  required");
   } */

      // combined validation
      if([email,username, password].some((field)=>{field?.trim()===""})){
         throw new ApiError(400,"All fields are required");
      }
      if(mobileNo=="")
      {
         throw new ApiError(400,"Mobile No is required");
      }

      // If user already exist
      const existedUser = await User.findOne({$or:[{username,email}]})

      if(existedUser){
         throw new ApiError(409,"User with email or username already exist");
      }

       //Create user object --> entry in db

       const user = await User.create({
         username,
         email,
         mobileNo,
         password,
       })

       // Check whether user created or not

       const createdUser = await User.findById(user._id).select("-password -refreshToken")

       if(!createdUser)
       {
         throw new ApiError(500,"Something went wrong while registering the user");
       }

       return res
       .status(201)
       .json(
         new ApiResponse(200,createdUser,"User created Successfully")
      )
});

const logInUser = asyncHandler(async(req,res)=>{
   // 
   const {email,  password} = req.body

   // username or email not provided
   if(!email)
   {
      throw new ApiError(400,"Username is required")
   }
   // username or email provided but password not provided
   if(!password)
   {
      throw new ApiError(400,"Password is required")
   }

   // Is password correct or not
   const user = await User.findOne({email}).select("-refreshToken")
   if(!user)
   {
      throw new ApiError(404,"user not exist")
   }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if(!isPasswordValid)
   {
      throw new ApiError(404,"Enter valid password")
   }
   // Generate token
   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

   // Logged in user

   const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

   const options={
      httpOnly:true,
      secure:true
   }

   return res
   .status(200)
   .cookie("refreshToken",refreshToken,options)
   .cookie("accessToken",accessToken,options)
   .json(
      new ApiResponse(200,loggedInUser,"User logged in Successfully")
   )


})

const logOutUser = asyncHandler(async (req,res)=>{
   // Get user from cookie
    await User.findByIdAndUpdate(req.user._id,{
      $unset:{refreshToken:1}
    },
   {
      new:true
   }
)

  const options = {
      httpOnly:true,
      secure:true
   }

  return res
   .clearCookie("refreshToken",options)
   .clearCookie("accessToken",options)
   .status(200)
   .json(new ApiResponse(200,"User logged out successfully"))
  
})


export { 
    registerUser,
    logInUser,
    logOutUser,
}