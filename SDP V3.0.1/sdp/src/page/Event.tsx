import Navbar from "../components/vocalTraningClass/NavBar"
import Footer from "../components/Footer"
import bg from "../assets/icon/home/2L.jpg"
import profile from "../assets/icon/home/4L.jpg"
import EventCard from "../components/EventCard"
import bg2 from "../assets/icon/home/6L.jpg"
import { useEffect, useState } from "react"
import { UseAxios } from "../hook/useAxios"

type Event = {

id : number
title : string
description : string
startDate : string
endDate : string
location : string
time : string
note : string
}

export default function Event() {

      const [loading, setLoading] = useState<boolean>(false);
      const [error, setError] = useState<Error | null>(null);
      const [events, setEvents] = useState<Event[]>([]);

      useEffect(() => {
        try {
        setLoading(true)
        const getEvents = async () => {
            const response = await UseAxios('events', "GET");
            setEvents(response.data);
          console.log(events)
          setLoading(false)
          setError(null)
    }
    getEvents()
  } catch (error) {
    setError(error as Error)
  } finally {
    setLoading(false)
  }
  }, [])
 

  return (
    <>
      <Navbar />
      <section>
        {/* header section */}
        <div>
          <div className="w-full h-[300px] z-0 relative bg-blend-darken" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="flex flex-row items-center z-10 absolute bottom-0 left-0 p-4">
              <img className="w-[200px] h-[200px] object-cover rounded-md" src={profile} alt="" />
              <h1 className="text-white text-6xl font-bold">Audio Diary Studio Events</h1>
            </div>
          </div>

          <div className="w-full flex flex-wrap gap-6 flex-col justify-center items-center bg-gray-200 pb-6 pt-6">
            {loading && <p className="text-white">Loading...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}
            {events?.map((event: Event) => (
              <EventCard key={event.id} eventImage={bg2} eventName={event.title} eventDescription={event.description} eventDate={new Date(event.startDate).toLocaleDateString('en-GB')} eventTime={new Date(event.time).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
              })} eventVenue={event.location} url="https://mytickets.lk/" />
            ))}
          </div>
        </div>
        {/* event section */}
        <div>
        </div>
      </section>
      <Footer />
    </>
  )
}
