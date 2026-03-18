import { NextFunction, Request, Response } from "express"
import AuthService from "../service/AuthService";


const login=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            res.status(400).json({message:"Email and password are required"})
            return;
        }
        const result=await AuthService.login(email,password)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const register=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email,password,first_name,last_name,contact_number,address,city,district,type_id}=req.body
        
        if(!email || !password || !first_name || !last_name || !contact_number || !address || !city || !district || !type_id){
            res.status(400).json({message:"All fields are required"})
            return;
        }
        const result=await AuthService.register({email,password,first_name,last_name,contact_number,address,city,district,type_id})
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const getType=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const type=req.query.type as string
        if(!type){
            res.status(400).json({message:"Type is required"})
            return;
        }
        const result=await AuthService.getType(type)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}



const AuthController={
    login,
    register,
    getType
}

export default AuthController
