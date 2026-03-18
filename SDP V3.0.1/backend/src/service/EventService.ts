
import { date } from "zod";
import {prisma} from "../../config/database/prisma";
import { Event } from "../../config/database/prisma/generated/prisma/client";
import { format } from "date-fns";
/**
 * Retrieves a list of events that are scheduled to start in the future.
 * @returns A Promise that resolves to an array of Event objects.
 */
const getEvents = async ():Promise<Event[]> => {
    const now = new Date(); // Current date and time
  
    const events = await prisma.event.findMany({
      where: {
        startDate: {
          gte: new Date(format(now, "yyyy-MM-dd")), // Greater than or equal to current time

        },
      },
      orderBy: {
        startDate: "desc", // Optional: sort by start date ascending
      },
    });
  
    return events;
  };
  


/**
 * Retrieves a single event by its ID.
 * @param id - The ID of the event to retrieve.
 */
const getEventById = async (id: number): Promise<Event | null> => {
  return prisma.event.findUnique({
    where: { id },
  });
};

/**
 * Creates a new event.
 * @param data - The event data to create.
 */
const createEvent = async (data: Partial<Event>): Promise<Event> => {
  return prisma.event.create({
    data: {
      title: data.title!,
      description: data.description,
      startDate: new Date(data.startDate!),
      endDate: data.endDate ? new Date(data.endDate) : null,
      location: data.location,
      time: data.time ? new Date(data.time) : null,
      note: data.note,
    },
  });
};

/**
 * Updates an existing event by ID.
 * @param id - The ID of the event to update.
 * @param data - The updated event data.
 */
const updateEvent = async (
  id: number,
  data: Partial<Event>
): Promise<Event | null> => {
  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) return null;

  return prisma.event.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      location: data.location,
      time: data.time ? new Date(data.time) : undefined,
      note: data.note,
    },
  });
};

/**
 * Deletes an event by ID.
 * @param id - The ID of the event to delete.
 */
const deleteEvent = async (id: number): Promise<boolean> => {
  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) return false;

  await prisma.event.delete({
    where: { id },
  });
  return true;
};

const getUpcomingEvents = async ():Promise<number> => {
    const now = new Date(); 
  
    const events = await prisma.event.findMany({
      where: {
        startDate: {
          gte: new Date(format(now, "yyyy-MM-dd")), 
        },
      },
      orderBy: {
        startDate: "asc", 
      }
    });
  
    return events.length;
  };

  const getTotalEvents = async (): Promise<number> => {
    const count = await prisma.event.count({
      where: {
        startDate: {
          equals: new Date(format(new Date(), "yyyy-MM-dd")),
        },
      },
    });
    return count;
  };

const EventService = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getUpcomingEvents,
  getTotalEvents,
};

export default EventService
