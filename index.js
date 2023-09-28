import express from 'express';
import userRouter from './routes/user.js';
import profileRouter from './routes/userProfile.js';
import postRouter from './routes/post.js';
import followRouter from './routes/follow.js';
import cookieParser from 'cookie-parser';
import connectDB from "./data/database.js"
import { config } from 'dotenv';


const app = express();
config({
    path: "./data/config.env"
})

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/follow", followRouter);



app.listen(5000, ()=>{
    console.log("server is running");
});