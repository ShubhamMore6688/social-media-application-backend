import express from "express";
import { createUserProfile, getUserProfile, updateUserProfile } from "../controller/userProfile.js";

const routerProfile = express.Router()



routerProfile.get("/getprofile", getUserProfile);
routerProfile.post("/createprofile", createUserProfile);
routerProfile.put("/updateprofile", updateUserProfile);



export default routerProfile;
