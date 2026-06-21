import { AppLayout } from "../components/layout";
import EventCard from "../components/EventCard";
import bg2 from "../assets/icon/home/6L.jpg";
import { useEffect, useState } from "react";
import { UseAxios } from "../hook/useAxios";

type Event = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  time: string;
  eventUrl?: string;
  note: string;
};

export default function Event() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    try {
      setLoading(true);
      const getEvents = async () => {
        const response = await UseAxios("events", "GET");
        setEvents(response.data ?? []);
        setLoading(false);
        setError(null);
      };
      getEvents();
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getEventDateTime = (event: Event) => {
    const match = event.time?.match(/(\d{1,2}):(\d{2})/);
    const h = match ? parseInt(match[1], 10) : 23;
    const m = match ? parseInt(match[2], 10) : 59;
    const dt = new Date(event.startDate);
    dt.setHours(h, m, 0, 0);
    return dt;
  };

  const isExpired = (event: Event) => getEventDateTime(event) < new Date();

  const sortedEvents = [...events].sort((a, b) => {
    const aExp = isExpired(a);
    const bExp = isExpired(b);
    // expired events go to bottom
    if (aExp !== bExp) return aExp ? 1 : -1;
    // among active: nearest first; among expired: most recently expired first
    return getEventDateTime(a).getTime() - getEventDateTime(b).getTime();
  });

  return (
    <AppLayout title="Audio Diary Studio Events" subtitle="Discover upcoming events and book your tickets.">
      <div className="flex flex-col items-center gap-6">
        {loading && <p className="text-slate-300">Loading...</p>}
        {error && <p className="text-red-400">Error: {error.message}</p>}
        {sortedEvents?.map((event: Event) => (
          <EventCard
            key={event.id}
            eventImage={bg2}
            eventName={event.title}
            eventDescription={event.description}
            eventDate={new Date(event.startDate).toLocaleDateString("en-GB")}
            startDateRaw={event.startDate}
            eventTime={(() => {
              if (!event.time) return '-';
              // extract HH:MM regardless of format: "HH:MM", "HH:MM:SS", or ISO "...THH:MM:SS..."
              const match = event.time.match(/(\d{1,2}):(\d{2})/);
              if (!match) return event.time;
              const h = parseInt(match[1], 10);
              const m = parseInt(match[2], 10);
              const period = h >= 12 ? 'pm' : 'am';
              const hour12 = h % 12 === 0 ? 12 : h % 12;
              return `${String(hour12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
            })()}
            eventVenue={event.location}
            url={event.eventUrl || ""}
            timeRaw={event.time || ""}
          />
        ))}
      </div>
    </AppLayout>
  );
}
