import { useEffect, useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { UseAxios } from "../../hook/useAxios";
import { toast } from "react-toastify";

const ALL_SLOT_TIMES = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

const toBackendTime = (t: string) => t.replace(":", ".");
const toDisplayTime = (t: string) => t.replace(".", ":");

type SlotRow = {
  id?: number;
  date: string;
  slotTime: string;
  isAvailable: boolean;
};

// Saturday (6) & Sunday (0) disabled, past dates disabled
const isWeekend = (date: Date) => {
  const d = date.getDay();
  return d === 0 || d === 6;
};
const isPastDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export default function SlotAvailability() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [slots, setSlots] = useState<SlotRow[]>([]);
  const [hasOverride, setHasOverride] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSlotsForDate = async (date: Date) => {
    setIsLoading(true);
    try {
      const res = await UseAxios(`slots/date/${format(date, "yyyy-MM-dd")}`, "GET");
      const data = res?.data ?? res;
      const arr = data?.slots ?? [];
      setHasOverride(data?.hasOverride ?? false);
      setSlots(
        arr.map((s: { slotTime: string; isAvailable: boolean }) => ({
          ...s,
          slotTime: toDisplayTime(s.slotTime),
          date: format(date, "yyyy-MM-dd"),
        }))
      );
    } catch (err) {
      console.error("Failed to fetch slots:", err);
      setSlots([]);
      setHasOverride(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchSlotsForDate(selectedDate);
    } else {
      setSlots([]);
    }
  }, [selectedDate]);

  const slotMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    for (const t of ALL_SLOT_TIMES) map[t] = false;
    for (const s of slots) {
      const time = toDisplayTime(s.slotTime);
      if (ALL_SLOT_TIMES.includes(time)) map[time] = s.isAvailable;
    }
    return map;
  }, [slots]);

  const updateSlot = (slotTime: string, isAvailable: boolean) => {
    setSlots((prev) => {
      const existing = prev.find((s) => toDisplayTime(s.slotTime) === slotTime);
      if (existing) {
        return prev.map((s) =>
          toDisplayTime(s.slotTime) === slotTime ? { ...s, isAvailable } : s
        );
      }
      return [...prev, { date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "", slotTime: toBackendTime(slotTime), isAvailable }];
    });
  };

  const setWholeDay = (isAvailable: boolean) => {
    setSlots(
      ALL_SLOT_TIMES.map((t) => ({
        date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
        slotTime: toBackendTime(t),
        isAvailable,
      }))
    );
  };

  const handleSave = async () => {
    if (!selectedDate) {
      toast.error("Please select a date first");
      return;
    }
    setIsSaving(true);
    try {
      const payload = ALL_SLOT_TIMES.map((t) => ({
        slotTime: toBackendTime(t),
        isAvailable: slotMap[t] ?? false,
      }));
      await UseAxios("slots", "PUT", {
        date: format(selectedDate, "yyyy-MM-dd"),
        slots: payload,
      });
      toast.success("Slots saved");
      fetchSlotsForDate(selectedDate);
    } catch (err) {
      console.error("Failed to save:", err);
      toast.error("Failed to save slots");
    } finally {
      setIsSaving(false);
    }
  };

  const openCount = ALL_SLOT_TIMES.filter((t) => slotMap[t]).length;

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Slot Availability</h1>
          <p className="text-slate-400 mt-1">
            Default: Mon–Fri open, Sat & Sun closed. Override specific dates when needed.
          </p>
        </div>

        <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
          <div className="p-4 flex flex-col md:flex-row gap-6">
            {/* Calendar */}
            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
              <h3 className="text-white font-semibold mb-3">Pick a date to override</h3>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => isPastDate(date) || isWeekend(date)}
                className="text-white [&_.rdp-day_disabled]:opacity-40 [&_.rdp-day_disabled]:cursor-not-allowed"
              />
            </div>

            {/* Slots for selected date */}
            <div className="flex-1">
              {selectedDate ? (
                  <div className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {format(selectedDate, "EEEE, MMM d, yyyy")}
                        </h3>
                        {!hasOverride && (
                          <p className="text-xs text-amber-400 mt-0.5">Using default</p>
                        )}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => setWholeDay(true)}
                          className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                        >
                          Whole day open
                        </button>
                        <button
                          onClick={() => setWholeDay(false)}
                          className="px-4 py-2 rounded-lg text-sm font-medium bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30"
                        >
                          Whole day closed
                        </button>
                        {hasOverride && (
                          <button
                            onClick={async () => {
                              if (!selectedDate) return;
                              try {
                                await UseAxios(`slots/date/${format(selectedDate, "yyyy-MM-dd")}`, "DELETE");
                                toast.success("Reset to default");
                                fetchSlotsForDate(selectedDate);
                              } catch {
                                toast.error("Failed to reset");
                              }
                            }}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-500/20 text-slate-300 border border-slate-500/40 hover:bg-slate-500/30"
                          >
                            Reset to default
                          </button>
                        )}
                      </div>
                    </div>
                    {isLoading ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-slate-400 mb-3">
                          {openCount} of {ALL_SLOT_TIMES.length} slots open
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {ALL_SLOT_TIMES.map((slotTime) => (
                            <label
                              key={slotTime}
                              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer border transition-colors ${
                                slotMap[slotTime]
                                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                                  : "bg-slate-700/50 border-slate-600 text-slate-400"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={slotMap[slotTime] ?? false}
                                onChange={(e) => updateSlot(slotTime, e.target.checked)}
                                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
                              />
                              <span>{slotTime}</span>
                            </label>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-700/30 border border-slate-600/50 text-center text-slate-400">
                  Select a date from the calendar to manage slots.
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-slate-700/50 flex justify-end">
            <button
              onClick={handleSave}
              disabled={!selectedDate || isLoading || isSaving}
              className="px-6 py-2 rounded-lg font-medium bg-amber-500 text-slate-900 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
