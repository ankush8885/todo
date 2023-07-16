import jwt from "jsonwebtoken";
import { User } from "../models/users.js";


export const IsAuthenticated = async function (req, res, next) {
    const { token } = req.cookies;

    if (!token) {
       return res.json({ statusCode: 403, message: "Login First." });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById({ "_id": decode._id });
    next()
}