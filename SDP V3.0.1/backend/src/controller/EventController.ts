import { NextFunction, Request, Response } from "express"
import EventService from "../service/EventService"


const getEvents=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const events=await EventService.getEvents()
        res.status(200).json(events)
    } catch (error) {
        next(error)
    }
}


const getEventById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event = await EventService.getEventById(Number(req.params.id));
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  };
  
  const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newEvent = await EventService.createEvent(req.body);
      res.status(201).json(newEvent);
    } catch (error) {
      next(error);
    }
  };
  
  const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedEvent = await EventService.updateEvent(Number(req.params.id), req.body);
      if (!updatedEvent) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.status(200).json(updatedEvent);
    } catch (error) {
      next(error);
    }
  };
  
  const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await EventService.deleteEvent(Number(req.params.id));
      if (!deleted) {
         res.status(404).json({ message: "Event not found" });
         return;
      }
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  const getUpcomingEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await EventService.getUpcomingEvents();
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  };
  
  const getTotalEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const count = await EventService.getTotalEvents();
      res.status(200).json(count);
    } catch (error) {
      next(error);
    }
  };
  
  const EventController = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents,
    getTotalEvents,
  };

export default EventController
