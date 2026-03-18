import { Router } from "express";
import AuthController from "../controller/AuthController";

const AuthRouter=Router()

AuthRouter.post("/login",AuthController.login)
AuthRouter.post("/register",AuthController.register)
AuthRouter.get("/type",AuthController.getType)

export default AuthRouter
