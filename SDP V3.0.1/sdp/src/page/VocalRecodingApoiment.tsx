import { useEffect, useState, useCallback } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, parse } from "date-fns";
import { AppLayout } from "../components/layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SYSTEM_KEY } from "../config/Constent";
import { UseAxios } from "../hook/useAxios";

type AppointmentSlot = {
  date: string; // yyyy-MM-dd
  bookedTimes: [string, string][]; // Example: [["08.00", "08.30"]]
};

const APPOINTMENT_TYPES = ["Vocal Recording", "Instrument Recording", "Song Discussion & Consultation"] as const;

type AppointmentItem = {
  id: number;
  appointment_id: number;
  time_in: string;
  time_out: string;
  appointmentType?: string;
  note: string | null;
  user_id: number;
  status: string;
  cancelRequested?: boolean;
  cancelReason?: string | null;
  rejectReason?: string | null;
  appointment: { id: number; date: string; status: string; note: string | null };
  user: unknown;
};

const DEFAULT_TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

// Convert backend slot times (e.g. "08.00") to frontend format ("08:00")
const toFrontendSlots = (slots: string[]) =>
  (slots ?? []).map((t) => t.replace(".", ":"));

const MIN_DURATION_MINUTES = 30;
const APPOINTMENTS_POLL_INTERVAL_MS = 30000;

// Helper functions to convert between time formats
const toBackendTimeFormat = (time: string) => time.replace(':', '.');
const toFrontendTimeFormat = (time: string) => time.replace('.', ':');

const getStatusBadgeClass = (status: string) => {
  switch (status?.toLowerCase()) {
    case "accepted": return "bg-emerald-500/20 text-emerald-600 border-emerald-500/30";
    case "rejected": return "bg-rose-500/20 text-rose-600 border-rose-500/30";
    default: return "bg-amber-500/20 text-amber-600 border-amber-500/30";
  }
};

export default function VocalRecordingAppointment() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<AppointmentSlot | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isDayAvailable, setIsDayAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [cancelModal, setCancelModal] = useState<{ open: boolean; item: AppointmentItem | null; reason: string }>({
    open: false,
    item: null,
    reason: "",
  });

  const fetchAppointments = useCallback(async () => {
    try {
      const userId = localStorage.getItem(SYSTEM_KEY.ID);
      if (!userId) {
        console.warn("No user ID found, skipping appointment fetch");
        return;
      }
      const res = await UseAxios(`appointments/user/${userId}`, "GET");
      // UseAxios returns axios response, so res.data contains the actual data
      setAppointments(Array.isArray(res?.data) ? res.data : []);
    } catch (error: any) {
      console.error("Failed to fetch appointments", error);
      // If it's a 422 error, it likely means database isn't set up yet
      if (error?.response?.status === 422) {
        console.warn("Database may not be set up. Please run: npm run db:push in backend folder");
        setAppointments([]); // Set empty array to prevent UI errors
      }
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Poll for real-time status updates every 30s
  useEffect(() => {
    const interval = setInterval(fetchAppointments, APPOINTMENTS_POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchAppointments]);

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    return checkDate < today;
  };

  const isWeekend = (date: Date) => {
    const d = date.getDay();
    return d === 0 || d === 6; // Sunday or Saturday
  };

  // Fetch Appointments
  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      setIsLoading(true);
      try {
        const response = await UseAxios(`appointments/${format(selectedDate, "yyyy-MM-dd")}`, "GET");
        const data = response?.data ?? response;
        const dayAvailable = data.isDayAvailable !== false;
        setIsDayAvailable(dayAvailable);

        const normalizedSlot = {
          date: data.date,
          bookedTimes: (data.bookedTimes ?? []).map(([start, end]: [string, string]) => [
            toFrontendTimeFormat(start),
            toFrontendTimeFormat(end)
          ])
        };
        setBookedSlots(normalizedSlot);

        const bookedTimes = normalizedSlot.bookedTimes || [];
        const timeSlotsForDay = (data.availableSlotTimes?.length > 0)
          ? toFrontendSlots(data.availableSlotTimes)
          : DEFAULT_TIME_SLOTS;
        let available = dayAvailable
          ? timeSlotsForDay.filter((time: string) => !bookedTimes.some(
              ([start, end]: [string, string]) => time >= start && time < end
            ))
          : [];

        const now = new Date();
        const isToday = format(selectedDate, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
        if (isToday) {
          const currentTime = format(now, "HH:mm");
          const beforeFilter = available.length;
          available = available.filter((time: string) => time > currentTime);
          
          // Show message if times were filtered out
          if (beforeFilter > available.length && available.length === 0) {
            toast.warning("All time slots for today have passed. Please select a future date.");
          } else if (beforeFilter > available.length) {
            toast.info("Past time slots have been filtered out.");
          }
        }

        setAvailableTimes(available);
        setStartTime("");
        setEndTime("");
      } catch (error: any) {
        console.error("Failed to fetch slots", error);
        
        // If 422 error, database may not be set up - use default slots
        if (error?.response?.status === 422) {
          console.warn("Database error. Using default time slots.");
          const isWeekdayDate = !isWeekend(selectedDate);
          setBookedSlots({
            date: format(selectedDate, "yyyy-MM-dd"),
            bookedTimes: []
          });
          setIsDayAvailable(isWeekdayDate);
          
          let available = isWeekdayDate ? [...DEFAULT_TIME_SLOTS] : [];
          
          // Filter past times if today
          const now = new Date();
          const isToday = format(selectedDate, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
          if (isToday && available.length > 0) {
            const currentTime = format(now, "HH:mm");
            available = available.filter((time: string) => time > currentTime);
          }
          
          setAvailableTimes(available);
          setStartTime("");
          setEndTime("");
        } else {
          setBookedSlots({
            date: format(selectedDate, "yyyy-MM-dd"),
            bookedTimes: []
          });
          setIsDayAvailable(true);
          setAvailableTimes([]);
          toast.error("Failed to fetch available time slots");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDate]);

  const calculateTimeDifference = (start: string, end: string) => {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
    return (endHours - startHours) * 60 + (endMinutes - startMinutes);
  };

  const getValidEndTimes = () => {
    if (!startTime || !bookedSlots) return [];
    
    const startIndex = availableTimes.indexOf(startTime);
    return availableTimes.slice(startIndex + 1).filter((time) => {
      if (calculateTimeDifference(startTime, time) < MIN_DURATION_MINUTES) {
        return false;
      }

      const bookedTimes = bookedSlots.bookedTimes || [];
      return !bookedTimes.some(
        ([start, end]) =>
          (time > startTime && time > start && time <= end) ||
          (startTime >= start && startTime < end)
      );
    });
  };

  const handleBooking = async () => {
    if (!selectedDate || !appointmentType || !startTime || !endTime || !bookedSlots) return;

    const now = new Date();
    const appointmentDateTime = new Date(selectedDate);
    const [hours, minutes] = startTime.split(':').map(Number);
    appointmentDateTime.setHours(hours, minutes, 0, 0);

    if (appointmentDateTime < now) {
      toast.error("Cannot book appointments in the past");
      return;
    }

    setIsLoading(true);
    try {
      await UseAxios('appointments', "POST", {
        date: format(selectedDate, 'yyyy-MM-dd'),
        startTime: toBackendTimeFormat(startTime),
        endTime: toBackendTimeFormat(endTime),
        appointmentType,
        user_id: Number(localStorage.getItem(SYSTEM_KEY.ID))
      });
      
      toast.success("Appointment booked successfully!");
      fetchAppointments();
      const response = await UseAxios(`appointments/${format(selectedDate, "yyyy-MM-dd")}`, "GET");
      const data = response?.data ?? response;
      const updatedSlot = {
        date: data.date,
        bookedTimes: (data.bookedTimes ?? []).map(([start, end]: [string, string]) => [
          toFrontendTimeFormat(start),
          toFrontendTimeFormat(end)
        ])
      };

      setBookedSlots(updatedSlot);
      const bookedTimes = updatedSlot.bookedTimes || [];
      const timeSlotsForDay = (data.availableSlotTimes?.length > 0)
        ? toFrontendSlots(data.availableSlotTimes)
        : DEFAULT_TIME_SLOTS;
      let available = timeSlotsForDay.filter((time: string) =>
        !bookedTimes.some(([start, end]: [string, string]) => time >= start && time < end)
      );
      const isToday = format(selectedDate, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
      if (isToday) {
        const currentTime = format(now, "HH:mm");
        available = available.filter((time: string) => time > currentTime);
      }
      setAvailableTimes(available);
      setStartTime("");
      setEndTime("");
      setAppointmentType("");
    } catch (error: any) {
      console.error("Booking failed", error);
      
      // Show specific error message from backend
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error?.response?.status === 422) {
        toast.error("Database not set up. Please run: npm run db:push in backend");
      } else if (error?.response?.status === 401) {
        toast.error("Please log in to book an appointment");
      } else if (error?.response?.status === 400) {
        toast.error("Invalid appointment details. Please check your selection.");
      } else {
        toast.error("Failed to book appointment. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const displayTime = (t: string) => toFrontendTimeFormat(t);

  return (
    <AppLayout title="Vocal Recording Appointment" subtitle="Book your studio time and manage appointments.">
      <ToastContainer position="top-center" autoClose={3000} />
      
      {/* Stacked layout: Book Your Slot (full width) above My Appointments */}
      <div className="flex flex-col gap-6 w-full max-w-6xl">
      {/* Main booking card - gets more space */}
      <div className="w-full overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-800/60 shadow-2xl shadow-black/20 backdrop-blur-xl">
        {/* Header strip */}
        <div className="relative px-6 py-5 border-b border-slate-700/50 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/40">
              <svg className="h-6 w-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Book Your Slot</h2>
              <p className="text-sm text-slate-400">Select date and time for your recording session</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Step 1: Calendar */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-slate-900 text-sm font-bold">1</span>
                <h3 className="font-semibold text-white">Pick a date</h3>
              </div>
              <div className="rounded-2xl border border-slate-600/50 bg-slate-700/30 p-4">
                <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => isPastDate(date) || isWeekend(date)}
              className="rdp-dark [&_.rdp-day]:text-slate-200 [&_.rdp-day:hover]:bg-slate-600/50 [&_.rdp-month_caption]:text-white [&_.rdp-head_cell]:text-slate-400 [&_.rdp-day_disabled]:opacity-40 [&_.rdp-day_disabled]:cursor-not-allowed [&_.rdp-day_selected]:bg-amber-500 [&_.rdp-day_selected]:text-slate-900"
              modifiers={{
                booked: selectedDate && bookedSlots ? 
                  bookedSlots.bookedTimes.flatMap(([start, end]) => {
                    const startDate = parse(start, "HH:mm", selectedDate);
                    const endDate = parse(end, "HH:mm", selectedDate);
                    return { from: startDate, to: endDate };
                  }) : []
              }}
              modifiersStyles={{
                booked: {
                  color: '#ef4444',
                  backgroundColor: '#fee2e2',
                  textDecoration: 'line-through'
                }
              }}
            />
                <div className="mt-3 space-y-1 text-xs text-slate-400">
                  <p>• Weekdays only (Mon-Fri)</p>
                  <p>• Past dates are disabled</p>
                  <p>• Weekends are unavailable</p>
                </div>
              </div>
            </div>

            {/* Step 2 & 3: Time + Appointment type (side by side) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Step 2: Time Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-slate-900 text-sm font-bold">2</span>
                <h3 className="font-semibold text-white">Choose time</h3>
              </div>
              <div className="rounded-2xl border border-slate-600/50 bg-slate-700/30 p-4 overflow-y-auto min-h-0">
            {selectedDate ? (
              <div>
                <p className="text-slate-400 text-sm mb-3">{format(selectedDate, "EEEE, MMM d, yyyy")}</p>

                {isLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                  </div>
                ) : !isDayAvailable ? (
                  <div className="py-8 px-4 text-center rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <p className="font-medium text-amber-200">Studio closed on this day</p>
                    <p className="text-amber-300/80 text-sm mt-1">Please select another date.</p>
                  </div>
                ) : availableTimes.length === 0 ? (
                  <div className="py-8 px-4 text-center rounded-xl bg-rose-500/10 border border-rose-500/30">
                    <p className="font-medium text-rose-200">No available time slots</p>
                    <p className="text-rose-300/80 text-sm mt-1">All slots are booked or have passed. Please select another date.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-3">
                      <label className="block text-slate-300 text-sm font-medium mb-1.5">Start time</label>
                      <select
                        value={startTime}
                        onChange={(e) => { setStartTime(e.target.value); setEndTime(""); }}
                        className="w-full p-3 rounded-xl border border-slate-600 bg-slate-800/80 text-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                        disabled={isLoading}
                      >
                        <option value="">Select start time</option>
                        {availableTimes.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>

                    {startTime && (
                      <div className="mb-3">
                        <label className="block text-slate-300 text-sm font-medium mb-1.5">End time</label>
                        <select
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full p-3 rounded-xl border border-slate-600 bg-slate-800/80 text-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                          disabled={isLoading}
                        >
                          <option value="">Select end time</option>
                          {getValidEndTimes().map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                        <p className="mt-1.5 text-xs text-slate-500">Min. {MIN_DURATION_MINUTES} minutes</p>
                      </div>
                    )}

                    {startTime && endTime && (
                      <div className="mb-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                        <p className="text-xs font-medium text-amber-400/90 uppercase tracking-wider mb-1">Selected slot</p>
                        <p className="text-lg font-bold text-white">
                          {startTime} – {endTime}
                        </p>
                        <p className="text-slate-400 text-sm">{calculateTimeDifference(startTime, endTime)} min</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[200px] rounded-xl border-2 border-dashed border-slate-600/50">
                <div className="p-4 rounded-2xl bg-slate-700/30 mb-4">
                  <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-slate-400 font-medium">Select a date</p>
                <p className="text-slate-500 text-sm mt-1">Pick a day from the calendar</p>
              </div>
            )}
              </div>
            </div>

            {/* Step 3: Appointment type */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-slate-900 text-sm font-bold">3</span>
                <h3 className="font-semibold text-white">Choose appointment type</h3>
              </div>
              <div className="rounded-2xl border border-slate-600/50 bg-slate-700/30 p-4">
                <label className="block text-slate-300 text-sm font-medium mb-1.5">Purpose of appointment</label>
                <select
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-600 bg-slate-800/80 text-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                >
                  <option value="">Select type</option>
                  {APPOINTMENT_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || !appointmentType || !startTime || !endTime || isLoading}
                  className={`mt-4 w-full py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    !selectedDate || !appointmentType || !startTime || !endTime || isLoading
                      ? "bg-slate-700 cursor-not-allowed text-slate-500"
                      : "bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {isLoading ? "Booking..." : "Confirm & Book"}
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Appointments - below Book Your Slot */}
      <div className="w-full">
        <div className="overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-800/60 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="relative px-6 py-5 border-b border-slate-700/50 bg-gradient-to-r from-slate-700/30 via-transparent to-slate-700/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-700/50 border border-slate-600/50">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">My Appointments</h2>
                <p className="text-xs text-slate-500">Auto-refreshes every 30 seconds</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            {appointments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-600/50 bg-slate-700/20 p-8 text-center">
                <div className="inline-flex p-3 rounded-2xl bg-slate-700/50 border border-slate-600/50 mb-3">
                  <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-slate-400 font-medium text-sm">No appointments</p>
                <p className="text-slate-500 text-xs mt-1">Book a slot to get started</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-1">
                {appointments.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl backdrop-blur-sm bg-slate-700/40 border border-slate-600/50 p-6 shadow-lg hover:shadow-xl hover:border-slate-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40">
                            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="font-bold text-white text-lg">
                            {format(new Date(item.appointment.date + "T12:00:00"), "EEEE, MMM d")}
                          </p>
                        </div>
                        <p className="text-slate-300 font-medium">
                          {displayTime(item.time_in)} – {displayTime(item.time_out)}
                        </p>
                        {item.appointmentType && (
                          <p className="text-slate-400 text-sm mt-1">{item.appointmentType}</p>
                        )}
                        <span className={`inline-block mt-3 px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusBadgeClass(item.status)}`}>
                          {item.cancelRequested ? "Cancel requested" : item.status}
                        </span>
                        {item.status === "rejected" && item.rejectReason && (
                          <p className="mt-2 text-sm text-rose-300/90">Reason: {item.rejectReason}</p>
                        )}
                      </div>
                      <div className="shrink-0">
                        {item.cancelRequested ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-amber-500/20 text-amber-400 border border-amber-500/40">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Awaiting approval
                          </span>
                        ) : item.status !== "rejected" ? (
                          <button
                            className="px-4 py-2 rounded-lg font-medium bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30 transition-colors"
                            onClick={() => setCancelModal({ open: true, item, reason: "" })}
                          >
                            Request Cancel
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Cancel Request Modal */}
      {cancelModal.open && cancelModal.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Request Cancellation</h3>
            <p className="text-slate-400 text-sm mb-4">
              Provide a reason. Admin will review your request.
            </p>
            <textarea
              value={cancelModal.reason}
              onChange={(e) => setCancelModal((p) => ({ ...p, reason: e.target.value }))}
              placeholder="Reason for cancellation..."
              className="w-full p-3 rounded-xl border border-slate-600 bg-slate-700/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 resize-none"
              rows={3}
              required
            />
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setCancelModal({ open: false, item: null, reason: "" })}
                className="flex-1 py-2.5 px-4 rounded-xl font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={async () => {
                  if (!cancelModal.reason.trim()) {
                    toast.error("Please provide a reason");
                    return;
                  }
                  try {
                    await UseAxios(`appointments/cancel-request/${cancelModal.item!.id}`, "POST", {
                      reason: cancelModal.reason.trim(),
                    });
                    toast.success("Cancel request submitted. Awaiting admin approval.");
                    setCancelModal({ open: false, item: null, reason: "" });
                    fetchAppointments();
                  } catch {
                    toast.error("Failed to submit request");
                  }
                }}
                className="flex-1 py-2.5 px-4 rounded-xl font-semibold bg-rose-500 text-white hover:bg-rose-400 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
