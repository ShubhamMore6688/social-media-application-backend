import { Post } from "../models/post.js";

export const createComment = async (req,res) =>{
    const {postid} = req.query;
    const {token} = req.cookies;
    const {text} = req.body;

    if(!token){
        return res.status(404).json({
            success: false,
            message: "Login first"
        })
    }

    const post = await Post.findById({_id: postid});
    if(!post){
        return res.status(404).json({
            success: false,
            message: "Post not found"
        })

   }

    await post.comments.push({text});
    await post.save();
    res.status(200).json({
        success: true,
        post
    })
}