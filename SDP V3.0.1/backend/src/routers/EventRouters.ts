import { Router } from "express";
import EventController from "../controller/EventController";
const EventRouters = Router();

EventRouters.get("/today", EventController.getTotalEvents);
EventRouters.get("/upcoming", EventController.getUpcomingEvents);
EventRouters.get("/",EventController.getEvents );
EventRouters.get("/:id", EventController.getEventById);
EventRouters.post("/", EventController.createEvent);
EventRouters.put("/:id", EventController.updateEvent);
EventRouters.delete("/:id", EventController.deleteEvent);




export default EventRouters;
