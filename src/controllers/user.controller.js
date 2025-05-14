import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    //step1 : get user deatil from frontend/postmanm
    //step2 : validation
    //step3 : check if user is already exist -> username and email
    //step4 : check for images, avatar
    //step5 : upload to cloudinaRY, as avatar
    //step6 : create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    //destructuring
    const {fullName, email, username, password} = req.body
    console.log("email: ",email);

    if(fullName.trim() === ""){
        throw new ApiError(400, "fullname is required")
    }
    if(email.trim() === "" || !email.includes('@')){
        throw new ApiError(400, "Email not correct")
    }
    if(username.trim() === ""){
        throw new ApiError(400, "username is required")
    }
    if(password.trim() === ""){
        throw new ApiError(400, "Password is required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        throw new ApiError(409, "User with given credentials exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

     return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
});

export { registerUser };
