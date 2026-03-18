import { NextFunction, Request, Response } from "express"
import ClassService from "../service/ClassService"
import ClassValidator from "../validator/ClassValidator";

type Class_Registration={
  class_id: number;
  user_id: number;
  installments :{
    amount: number;
    status?: string;
    paymentDate?: string;
    paymentMethod?: string;
    installments_Due_Date: Date;
  }[]
}

const getClasses=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const classes=await ClassService.getClasses()
        res.status(200).json(classes)
    } catch (error) {
        next(error)
    }
}


const getClassById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const foundClass = await ClassService.getClassById(Number(req.params.id));
      if (!foundClass) {
         res.status(404).json({ message: "Class not found" });
         return;
      }
      res.status(200).json(foundClass);
    } catch (error) {
      next(error);
    }
  };
  
  const createClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newClass = await ClassService.createClass(req.body);
      res.status(201).json(newClass);
    } catch (error) {
      next(error);
    }
  };
  
  const updateClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await ClassService.updateClass(Number(req.params.id), req.body);
      if (!updated) {
         res.status(404).json({ message: "Class not found" });
         return;
      }
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };
  
  const deleteClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await ClassService.deleteClass(Number(req.params.id));
      if (!deleted) {
         res.status(404).json({ message: "Class not found" });
         return;
      }
      res.status(200).json({ message: "Class deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  const registerClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body
      const validatedData = ClassValidator.ClassRegistrationSchema.parse(req.body);
  
      // Call service with validated data
      const newClass = await ClassService.registerClass(validatedData);
  
      res.status(201).json(newClass);
    } catch (error) {
      next(error);
    }
  };
  
  const getClassByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id=req.params.id

      if(!id){
        res.status(400).json({ message: "Id is required" });
        return;
      }
      const foundClass = await ClassService.getClassByUserId(Number(id));
      if (!foundClass) {
         res.status(404).json({ message: "Class not found" });
         return;
      }
      res.status(200).json(foundClass);
    } catch (error) {
      next(error);
    }
  };

  const payInstallments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = ClassValidator.ClassInstallmentSchema.parse(req.body);
  
      // Call service with validated data
      const newClass = await ClassService.payInstallments(validatedData);
  
      res.status(201).json(newClass);
    } catch (error) {
      next(error);
    }
  };
  
  const getAllRegisteredClasses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {user_id,class_id}=req.params

      if(!user_id || !class_id){
        res.status(400).json({ message: "Id is required" });
        return;
      }
      const foundClass = await ClassService.getAllRegisteredClasses(Number(user_id),Number(class_id));
      if (!foundClass) {
         res.status(404).json({ message: "Class not found" });
         return;
      }
      if(foundClass.length>0){
        res.status(409).json({ message: "Class already registered" });
        return;
      }
      res.status(200).json({message:"You Can register for the class"});
    } catch (error) {
      next(error);
    }
  };

  const getClassStartDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id=req.params.id

      if(!id){
        res.status(400).json({ message: "Id is required" });
        return;
      }
      const foundClass = await ClassService.getClassStartDate(Number(id));
      if (!foundClass) {
         res.status(404).json({ message: "Class not found" });
         return;
      }
      res.status(200).json(foundClass);
    } catch (error) {
      next(error);
    }
  };

  const getPaymentInstallments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {status,date}=req.params

      if(status !== "All" && status !== "Done" && status !== "Missing" || !date){
        res.status(400).json({ message: "Id is required" });
        return;
      }
      const foundClass = await ClassService.getPaymentInstallments(status,new Date(date));
      if (!foundClass) {
         res.status(404).json({ message: "Class not found" });
         return;
      }
      res.status(200).json(foundClass);
    } catch (error) {
      next(error);
    }
  };

  const getTodayClassesCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const count = await ClassService.getTodayClassesCount();
      res.status(200).json(count);
    } catch (error) {
      next(error);
    }
  };
const ClassController={
    getClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass,
    registerClass,
    getClassByUserId,
    payInstallments,
    getAllRegisteredClasses,
    getClassStartDate,
    getPaymentInstallments,
    getTodayClassesCount
}

export default ClassController
