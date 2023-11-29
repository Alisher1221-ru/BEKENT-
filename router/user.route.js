import { Router } from "express";
import { createUser, deleteUser, getUser, updateUser } from "../controller/user.controller.js";

let userRoute = Router()

userRoute.post('/', createUser)
userRoute.get('/', getUser)
userRoute.delete('/:id', deleteUser)
userRoute.patch('/:id', updateUser)

export default userRoute