import express from "express";
import { userToFollow, userToUnfollow } from "../controller/following.js";

const routerFollow = express.Router();


routerFollow.get("/following", userToFollow);
routerFollow.get("/unfollow", userToUnfollow);

export default routerFollow;