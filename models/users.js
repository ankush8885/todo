import mongoose, { model } from "mongoose";

const Schema = new mongoose.Schema({
    Name: {
        type: String,
    },
    Email: {
        type: String,
    },
    Password: {
        type: String, 
        select: false
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

export const User = model("User", Schema);
