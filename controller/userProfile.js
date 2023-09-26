import { User } from "../models/user.js";
import { UserProfile } from "../models/userProfile.js";
import jwt from "jsonwebtoken";




export const getUserProfile = async (req,res) => {
    const {token} = req.cookies;

    const decoded = jwt.verify(token, "hjdfkhdshdsdkhah");
    const userprofile = await UserProfile.findOne({user: decoded._id});

    if(!userprofile){
        return res.status(404).json({
            success: false,
            message: "User profile not found"
        })
    }


    res.status(200).json({

        success: true,
        userprofile
    })
}


export const createUserProfile = async (req,res) =>{
    const {bio, profilePicture} = req.body;

    const {token} = req.cookies;
    if(!token){
        return res.status(404).json({
            success: false,
            message: "Login first"
        })
    }

    const decoded = jwt.verify(token, "hjdfkhdshdsdkhah" );
    const user = await User.findById({_id: decoded._id});

    const userprofile = await UserProfile.create({
        user: decoded._id,
        fullName: user.name,
        bio,
        profilePicture
    })

    res.status(200).json({
        success: true,
        userprofile
    })
}


export const updateUserProfile = async(req,res) =>{
    const {bio, profilePicture} = req.body;
    const {token} =  req.cookies;
    if(!token){
        return res.status(404).json({
            success: false,
            message: "Login first"
        })
    }
    const decoded = jwt.verify(token, "hjdfkhdshdsdkhah" )
    const userprofile = await UserProfile.findOneAndUpdate(
        {user: decoded._id}, 
        {bio, profilePicture}, 
        {new: true, upsert: true}
        );

    res.status(200).json({
        success: true,
        userprofile
    })    
}




//upload profile picture is remaining