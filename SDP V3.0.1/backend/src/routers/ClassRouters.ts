import { Router } from "express";
import ClassController from "../controller/ClassController";

const ClassRouters=Router()

ClassRouters.get("/today", ClassController.getTodayClassesCount);
ClassRouters.get("/installment/all/:status/:date", ClassController.getPaymentInstallments);
ClassRouters.get("/",ClassController.getClasses);
ClassRouters.post("/", ClassController.createClass);
ClassRouters.put("/:id", ClassController.updateClass);
ClassRouters.delete("/:id", ClassController.deleteClass);
ClassRouters.post("/register", ClassController.registerClass);
ClassRouters.get("/user/:id", ClassController.getClassByUserId);
ClassRouters.post("/installment", ClassController.payInstallments);
ClassRouters.get("/user/:user_id/class/:class_id", ClassController.getAllRegisteredClasses);
ClassRouters.get("/start-date/:id", ClassController.getClassStartDate);
ClassRouters.get("/:id", ClassController.getClassById);

export default ClassRouters
