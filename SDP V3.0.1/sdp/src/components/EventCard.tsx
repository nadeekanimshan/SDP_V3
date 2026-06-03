import { useEffect, useState } from "react";
interface EventCardProps {
    eventImage: string;
    eventName: string;
    eventDescription: string;
    eventDate: string;
    eventTime: string;
    eventVenue: string;
    url: string;
}
export default function EventCard({eventImage, eventName, eventDescription, eventDate, eventTime, eventVenue, url}: EventCardProps) {

  const [isEventOver, setIsEventOver] = useState<boolean>(false);

  useEffect(() => {
    setIsEventOver(new Date(eventDate).toLocaleDateString('en-GB') < new Date().toLocaleDateString('en-GB'));
  }, [eventDate]);
  return (
    <div
      className={`flex relative flex-row items-center gap-4 shadow-xl rounded-2xl w-full max-w-5xl overflow-hidden ${
        isEventOver ? "opacity-70 cursor-not-allowed" : ""
      } backdrop-blur-sm bg-slate-800/50 border border-slate-700/50`}
    >
      <img src={eventImage} className="w-[320px] h-[280px] sm:w-[400px] sm:h-[320px] object-cover flex-shrink-0" alt="" />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-3 text-white">{eventName}</h1>
        <p className="text-slate-300 mb-4">{eventDescription}</p>
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
            ? "Event is over" 
            : !url 
              ? "Booking link not available" 
              : "Book Event"}
        </button>
      </div>
    </div>
  );
}
