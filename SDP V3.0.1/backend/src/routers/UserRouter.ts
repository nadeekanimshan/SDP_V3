import { Router } from "express";
import UserController from "../controller/UserController";

const UserRouter=Router()

UserRouter.get("/student/registerdThisMonth",UserController.getStudentInRegisterdThisMonth)
UserRouter.get("/types/all",UserController.getUserTypes)
UserRouter.get("/type/:type",UserController.getUserType)
UserRouter.get("/email/:email",UserController.getUserByEmail)
UserRouter.get("/",UserController.getAllUser)
UserRouter.get("/:id",UserController.getUserByid)
UserRouter.post("/",UserController.createUser)
UserRouter.put("/:id",UserController.updateUser)
UserRouter.delete("/:id/permanent",UserController.permanentDeleteUser)
UserRouter.delete("/:id",UserController.deleteUser)

export default UserRouter
