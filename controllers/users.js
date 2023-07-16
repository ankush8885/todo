import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/users.js";
import ErrorHandler from "../middleware/errorhandler.js";

const users = {}

users.Login = async function (req, res, next) {
    try {
        let user = await User.findOne({ "Email": req.body.Email }).select('+Password');

        if (user?.Password) {
            //comparing password so that we can know user provided correct password
            const password = await bcrypt.compare(req.body.Password, user.Password);
            if (password) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

                //setting cookie so that we can know user is login
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 15 * 60 * 1000,
                    sameSite: process.env.NODE_ENV == "dev" ? "lax" : "none",
                    secure: process.env.NODE_ENV == "dev" ? false : true
                }).json({ statusCode: 200, message: "Login Successfully." });

            } else {
                return next(new ErrorHandler("Email or Password is Incorrect.", 400));
            }

        } else {
            return next(new ErrorHandler("Email or Password is Incorrect.", 400));
        }

    } catch (error) {
        console.log(error);
    }

}

users.Register = async function (req, res, next) {
    try {
        let alreadyExist = await User.find({ "Email": req.body.Email });
        if (alreadyExist.length) {
            return next(new ErrorHandler("Email is Already Exist", 403));
        }

        const password = await bcrypt.hash(req.body.Password, 10);

        let user = await User.create({ "Name": req.body.Name, "Email": req.body.Email, "Password": password });

        res.json({ statusCode: 200, message: "Register Successfully." });

    } catch (error) {
        console.log(error);
    }
}

users.Logout = async function (req, res, next) {
    //delete cookie to logout user
    res.cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV == "dev" ? "lax" : "none",
        secure: process.env.NODE_ENV == "dev" ? false : true
    }).json({ statusCode: 200, message: "Logout Successfully." });
}

users.MyProfile = async function (req, res, next) {
    res.json({ statusCode: 200, data: req.user });
}

export default users;