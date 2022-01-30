import { RequestHandler } from 'express';
import { body, check, validationResult } from 'express-validator';



//select inputs name and validate according to conditions for register form
export const registerValidator = [
    check('email')
        .trim()
        .isEmail().withMessage('Please insert a valid email address!'),

    check("firstName", 'First name is required.').trim().notEmpty(),
    check("lastName", "Last name is required").trim().notEmpty(),
    check("userName", "User name must be at least 3 characters long.").notEmpty().isLength({ min: 3 }),
    check("password", "Password must be at least 5 characters long.").notEmpty().isLength({ min: 5 }),

    check('repassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords dont match!!')
            }
            return true;
        })
]

//assign  validations these are determinening above to errors variable and save to res.locals as an array and then render register page
export const checkRegister: RequestHandler = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.locals.errors = errors.array();        
        res.render("register", { errors: errors.array(), layout: "./layout/auth_layout.ejs", })

    } else next();

};

//select inputs name and validate according to conditions for login forms
export const loginValidator = [
    check("userName", 'User Name is required.').trim().notEmpty(),
    check("password", "Password is required").trim().notEmpty(),   
]

//assign  validations these are determinening above to errors variable and save to res.locals as an array and then render login page
export const checkLogin: RequestHandler = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.locals.errors = errors.array();
     
        res.render("login", { errors: errors.array(), layout: "./layout/auth_layout.ejs", })

    } else next();

};






