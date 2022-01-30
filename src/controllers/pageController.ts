import { RequestHandler } from 'express';
import { User } from '../models/entity/User';
import * as  jwt from "jsonwebtoken";

// show login page 
export const showLoginForm: RequestHandler = (req, res) => {

    res.render("login", { layout: "./layout/auth_layout.ejs" })
}

// show register page 
export const showRegisterForm: RequestHandler = (req, res, next) => {

    res.render("register", { layout: "./layout/auth_layout.ejs" })
}

// show home page 
export const showHomeForm: RequestHandler = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (token) {
            //decode the token to reach user and browser information which we save in controllers.
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: jwt.VerifyErrors, decoded) => {
                const user_id = decoded.userID
                const user = await User.findOne(user_id)
                console.log(user)
                res.render("home", { user: user, layout: "./layout/auth_layout.ejs" })
            })
        }
    } catch (err) {
        const error = new Error(err);
        throw error;
    }

}

//get users from Database
export const allUser: RequestHandler = async (req, res) => {
    try {
        // select all users from DB
        const users = await User.find()
        res.render("index", { users: users, layout: "./layout/dataTable_layout.ejs" })
    } catch (err) {
        const error = new Error(err);
        throw error;
    }

}
