import * as express from "express";

import {allUser, showHomeForm, showLoginForm, showRegisterForm  } from "../controllers/pageController";
import { authMiddleware } from "../middleware/authMiddleware";


// all get request 
const router = express.Router();

router.get("/", (req, res) => {
    res.redirect('/login')
})

router.get("/register", showRegisterForm);
router.get("/login", showLoginForm);
router.get("/home",authMiddleware,showHomeForm);
router.get("/dashboard",authMiddleware, allUser);


const pageRouter = router;
export default pageRouter;

