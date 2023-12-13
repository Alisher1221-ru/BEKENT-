import { Router } from "express";
import { createUser } from "../controller/user.controller.js";

const uzumServers = Router()

uzumServers.post('/users', createUser)

export default uzumServers