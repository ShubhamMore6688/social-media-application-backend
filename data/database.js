import mongoose from "mongoose";

export const database = () => mongoose.connect("mongodb://127.0.0.1:27017", {dbName: "socialmedia"}).then(()=>{
    console.log("database connected");
});