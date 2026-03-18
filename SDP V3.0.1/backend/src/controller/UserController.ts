
import { NextFunction, Request, Response } from "express";
import UserService from "../service/UserService";
import UserValidator from "../validator/UserValidator";

type UserFilter={
    typeId?:number,
    deleteStatus?:boolean
}

const getUserType=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {type}=req.params
        if(!type){
             res.status(400).json({message:"Type is required"});
             return;
        }
        const userType=await UserService.getUserType(type);
        if(!userType){
            res.status(404).json([]);
            return;
        }
        res.status(200).json(userType);
    } catch (error) {
        next(error)
    }
}

const createUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const data=req.body
        console.log(data)
        if(!data){
             res.status(400).json({message:"Data is required"});
             return;
        }
        const userType=await UserService.createUser(data);
        if(!userType){
            res.status(404).json([]);
            return;
        }
        res.status(200).json(userType);
    } catch (error) {
        next(error)
    }
}

const getUserByid=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id}=req.params
        if(!id){
             res.status(400).json({message:"Id is required"});
             return;
        }
        const user=await UserService.getUserByid(Number(id));
        if(!user){
            res.status(404).json([]);
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

const getAllUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {typeId,deleteStatus}=req.query

        const status = deleteStatus=="true"?true:false

        console.log("typeId >       ",typeId)
        console.log("deleteStatus >       ",deleteStatus)

        const user=await UserService.getAllUser({typeId:typeId?Number(typeId):undefined,deleteStatus:status??undefined});
        if(!user){
            res.status(404).json([]);
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

const updateUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id=req.params.id
        const user=req.body

        if(!id){
             res.status(400).json({message:"Id is required"});
             return;
        }
        const updatedUser=await UserService.updateUser(Number(id),user);
        if(!updatedUser){
            res.status(404).json([]);
            return;
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error)
    }
}

const deleteUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id}=req.params
        if(!id){
             res.status(400).json({message:"Id is required"});
             return;
        }
        const user=await UserService.deleteUser(Number(id));
        if(!user){
            res.status(404).json([]);
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

const getUserByEmail=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email}=req.params
        if(!email){
             res.status(400).json({message:"Email is required"});
             return;
        }
        const user=await UserService.getUserByEmail(email);
        if(!user){
            res.status(404).json([]);
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

const getUserTypes=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const userTypes=await UserService.getUserTypes();
        if(!userTypes){
            res.status(404).json([]);
            return;
        }
        res.status(200).json(userTypes);
    } catch (error) {
        next(error)
    }
}

const getStudentInRegisterdThisMonth=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        
        const rawMonths = req.query["months[]"];

        const months = Array.isArray(rawMonths)
          ? rawMonths
          : typeof rawMonths === "string"
          ? [rawMonths]
          : [];

        const valitedMonth=UserValidator.MonthSchema.parse({months})
        const students=await UserService.getStudentInRegisteredMonths(valitedMonth.months);
        if(!students){
            res.status(404).json([]);
            return;
        }
        res.status(200).json(students);
    } catch (error) {
        next(error)
    }
}

const UserController={
    getUserType,
    createUser,
    getUserByid,
    getAllUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    getUserTypes,
    getStudentInRegisterdThisMonth
}

export default UserController
