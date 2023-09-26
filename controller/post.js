import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { Post } from "../models/post.js";
export const createPost = async(req,res) => {
    const {content} = req.body;
    const {token} = req.cookies;
    if(!token){
        return res.status(404).json({
            success: true,
            message: "Login first"
        })
    }

    const decoded = jwt.verify(token, "hjdfkhdshdsdkhah" );
   
    const user = await User.findById({_id: decoded._id});

    const post = await Post.create({
        user: decoded._id,
        content,
        likes: [
            
        ],
        comments: [
            
        ]
    })

    res.status(200).json({
        success: true,
        post
    })
}


export const getAllPosts = async(req,res) =>{
    const{token} = req.cookies;
    if(!token){
        return res.status(200).json({
            success: false,
            message: "Login first"
        })
    }

    const decoded = jwt.verify(token, "hjdfkhdshdsdkhah" );
    const user = await User.findById({_id: decoded._id});
    const post = await Post.find({user: user._id});

    res.status(200).json({
        success: true,
        post
    })
}


export const updatePost = async(req,res) =>{
    const{content} = req.body;
    const {postid} = req.query;
    const{token} = req.cookies;
    if(!token){
        return res.status(200).json({
            success: false,
            message: "Login first"
        })
    }

    const post = await Post.findByIdAndUpdate(
        {_id: postid}, 
        {content}, 
        {new: true, upsert: true}
        );

        res.status(200).json({
            success: true,
            post
        })
}


export const deletePost = async(req,res) =>{
    const {postid} = req.query;
    const{token} = req.cookies;
    if(!token){
        return res.status(200).json({
            success: false,
            message: "Login first"
        })
    }
    const post = await Post.findByIdAndRemove({_id: postid});
    if(!post){
        return res.status(404).json({
            success: false,
            message: "Post not found"
        })
    }
    res.status(200).json({
        success: true,
        message: "Post deleted successfully"
    })
}