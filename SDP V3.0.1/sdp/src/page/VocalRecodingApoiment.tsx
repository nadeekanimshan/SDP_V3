import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, parse } from "date-fns";
import bg from "../assets/icon/1L.jpg";
import Navbar from "../components/vocalTraningClass/NavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SYSTEM_KEY } from "../config/Constent";
import { UseAxios } from "../hook/useAxios";

type AppointmentSlot = {
  date: string; // yyyy-MM-dd
  bookedTimes: [string, string][]; // Example: [["08.00", "08.30"]]
};

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

const MIN_DURATION_MINUTES = 30;

// Helper functions to convert between time formats
const toBackendTimeFormat = (time: string) => time.replace(':', '.');
const toFrontendTimeFormat = (time: string) => time.replace('.', ':');

export default function VocalRecordingAppointment() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<AppointmentSlot | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);

  const fetchAppointments = async () => {
    try {
      const userId = localStorage.getItem("id"); // Assume ID stored in localStorage
      const res = await UseAxios(`appointments/user/${userId}`, "GET");
      setAppointments(res.data);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day >= 1 && day <= 5;
  };

  // Fetch Appointments
  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      setIsLoading(true);
      try {
        const response = await UseAxios(`appointments/${format(selectedDate, "yyyy-MM-dd")}`, "GET");
        
        // Convert backend time format to frontend format
        const normalizedSlot = {
          date: response.data.date,
          bookedTimes: response.data.bookedTimes.map(([start, end]) => [
            toFrontendTimeFormat(start),
            toFrontendTimeFormat(end)
          ])
        };

        setBookedSlots(normalizedSlot);

        const bookedTimes = normalizedSlot.bookedTimes || [];
        const available = timeSlots.filter((time) => {
          return !bookedTimes.some(
            ([start, end]) => time >= start && time < end
          );
        });

        setAvailableTimes(available);
        setStartTime("");
        setEndTime("");
      } catch (error) {
        console.error("Failed to fetch slots", error);
        setBookedSlots({
          date: format(selectedDate, "yyyy-MM-dd"),
          bookedTimes: []
        });
        setAvailableTimes([...timeSlots]);
        toast.error("Failed to fetch available time slots");
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
    if (!selectedDate || !startTime || !endTime || !bookedSlots) return;

    setIsLoading(true);
    try {
      await UseAxios('appointments', "POST", {
        date: format(selectedDate, 'yyyy-MM-dd'),
        startTime: toBackendTimeFormat(startTime),
        endTime: toBackendTimeFormat(endTime),
        user_id: Number(localStorage.getItem(SYSTEM_KEY.ID))
      });
      
      toast.success("Appointment booked successfully!");
      fetchAppointments();
      // Refresh available slots
      const response  = await UseAxios(`appointments/${format(selectedDate, "yyyy-MM-dd")}`, "GET");
      
      // Normalize time formats again
      const updatedSlot = {
        date: response.data.date,
        bookedTimes: response.data.bookedTimes.map(([start, end]) => [
          toFrontendTimeFormat(start),
          toFrontendTimeFormat(end)
        ])
      };

      setBookedSlots(updatedSlot);
      const bookedTimes = updatedSlot.bookedTimes || [];
      const available = timeSlots.filter((time) => {
        return !bookedTimes.some(
          ([start, end]) => time >= start && time < end
        );
      });

      setAvailableTimes(available);
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Booking failed", error);
      toast.error("Failed to book appointment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center py-10"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="p-6 max-w-4xl w-full mx-auto bg-white bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Vocal Recording Appointment
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => !isWeekday(date)}
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
            <div className="mt-4 text-sm text-gray-600">
              <p>• Select a weekday (Monday-Friday)</p>
              <p>• Red slots indicate booked times</p>
            </div>
          </div>

          {/* Time Selection Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            {selectedDate ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Available Times for {format(selectedDate, "MMMM d, yyyy")}
                </h3>

                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
                  </div>
                ) : (
                  <>
                    {/* Start Time */}
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2 font-medium">
                        Start Time:
                      </label>
                      <select
                        value={startTime}
                        onChange={(e) => {
                          setStartTime(e.target.value);
                          setEndTime("");
                        }}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                        disabled={isLoading}
                      >
                        <option value="">Select Start Time</option>
                        {availableTimes.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* End Time */}
                    {startTime && (
                      <div className="mb-6">
                        <label className="block text-gray-700 mb-2 font-medium">
                          End Time:
                        </label>
                        <select
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                          disabled={isLoading}
                        >
                          <option value="">Select End Time</option>
                          {getValidEndTimes().map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        <p className="mt-2 text-sm text-gray-500">
                          Minimum booking duration: {MIN_DURATION_MINUTES} minutes
                        </p>
                      </div>
                    )}

                    {startTime && endTime && (
                      <div className="mb-6 p-4 bg-gray-100 rounded-md">
                        <p className="text-lg font-medium text-gray-800">
                          Selected Time Slot: 
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          {startTime} to {endTime}
                        </p>
                        <p className="text-gray-600 mt-1">
                          ({calculateTimeDifference(startTime, endTime)} minutes)
                        </p>
                      </div>
                    )}

                    <button
                      onClick={handleBooking}
                      disabled={!selectedDate || !startTime || !endTime || isLoading}
                      className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                        !selectedDate || !startTime || !endTime || isLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gray-800 hover:bg-gray-700 text-white"
                      }`}
                    >
                      {isLoading ? "Processing..." : "Book Appointment"}
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-gray-600 text-lg mb-4">
                  Please select a date from the calendar
                </p>
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
        
      </div>
      <div className="w-[80%] mt-6 px-4 py-2 rounded-md bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Appointment Details
        </h2>
        <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">My Appointments</h1>
      <table className="w-full text-sm text-left text-gray-700 border border-gray-300">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4">No appointments found</td>
            </tr>
          ) : (
            appointments.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b hover:bg-gray-100 transition"
              >
                <td className="px-4 py-2">{format(new Date(item.appointment.date), "MMMM d, yyyy")}</td>
                <td className="px-4 py-2">{item.time_in}</td>
                <td className="px-4 py-2">{item.time_out}</td>
                <td className="px-4 py-2">{item.status}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-white hover:text-black border border-black"
                    onClick={async () => {
                      await UseAxios(`appointments/cancel/${item.id}`, "PUT");
                      fetchAppointments();
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

      </div>
    </div>
  );
}