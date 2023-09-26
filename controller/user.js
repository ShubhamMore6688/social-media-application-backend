import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const userRegister = async (req,res) =>{
    const {email, name, username ,password} = req.body;
    let user = await User.findOne({email});
    if(user){
        return res.status(404).json({
            success: false,
            message: "user is already registered"
        })
    }
    const depassword = await bcrypt.hash(password,10);
    user = await User.create({email, name, username, password:depassword});

    const token = jwt.sign({_id: user._id}, "hjdfkhdshdsdkhah");
   
    res.status(200).cookie("token", token).json({
        success: true,
        message: "User register successfully"
    })
}


export const userLogin = async(req,res) =>{
   const {username, password} = req.body;
   const user = await User.findOne({username});
   if(!user){
    return res.status(404).json({
        success: false,
        message: "Register first"
    })
   }

   const isMatch = bcrypt.compare(password, user.password);
   if(!isMatch){
    return res.json({
        success: false,
        message: "Invalid password"
    })
   }

   const token = jwt.sign({_id: user._id}, "hjdfkhdshdsdkhah");
   res.cookie("token",token, {
    httpOnly: true,
   }).status(200).json({
    success: true,
    message: "Login successful"
   })
}



export const userLogout = (req,res) =>{
    

    res.cookie("token", "", {
        expires: new Date(Date.now())
    }).status(200).json({
        success: true,
        message: "Logout successfully"
    })
}

