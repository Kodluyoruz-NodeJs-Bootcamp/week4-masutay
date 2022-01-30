import { Router } from "express";

import authRouter from "./auth_routers";
import pageRouter from "./page_router";

// It is directed according to whether the incoming request is type of post or get.
const routes = Router();

routes.use("/",authRouter);
routes.use("/",pageRouter);

export default routes;