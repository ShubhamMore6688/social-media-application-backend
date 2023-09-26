import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const userToFollow = async(req,res) =>{
    const {userid} = req.query;
    const {token} = req.cookies;
    if(!token){
        return res.status(404).json({
            success: true,
            message: "Login first",
        })
    }
    const usertofollow = await User.findById({_id: userid});
    const decoded = jwt.verify(token, "hjdfkhdshdsdkhah");
    const currentuser = await User.findById({_id: decoded._id});


    if(!usertofollow && !currentuser){
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    if(currentuser.following.includes(userid)){
        return res.status(200).json({
            success: true,
            message: "you already follow that user"
        })
    }
    currentuser.following.push(userid);
    usertofollow.followers.push(decoded._id);
    
    await currentuser.save();
    await usertofollow.save();

    res.status(200).json({
        success: true,
        message: "successfully follow the user"
    })

}



export const userToUnfollow = async (req,res) =>{
    const {token} = req.cookies;
    const {userid} = req.query;
    if(!token){
        return res.status(404).json({
            success: false,
            message: "Login first"
        })
    }

    const usertounfollow = await User.findById({_id: userid});
    const decoded = jwt.verify(token,  "hjdfkhdshdsdkhah");
    const currentuser = await User.findById({_id:decoded._id});
    
    
    if(!usertounfollow && !currentuser){
        return res.status(200).json({
            success: true,
            message: "User not found"
        })
    }

    if(!currentuser.following.includes(userid)){
        return res.status(404).json({
            success: false,
            message: "you not following that user"
        })
    }

    currentuser.following.pull(userid);
    usertounfollow.followers.pull(decoded._id);

    await currentuser.save();
    await usertounfollow.save();

    res.status(200).json({
        success: true,
        message: "Successfully unfollow the user"
    })
}