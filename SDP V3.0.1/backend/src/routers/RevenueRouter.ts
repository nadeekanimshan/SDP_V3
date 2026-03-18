import { Router } from "express";
import RevenueController from "../controller/RevenueController";

const RevenueRouter=Router()

RevenueRouter.get("/today",RevenueController.getTodayRevenue);
RevenueRouter.get("/monthly",RevenueController.getMonthlyRevenue);

export default RevenueRouter
