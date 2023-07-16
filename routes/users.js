import express from "express";
import { Router } from "express";
import userRoutes from "../controllers/users.js";
import { IsAuthenticated } from "../middleware/auth.js";

const userRouter = Router()

userRouter.get("/login", userRoutes.Login);

userRouter.post("/register", userRoutes.Register);

userRouter.get("/logout", IsAuthenticated, userRoutes.Logout);

userRouter.get("/myprofile", IsAuthenticated, userRoutes.MyProfile);

export default userRouter;