import { Router } from "express";
import SlotAvailabilityController from "../controller/SlotAvailabilityController";
import { authorize } from "../middlewares/auth.middleware";

const SlotAvailabilityRouter = Router();

SlotAvailabilityRouter.get("/date/:date", SlotAvailabilityController.getByDate);
SlotAvailabilityRouter.get("/available/:date", SlotAvailabilityController.getForDate);
SlotAvailabilityRouter.put("/", authorize("ADMIN"), SlotAvailabilityController.updateForDate);
SlotAvailabilityRouter.delete("/date/:date", authorize("ADMIN"), SlotAvailabilityController.clearOverride);

export default SlotAvailabilityRouter;
