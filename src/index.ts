import { config } from "dotenv";
import * as express from "express";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import * as expresLayout from "express-ejs-layouts";
import * as path from "path";
import { createConnection, getConnection } from "typeorm";
import { TypeormStore } from "typeorm-store";
import { Session } from "./models/entity/Session";
import routes from "./routes/index.router";
import { errorHandler } from "./middleware/errorHandler";

createConnection()
    .then(async (connection) => {

        // create tables with migration.
        //  await connection.runMigrations();
        const app = express();
        const PORT = process.env.PORT;
        config();
        //template engine 
        app.use(expresLayout);
        app.use(express.static("public"));
        app.set("view engine", "ejs");
        app.set("views", path.resolve(__dirname, "./views"));

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());


        //assign the variable that is repository and gets repository for the Session entity.
        const repository = getConnection().getRepository(Session);

        //create express session
        app.use(
            session({
                secret: process.env.SESSION_SECRET,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    maxAge: 60000,
                },
                store: new TypeormStore({ repository }), // save session to database
            })
        );

        app.use(errorHandler)


        //to call routers this line run and goes to router which called 
        app.use(routes);

        //run server port 3000      
        app.listen(PORT, () => {
            console.log(`server listenin on port ${PORT}`);
        });
    })
    .catch((error) => {
        error = new Error(error)
        throw error;
    });


