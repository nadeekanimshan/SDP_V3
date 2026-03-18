import { useEffect, useState } from "react";
import { UseAxios } from "../../hook/useAxios";
import { FaSearch } from "react-icons/fa";
import { format } from "date-fns";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
  address: string;
  city: string;
  district: string;
  email: string;
  typeId: number;
}

interface AppointmentDetail {
  id: number;
  appointment_id: number;
  time_in: string;
  time_out: string;
  note: string;
  user_id: number;
  status: string;
  user: User;
}

interface AppointmentResponse {
  appointment: {
    id: number;
    date: string;
    status: string;
    note: string;
  };
  details: AppointmentDetail[];
}

export default function AppointmentManagement() {
  const [appointment, setAppointment] = useState<AppointmentResponse | null>(null);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    if (selectedDate) {
      fetchAppointment(selectedDate);
    }
  }, [selectedDate]);

  const fetchAppointment = async (date: string) => {
    try {
      const res = await UseAxios(`appointments/all/${date}`, "GET");
      setAppointment(res.data);
    } catch (err) {
      console.error("Failed to fetch appointment:", err);
      setAppointment(null);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await UseAxios(`appointments/${id}`, "PUT", { status });
      fetchAppointment(selectedDate);
    } catch (err) {
      console.error("Failed to update appointment status:", err);
    }
  };

  const filteredDetails = appointment?.details.filter((detail) =>
    `${detail.user.firstName} ${detail.user.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  ) || [];

  return (
    <div className="flex-1 bg-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Appointments</h1>

      {/* Date Picker */}
      <div className="mb-4 w-1/6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Date:
        </label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Appointment Info */}
      {appointment?.appointment ? (
        <div className="mb-6 text-white">
          <p><strong>Date:</strong> {appointment.appointment.date}</p>
          <p><strong>Status:</strong> {appointment.appointment.status}</p>
        </div>
      ) : (
        <p className="mb-6 text-gray-400">
          No appointment found for selected date.
        </p>
      )}

      {/* Search Bar */}
      <form className="max-w-md mx-auto mb-6" onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="w-4 h-4 text-gray-500" />
          </div>
          <input
            type="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            placeholder="Search by user name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      {/* Details Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Time In</th>
              <th className="px-6 py-3">Time Out</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredDetails.map((detail) => (
              <tr key={detail.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{detail.time_in}</td>
                <td className="px-6 py-4">{detail.time_out}</td>
                <td className="px-6 py-4"><select onChange={(e) => handleStatusChange(detail.id, e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={detail.status}>
                  <option value="pending">Pending</option>
                  <option value="rejected">Reject</option>
                  <option value="accepted">Accept</option>
                </select></td>
                <td className="px-6 py-4">
                  {detail.user.firstName} {detail.user.lastName}
                </td>
                <td className="px-6 py-4">{detail.user.contactNumber}</td>
              </tr>
            ))}
            {filteredDetails.length === 0 && (
              <tr className="bg-white dark:bg-gray-800">
                <td colSpan={5} className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                  No Appointments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
