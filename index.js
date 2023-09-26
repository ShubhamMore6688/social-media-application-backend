import express from 'express';
import { database } from './data/database.js';
import userRouter from './routes/user.js';
import profileRouter from './routes/userProfile.js';
import postRouter from './routes/post.js';
import followRouter from './routes/follow.js';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';

config({
   path: "./data/cofig.env"
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/follow", followRouter);

database();

app.listen(3000, ()=>{
    console.log("server is running");
});