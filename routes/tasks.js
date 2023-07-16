import express from "express";
import { Router } from "express";
import { IsAuthenticated } from "../middleware/auth.js";
import tasks from "../controllers/tasks.js";

const taskRouter = Router();

taskRouter.post('/newtask', IsAuthenticated, tasks.NewTask);
taskRouter.get('/alltask', IsAuthenticated, tasks.AllTask);
taskRouter.route('/task/:id').put(IsAuthenticated, tasks.UpdateTask).delete(IsAuthenticated, tasks.DeleteTask);

export default taskRouter;