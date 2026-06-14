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
  
// Reusable date/time validation helper
const validateEventDateTime = (startDate: string, time: string | undefined): string | null => {
  const now = new Date();

  // Today as local YYYY-MM-DD string
  const todayStr = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0');

  const selectedDateStr = new Date(startDate).toISOString().slice(0, 10);

  if (selectedDateStr < todayStr) {
    return "Cannot create event with a past date.";
  }

  if (selectedDateStr === todayStr && time) {
    // time is stored as "1970-01-01T{HH:MM}:00.000Z" — extract HH:MM from UTC
    const timeStr = time.includes('T') ? time.slice(11, 16) : time;
    const [hours, minutes] = timeStr.split(':').map(Number);
    const selectedMinutes = hours * 60 + minutes;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    if (selectedMinutes <= nowMinutes) {
      return "Cannot create event with a past or current time for today.";
    }
  }

  return null;
};

  const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, time } = req.body;

      if (startDate) {
        const error = validateEventDateTime(startDate, time);
        if (error) {
          res.status(400).json({ message: error });
          return;
        }
      }

      const newEvent = await EventService.createEvent(req.body);
      res.status(201).json(newEvent);
    } catch (error) {
      next(error);
    }
  };
  
  const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, time } = req.body;

      if (startDate) {
        const error = validateEventDateTime(startDate, time);
        if (error) {
          res.status(400).json({ message: error });
          return;
        }
      }

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
