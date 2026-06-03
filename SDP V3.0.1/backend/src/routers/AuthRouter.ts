import { Router } from "express";
import AuthController from "../controller/AuthController";

const AuthRouter=Router()

AuthRouter.post("/login",AuthController.login)
AuthRouter.post("/register",AuthController.register)
AuthRouter.post("/refresh-token",AuthController.refreshToken)
AuthRouter.get("/type",AuthController.getType)
AuthRouter.put("/profile",AuthController.updateProfile)
AuthRouter.post("/forgot-password",AuthController.forgotPassword)
AuthRouter.post("/reset-password",AuthController.resetPassword)

export default AuthRouter
