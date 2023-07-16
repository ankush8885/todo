import mongoose, { model } from "mongoose";

const TaskSchema =  new mongoose.Schema({
    Title: {
        type: String,
        IsRequired: true
    },
    Description: {
        type: String,
        IsRequired: true
    },
    IsCompleted: {
        type: Boolean,
        default: false
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

export const Task = model("Task",TaskSchema);