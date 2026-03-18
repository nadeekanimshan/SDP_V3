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
    <div className={`flex relative flex-row items-center gap-4 shadow-lg rounded-md w-[1200px] mt-6 ${isEventOver ? "bg-gray-100 disabled cursor-not-allowed opacity-80 text-black" : "bg-white text-white"}`} >
        <div className="h-full absolute z-0 bg-blend-darken bg-gray-900" style={{ backgroundSize: "cover", backgroundPosition: "center"}}></div>
       
       <img src={eventImage} className="w-[400px] h-[400px] object-cover rounded-md z-10" alt="" />
        <div className={`p-4 z-10 ${isEventOver ? "bg-gray-100 disabled cursor-not-allowed opacity-90 text-black" : "bg-white text-black"}`}>
            <h1 className="text-2xl font-bold mb-4">{eventName}</h1>
            <p>{eventDescription}</p>
            <p className="mt-4">Event Date : <span className="font-bold text-black">{eventDate}</span></p>
            <p>Event Time : <span className="font-bold text-black">{eventTime}</span></p>  
            <p>Event Venue : <span className="font-bold text-black">{eventVenue}</span></p>
            <button className={`${isEventOver ? "bg-red-200 disabled cursor-not-allowed opacity-75 text-black" : "bg-black text-white"}  px-6 py-2 rounded hover:bg-white hover:text-black border-black border transition mt-4`} onClick={() =>{ if(!isEventOver) window.open(url, '_blank')}}>{isEventOver ? "Event is over" : "Ticket Book Now"}</button>
        </div>
        
    </div>
  )
}
