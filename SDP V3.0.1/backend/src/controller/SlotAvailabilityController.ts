import { Request, Response, NextFunction } from "express";
import SlotAvailabilityService from "../service/SlotAvailabilityService";

const getByDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = req.params;
    if (!date) {
      res.status(400).json({ message: "date is required" });
      return;
    }
    const slots = await SlotAvailabilityService.getByDate(date);
    res.status(200).json(slots);
  } catch (error) {
    next(error);
  }
};

const updateForDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date, slots } = req.body as {
      date: string;
      slots: Array<{ slotTime: string; isAvailable: boolean }>;
    };
    if (!date || !Array.isArray(slots) || slots.length === 0) {
      res.status(400).json({ message: "date and slots array are required" });
      return;
    }
    const result = await SlotAvailabilityService.updateForDate(date, slots);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const clearOverride = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = req.params;
    if (!date) {
      res.status(400).json({ message: "date is required" });
      return;
    }
    await SlotAvailabilityService.clearOverride(date);
    const result = await SlotAvailabilityService.getByDate(date);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getForDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = req.params;
    if (!date) {
      res.status(400).json({ message: "date is required" });
      return;
    }
    const result = await SlotAvailabilityService.getForDate(date);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const SlotAvailabilityController = {
  getByDate,
  updateForDate,
  clearOverride,
  getForDate,
};

export default SlotAvailabilityController;
