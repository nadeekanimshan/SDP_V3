import { Router } from "express";
import AttendanceController from "../controller/AttendanceController";

const AttendanceRouter=Router()

AttendanceRouter.get("/:date",AttendanceController.getAttendanceByDate)
AttendanceRouter.post("/",AttendanceController.createAttendance)
AttendanceRouter.post("/time-out",AttendanceController.updateTimeOutAttendance)

export default AttendanceRouter

