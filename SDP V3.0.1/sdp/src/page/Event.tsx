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

  return (
    <AppLayout title="Audio Diary Studio Events" subtitle="Discover upcoming events and book your tickets.">
      <div className="flex flex-col items-center gap-6">
        {loading && <p className="text-slate-300">Loading...</p>}
        {error && <p className="text-red-400">Error: {error.message}</p>}
        {events?.map((event: Event) => (
          <EventCard
            key={event.id}
            eventImage={bg2}
            eventName={event.title}
            eventDescription={event.description}
            eventDate={new Date(event.startDate).toLocaleDateString("en-GB")}
            eventTime={new Date(event.time).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
            eventVenue={event.location}
            url={event.eventUrl || ""}
          />
        ))}
      </div>
    </AppLayout>
  );
}
