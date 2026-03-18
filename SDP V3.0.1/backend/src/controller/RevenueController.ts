import { NextFunction, Request, Response } from "express";
import RevenueService from "../service/RevenueSrvice";

const getTodayRevenue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const revenue = await RevenueService.getTodayRevenue();
      res.status(200).json(revenue);
    } catch (error) {
      next(error);
    }
  };
  
  const getMonthlyRevenue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const revenue = await RevenueService.getMonthlyRevenue();
      res.status(200).json(revenue);
    } catch (error) {
      next(error);
    }
  };

  const RevenueController={
    getTodayRevenue,
    getMonthlyRevenue
  }
  
  export default RevenueController