import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    content : {
        type: String,
        required: true,
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                
            },
            
            text: String,
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],

    createdAt: {
        type: Date,
        default: Date.now,
    }
})


export const Post = mongoose.model("post", postSchema);