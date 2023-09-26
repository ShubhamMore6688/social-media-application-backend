import jwt from "jsonwebtoken";
import { Post } from "../models/post.js";
import { User } from "../models/user.js";

export const likepost = async(req,res) =>{
    const {postid} = req.query;
    const {token} = req.cookies;
    if(!token){
        return res.status(404).json({
            success: false,
            message: "Login first"
        })
    }
    const decoded = jwt.verify(token, "hjdfkhdshdsdkhah");
    const user = await User.findById({_id: decoded._id});
    const post = await Post.findById({_id: postid})
    if(!post){
        return res.status(404).json({
            success: false,
            message: "Post not found"
        })
    }

    if(post.likes.includes(user._id)){
        post.likes.pull(user._id);
    }else{
        post.likes.push(user._id);
    }

    await post.save();
    res.status(200).json({
        success: true,
        post
    })

}