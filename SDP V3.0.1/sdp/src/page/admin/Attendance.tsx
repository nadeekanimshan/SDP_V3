import { useEffect, useState } from "react";
import { UseAxios } from "../../hook/useAxios";
import { FaSearch } from "react-icons/fa";
import { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";
interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface Attendance {
  id: number;
  user_id: number;
  date: string;
  time_in: string;
  time_out?: string;
  note?: string;
  user: User;
}

export default function AttendanceManagement() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("");
  const [notification, setNotification] = useState("");
  const notify = () => toast(notification);
  const confirm = () => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center gap-3 text-white">
          <div>Do you want to mark time out?</div>
          <div className="flex gap-4">
            <button
              onClick={async () => {
                try {
                    await UseAxios(`attendance/time-out`, "POST", {
                      user_id: Number(userId),
                      date: format(new Date(), "yyyy-MM-dd"),
                    });
                    fetchAttendances();
                    setUserId("");
                    setNotification("Attendance time out marked successfully");
                  } catch (err) {
                    console.error("Failed to mark attendance", err);
                  }
                  setUserId("");
                  closeToast();
                }}
              className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        position: "top-center",
        hideProgressBar: true,
        pauseOnFocusLoss: false,
        closeButton: false,
      }
    );
  };

  useEffect(() => {
    fetchAttendances();
  }, [selectedDate]);

  const fetchAttendances = async () => {
    try {
      const res = await UseAxios(`attendance/${selectedDate}`, "GET");
      setAttendances(res.data);
    } catch (err) {
      console.error("Failed to fetch attendance", err);
      setAttendances([]);
    }
  };
  useEffect(() => {
    if(notification){
      notify();
    }
  }, [notification]);

  const markAttendance = async () => {
    if (!userId) return alert("Please enter User ID");
    try {
      await UseAxios(`attendance`, "POST", {
        user_id: Number(userId),
        date: format(new Date(), "yyyy-MM-dd"),
      });
      fetchAttendances();
      setUserId("");
      setNotification("Attendance marked successfully");
    } catch (err) {
      if (err instanceof AxiosError) {
        if(err.response?.status===409){
          setNotification("Attendance already marked");
          confirm();
        }
      }
      console.error("Failed to mark attendance", err);
    }
  };

  const filteredAttendances = attendances.filter((a) =>
    `${a.user.firstName} ${a.user.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-900 p-6">
      <ToastContainer/>
      <h1 className="text-2xl font-bold mb-4 text-white">Attendance Management</h1>

      {/* Attendance Marking */}
      <div className="flex gap-4 mb-6">
        <input
          type="number"
          placeholder="User ID"
          className="w-40 border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          onClick={markAttendance}
        >
          Mark Attendance
        </button>
      </div>

      {/* Date Picker */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Select Date:</label>
        <input
          type="date"
          className="border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Search Bar */}
      <form className="max-w-md mx-auto mb-6" onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="w-4 h-4 text-gray-500" />
          </div>
          <input
            type="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      {/* Attendance Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Time In</th>
              <th className="px-6 py-3">Time Out</th>
              <th className="px-6 py-3">Note</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendances.map((a) => (
              <tr key={a.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
                  {a.user.firstName} {a.user.lastName}
                </td>
                <td className="px-6 py-4">{new Date(a.time_in).getHours()}:{new Date(a.time_in).getMinutes()}</td>
                <td className="px-6 py-4">{a.time_out ? (new Date(a.time_out).getHours() + ":" + new Date(a.time_out).getMinutes()) : "-"}</td>
                <td className="px-6 py-4">{a.note || "-"}</td>
              </tr>
            ))}
            {filteredAttendances.length === 0 && (
              <tr className="bg-white dark:bg-gray-800">
                <td colSpan={4} className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                  No Attendance Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
