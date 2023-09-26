import mongoose from "mongoose";

const userProfile = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },

    fullName: String,
    bio: String,
    profilePicture: String,
});


export const UserProfile = mongoose.model("UserProfile", userProfile);