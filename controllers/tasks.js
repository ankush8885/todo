import ErrorHandler from "../middleware/errorhandler.js";
import { Task } from "../models/tasks.js";

let tasks = {};

tasks.NewTask = async function (req, res) {
    try {
        const { Title, Description } = req.body;
        await Task.create({ Title, Description, "User": req.user });
        res.json({ statusCode: 201, message: "Task Saved Successfully." });
    } catch (error) {
        console.log(error);
    }
}

tasks.AllTask = async function (req, res) {
    try {
        let allData = await Task.find({ User: req.user._id });
        res.json({ statusCode: 201, data: allData });
    } catch (error) {
        console.log(error);
    }
};

tasks.UpdateTask = async function (req, res) {
    try {
        let data = await Task.findById({ _id: req.params.id });
        data.IsCompleted = !data.IsCompleted;
        await data.save()
        res.json({ statusCode: 201, message: "Saved Successfully." });
    } catch (error) {
        console.log(error);
    }
};

tasks.DeleteTask = async function (req, res, next) {
    try {
        let data = await Task.findById({ _id: req.params.id });
        if (!data) {
            return next(new ErrorHandler("This task is already deleted.",404));
        }
        await data.deleteOne()
        res.json({ statusCode: 201, message: "Task Delete Successfully." });
    } catch (error) {
        console.log(error);
    }
}

export default tasks;