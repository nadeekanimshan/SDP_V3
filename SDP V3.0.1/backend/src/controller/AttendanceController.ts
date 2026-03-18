import { NextFunction, Request, Response } from "express";
import AttendanceService from "../service/AttendanceService";


const getAttendanceByDate=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {date}=req.params
        if(!date){
             res.status(400).json({message:"Date is required"});
             return;
        }
        const attendance=await AttendanceService.getAttendanceByDate(date);
        if(!attendance){
            res.status(404).json([]);
            return;
        }
        res.status(200).json(attendance);
    } catch (error) {
        next(error)
    }
}

const createAttendance=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {date,user_id}=req.body
        if(!date || !user_id){
             res.status(400).json({message:"Date and user_id are required"});
             return;
        }
        // check if the user is already present
        const isPresent=await AttendanceService.getAttendanceByUserIdAndDate(date,user_id);
        if(isPresent){
            res.status(409).json({message:"User is already present"});
            return;
        }
        const attendance=await AttendanceService.createAttendance(date,user_id);
        if(!attendance){
            res.status(404).json([]);
            return;
        }
        res.status(200).json(attendance);
    } catch (error) {
        next(error)
    }
}

const updateTimeOutAttendance=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {date,user_id}=req.body
        if(!date || !user_id){
             res.status(400).json({message:"Date and user_id are required"});
             return;
        }
        const isPresent=await AttendanceService.getAttendanceByUserIdAndDate(date,user_id);
        if(!isPresent){
            res.status(404).json({message:"User is not present"});
            return;
        }
        console.log(isPresent)
        const attendance=await AttendanceService.updateTimeOutAttendance(isPresent.id);
        if(!attendance){
            res.status(404).json([]);
            return;
        }
        res.status(200).json(attendance);
    } catch (error) {
        next(error)
    }
}


const AttendanceController={
    getAttendanceByDate,
    createAttendance,
    updateTimeOutAttendance
}

export default AttendanceController
