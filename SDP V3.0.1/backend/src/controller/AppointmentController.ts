import { NextFunction, Request, Response } from "express"
import AppointmentService from "../service/AppointmentService"

const getAppointmentsByDate =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {date}=req.params
        if(!date){
             res.status(400).json({message:"Date is required"});
             return;
        }
        const appointments=await AppointmentService.getAppointmentsByDate(date);
        res.status(200).json(appointments);
    } catch (error) {
        next(error)
    }
}

const createAppointment=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {date,startTime,endTime,user_id}=req.body
        if(!date || !startTime || !endTime || !user_id){
             res.status(400).json({message:"Date is required"});
             return;
        }
        const appointments=await AppointmentService.createAppointment({date,startTime,endTime,user_id});
        res.status(200).json(appointments);
    } catch (error) {
        next(error)
    }
}

const getAllAppointmentsByDate =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {date}=req.params
        if(!date){
             res.status(400).json({message:"Date is required"});
             return;
        }
        const appointments=await AppointmentService.getAllAppointmentsByDate(date);
        res.status(200).json(appointments);
    } catch (error) {
        next(error)
    }
}

const updateStatus=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id=Number(req.params.id)
        const status= req.body.status
        if(!id || !status){
             res.status(400).json({message:"Id and status are required"});
             return;
        }
        const appointments=await AppointmentService.updateStatus(id,status);
        res.status(200).json(appointments);
    } catch (error) {
        next(error)
    }
}

const getAppointmentById=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id=Number(req.params.id)
        if(!id){
             res.status(400).json({message:"Id is required"});
             return;
        }
        const appointments=await AppointmentService.getAppointmentById(id);
        res.status(200).json(appointments);
    } catch (error) {
        next(error)
    }
}

const getAppointmentByDate=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {date}=req.params
        if(!date){
             res.status(400).json({message:"Date is required"});
             return;
        }
        const appointments=await AppointmentService.getAppointmentByDate(date);
        res.status(200).json(appointments);
    } catch (error) {
        next(error)
    }
}

const makeAppointmentPayment=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {amount,appointment_id,note,paymentMethod,user_id}=req.body
        if(!amount || !appointment_id || !paymentMethod || !user_id){
             res.status(400).json({message:"Amount, appointment_id, paymentMethod and user_id are required"});
             return;
        }
        const appointments=await AppointmentService.makeAppointmentPayment({amount,appointment_id,note,paymentMethod,user_id});
        res.status(200).json(appointments);
    } catch (error) {
        next(error)
    }
}

const getPaymentById=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id=Number(req.params.id)
        if(!id){
             res.status(400).json({message:"Id is required"});
             return;
        }
        const appointments=await AppointmentService.getPaymentById(id);
        if(appointments &&appointments.length>0){
            res.status(409).json({message:"Payment already found"});
            return;
        }
        res.status(200).json(appointments);
    } catch (error) {
        next(error)
    }
}

const getAppointmentByUserId=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id=Number(req.params.id)
        if(!id){
             res.status(400).json({message:"Id is required"});
             return;
        }
        const appointments=await AppointmentService.getAppointmentByUserId(id);
        res.status(200).json(appointments);
    } catch (error) {
        next(error)
    }
}

const cancelAppointment=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id=Number(req.params.id)
        if(!id){
             res.status(400).json({message:"Id is required"});
             return;
        }
        const appointments=await AppointmentService.cancelAppointment(id);
        res.status(200).json(appointments);
    } catch (error) {
        next(error)
    }
}

const getTodayAppointmentsCount=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const count=await AppointmentService.getTodayAppointmentsCount();
        res.status(200).json(count);
    } catch (error) {
        next(error)
    }
}

const getUpcomingAppointmentsCount=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const count=await AppointmentService.getUpcomingAppointmentsCount();
        res.status(200).json(count);
    } catch (error) {
        next(error)
    }
}

const AppointmentController={
    getAppointmentsByDate,
    createAppointment,
    updateStatus,
    getAllAppointmentsByDate,
    getAppointmentById,
    getAppointmentByDate,
    makeAppointmentPayment,
    getPaymentById,
    getAppointmentByUserId,
    cancelAppointment,
    getTodayAppointmentsCount,
    getUpcomingAppointmentsCount
}

export default AppointmentController
