import express from "express"
import { createAccount, LoginAccount } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/", createAccount)
userRouter.post("/login", LoginAccount)

export default userRouter