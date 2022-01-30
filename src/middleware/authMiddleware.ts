import { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';

export const authMiddleware: RequestHandler = (req, res, next) => {

  try {
    //assign the token value which saved in cookie to token variable
    const token = req.cookies.token;

    if (token) {
      //decode the token to reach user and browser information which we save in controllers.
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err: jwt.VerifyErrors, decoded) {

        if (decoded.userID) {
          //Check if the user is coming from the same browser.
          if (decoded.browserInfo === req.headers['user-agent']) {
            next()
          } else {
            res.status(401).send({ error: true, message: "this request is on different browser!" })
            res.redirect('/login')
          }
        } else {
          if (decoded.isAdmin) res.redirect('/dashboard')
          else res.redirect('/home')
        }
      });

    } else res.redirect("/login");

  } catch (err) {
    const error = new Error(err);
    throw error;
  }

}