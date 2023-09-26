import mongoose from "mongoose";

const schema = mongoose.Schema({
    email : String,
    name: String,
    username: String,
    password: String,
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ],

});

export const User = mongoose.model("user", schema);