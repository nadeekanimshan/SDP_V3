import { NextFunction, Request, Response } from "express";
import z from "zod";

export const HttpError = class HttpError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}


const ErrorMiddlewares=( err:Error, req:Request, res:Response, next:NextFunction)=>{
    console.log(err);
    if(err instanceof z.ZodError){
        res.status(400).json({
            message:"Validation Error",
            errors:err.errors
        })
        return;
    }
    if (err instanceof HttpError) {
        res.status(err.statusCode).json({
            message:err.message,
            status:err.statusCode
        })
        return;
    }

    res.status(422).json({
        message:"Something went wrong"
    })
    
    return;
}

export default ErrorMiddlewares