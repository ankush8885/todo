import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import { DataBaseConnect } from './database/db.js'
import userRouter from "./routes/users.js"
import taskRouter from "./routes/tasks.js";
import { ErrorMiddleware } from "./middleware/errorhandler.js";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(taskRouter);
app.use(cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: [process.env.FRONTEND_URI]
}));
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} on env ${process.env.NODE_ENV}`)
    DataBaseConnect();
})

app.use(ErrorMiddleware);