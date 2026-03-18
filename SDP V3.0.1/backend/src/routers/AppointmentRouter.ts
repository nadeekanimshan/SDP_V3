import { Router } from "express";
import AppointmentController from "../controller/AppointmentController";

const AppointmentRouter=Router()

AppointmentRouter.get("/today",AppointmentController.getTodayAppointmentsCount)
AppointmentRouter.get("/upcoming",AppointmentController.getUpcomingAppointmentsCount)
AppointmentRouter.get("/:date",AppointmentController.getAppointmentsByDate)
AppointmentRouter.post("/",AppointmentController.createAppointment)
AppointmentRouter.get("/all/:date",AppointmentController.getAllAppointmentsByDate)
AppointmentRouter.put("/:id",AppointmentController.updateStatus)
AppointmentRouter.get("/detail/:id",AppointmentController.getAppointmentById)
AppointmentRouter.get("/date/:date",AppointmentController.getAppointmentByDate)
AppointmentRouter.post("/payment",AppointmentController.makeAppointmentPayment)
AppointmentRouter.get("/payment/:id",AppointmentController.getPaymentById)
AppointmentRouter.get("/user/:id",AppointmentController.getAppointmentByUserId)
AppointmentRouter.put("/cancel/:id",AppointmentController.cancelAppointment)


export default AppointmentRouter
