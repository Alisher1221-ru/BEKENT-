import { Router } from "express";
import {
    login,
    refresh,
    signin,
    logout,
} from "../controller/auth.controller.js";
import authGard from "../middleware/patrulUsers.js";
import userGuard from "../middleware/role.guard.js";

let authRoute = Router();

authRoute.post("/login", login);
authRoute.post("/signin", signin);
authRoute.post("/refresh", refresh);
authRoute.post("/logout", authGard, logout);
 
export default authRoute;
