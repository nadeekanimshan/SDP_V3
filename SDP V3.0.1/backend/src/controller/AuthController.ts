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

const refreshToken=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {refresh_token}=req.body
        if(!refresh_token){
            res.status(400).json({message:"Refresh token is required"})
            return;
        }
        const result=await AuthService.refreshToken(refresh_token)
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

const updateProfile=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const userId=req.user?.userId
        if(!userId){
            res.status(401).json({message:"Unauthorized"})
            return;
        }
        const {first_name,last_name,current_password,new_password}=req.body
        const result=await AuthService.updateProfile(Number(userId),{
            first_name,
            last_name,
            current_password,
            new_password
        })
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const forgotPassword=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email}=req.body
        if(!email){
            res.status(400).json({message:"Email is required"})
            return;
        }
        const result=await AuthService.forgotPassword(email)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const resetPassword=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {token,newPassword}=req.body
        if(!token || !newPassword){
            res.status(400).json({message:"Token and new password are required"})
            return;
        }
        if(newPassword.length < 6){
            res.status(400).json({message:"Password must be at least 6 characters"})
            return;
        }
        const result=await AuthService.resetPassword(token,newPassword)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const AuthController={
    login,
    register,
    refreshToken,
    getType,
    updateProfile,
    forgotPassword,
    resetPassword
}

export default AuthController
