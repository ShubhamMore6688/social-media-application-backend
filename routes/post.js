import express from "express";
import { createPost, deletePost, getAllPosts, updatePost } from "../controller/post.js";
import { likepost } from "../controller/likePost.js";
import { createComment } from "../controller/commentPost.js";

const routerPost = express.Router();


routerPost.post("/newpost", createPost);
routerPost.get("/getposts", getAllPosts);
routerPost.post("/updatepost", updatePost);
routerPost.get("/deletepost", deletePost);
routerPost.post("/likepost", likepost);
routerPost.post("/comment", createComment);


export default routerPost;