import { prisma } from "../../config/database/prisma";

// All possible 30-min slots from 08:00 to 17:30 (last slot 17:30-18:00 = work until 6 PM)
export const ALL_SLOT_TIMES = [
  "08.00", "08.30", "09.00", "09.30", "10.00", "10.30",
  "11.00", "11.30", "12.00", "12.30", "13.00", "13.30",
  "14.00", "14.30", "15.00", "15.30", "16.00", "16.30", "17.00", "17.30",
];

// Default: Mon(1)-Fri(5) = open, Sat(6) & Sun(0) = closed
const getDefaultForDayOfWeek = (dayOfWeek: number) => {
  const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
  return isWeekday ? [...ALL_SLOT_TIMES] : [];
};

// Get slots for a specific date - returns rows + hasOverride flag
const getByDate = async (date: string): Promise<{ slots: { slotTime: string; isAvailable: boolean }[]; hasOverride: boolean }> => {
  const rows = await prisma.slotAvailability.findMany({
    where: { date },
    orderBy: { slotTime: "asc" },
  });
  const d = new Date(date + "T12:00:00");
  const dayOfWeek = d.getDay();
  const defaultSlots = getDefaultForDayOfWeek(dayOfWeek);
  if (rows.length === 0) {
    return {
      slots: defaultSlots.map((t) => ({ slotTime: t, isAvailable: true })),
      hasOverride: false,
    };
  }
  const slots = ALL_SLOT_TIMES.map((t) => {
    const row = rows.find((r) => r.slotTime === t);
    return { slotTime: t, isAvailable: row ? row.isAvailable : false };
  });
  return { slots, hasOverride: true };
};

type SlotInput = {
  date: string;
  slotTime: string;
  isAvailable: boolean;
};

const updateForDate = async (date: string, slots: { slotTime: string; isAvailable: boolean }[]) => {
  await prisma.$transaction(
    slots.map((s) =>
      prisma.slotAvailability.upsert({
        where: {
          date_slotTime: { date, slotTime: s.slotTime },
        },
        create: {
          date,
          slotTime: s.slotTime,
          isAvailable: s.isAvailable,
        },
        update: { isAvailable: s.isAvailable },
      })
    )
  );
  return getByDate(date);
};

const clearOverride = async (date: string) => {
  await prisma.slotAvailability.deleteMany({ where: { date } });
};

// Returns list of available slot times for a given date (for booking page)
const getForDate = async (date: string): Promise<{ availableSlotTimes: string[]; isDayAvailable: boolean }> => {
  // Check if admin has overridden this date (any rows exist)
  const allRows = await prisma.slotAvailability.findMany({
    where: { date },
    orderBy: { slotTime: "asc" },
  });
  if (allRows.length > 0) {
    // Admin override: use row data; for slots not in override (e.g. newly added 17:00, 17:30), treat as available
    const availableSlots = ALL_SLOT_TIMES.filter((t) => {
      const row = allRows.find((r) => r.slotTime === t);
      return row ? row.isAvailable : true; // missing row = available (backward compat)
    });
    return {
      availableSlotTimes: availableSlots,
      isDayAvailable: availableSlots.length > 0,
    };
  }
  // No override: use default (weekdays 8-5:30, weekends closed)
  const d = new Date(date + "T12:00:00");
  const defaultSlots = getDefaultForDayOfWeek(d.getDay());
  return {
    availableSlotTimes: defaultSlots,
    isDayAvailable: defaultSlots.length > 0,
  };
};

const SlotAvailabilityService = {
  getByDate,
  updateForDate,
  clearOverride,
  getForDate,
  ALL_SLOT_TIMES,
};

export default SlotAvailabilityService;
