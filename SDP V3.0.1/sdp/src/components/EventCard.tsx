import { useEffect, useState } from "react";
interface EventCardProps {
    eventImage: string;
    eventName: string;
    eventDescription: string;
    eventDate: string;       // formatted display string e.g. "14/06/2026"
    eventTime: string;       // formatted display string e.g. "07:42 pm"
    eventVenue: string;
    url: string;
    startDateRaw: string;    // ISO date string for comparison
    timeRaw: string;         // raw time string from DB e.g. "20:25" or "1970-01-01T20:25:00.000Z"
}
export default function EventCard({eventImage, eventName, eventDescription, eventDate, eventTime, eventVenue, url, startDateRaw, timeRaw}: EventCardProps) {

  const [isEventOver, setIsEventOver] = useState<boolean>(false);
  const [status, setStatus] = useState<"Upcoming" | "Today" | "Expired">("Upcoming");

  useEffect(() => {
    const now = new Date();

    // Parse the event date
    const eventDay = new Date(startDateRaw);
    eventDay.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Extract HH:MM from timeRaw
    const match = timeRaw?.match(/(\d{1,2}):(\d{2})/);
    const eventH = match ? parseInt(match[1], 10) : 23;
    const eventM = match ? parseInt(match[2], 10) : 59;

    // Build full event datetime
    const eventDateTime = new Date(startDateRaw);
    eventDateTime.setHours(eventH, eventM, 0, 0);

    if (eventDateTime < now) {
      setIsEventOver(true);
      setStatus("Expired");
    } else if (eventDay.getTime() === today.getTime()) {
      setStatus("Today");
    } else {
      setStatus("Upcoming");
    }
  }, [startDateRaw, timeRaw]);

  return (
    <div
      className={`flex relative flex-row items-center gap-4 shadow-xl rounded-2xl w-full max-w-5xl overflow-hidden ${
        isEventOver ? "opacity-60" : ""
      } backdrop-blur-sm bg-slate-800/50 border border-slate-700/50`}
    >

      <img src={eventImage} className="w-[320px] h-[280px] sm:w-[400px] sm:h-[320px] object-cover flex-shrink-0" alt="" />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-3 text-white">{eventName}</h1>
        <p className="text-slate-300 mb-4">{eventDescription}</p>
        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${
          status === "Expired" ? "bg-rose-600/20 text-rose-400 border border-rose-600/40" :
          status === "Today"   ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" :
                                 "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
        }`}>
          {status}
        </span>
        <p className="text-slate-400">
          Event Date: <span className="font-semibold text-white">{eventDate}</span>
        </p>
        <p className="text-slate-400">
          Event Time: <span className="font-semibold text-white">{eventTime}</span>
        </p>
        <p className="text-slate-400">
          Event Venue: <span className="font-semibold text-white">{eventVenue}</span>
        </p>
        <button
          className={`mt-4 px-6 py-2.5 rounded-lg font-medium transition-all ${
            isEventOver || !url
              ? "bg-slate-600 cursor-not-allowed text-slate-400"
              : "bg-amber-500 text-slate-900 hover:bg-amber-400"
          }`}
          onClick={() => {
            if (!isEventOver && url) {
              window.open(url, "_blank", "noopener,noreferrer");
            }
          }}
          disabled={isEventOver || !url}
        >
          {isEventOver 
            ? "Event Expired" 
            : !url 
              ? "Booking link not available" 
              : "Book Event"}
        </button>
      </div>
    </div>
  );
}
