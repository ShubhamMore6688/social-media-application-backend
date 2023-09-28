import mongoose from "mongoose";

const connectDB = () => mongoose.connect(process.env.DATABASE_URL, {dbName: "socialmedia"}).then(()=>{
    console.log("database connected");
});


export default connectDB;