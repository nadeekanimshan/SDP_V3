import { useEffect, useState } from "react";
import { UseAxios } from "../../hook/useAxios";
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUserClock } from "react-icons/fa";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  contactNumber?: string;
  type?: { name: string };
}

interface Attendance {
  id: number;
  user_id: number;
  date: string;
  time_in: string;
  time_out?: string | null;
  note?: string | null;
  user: User;
}

const formatTime = (d: string | Date) => {
  const dt = typeof d === "string" ? new Date(d) : d;
  return format(dt, "h:mm a");
};

export default function AttendanceManagement() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    fetchAttendances();
  }, [selectedDate]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await UseAxios("users", "GET");
      const all = res?.data ?? [];
      setUsers(all.filter((u: User) => u.type?.name !== "ADMIN"));
    } catch (err) {
      console.error("Failed to fetch users", err);
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchAttendances = async () => {
    setLoading(true);
    try {
      const res = await UseAxios(`attendance/${selectedDate}`, "GET");
      setAttendances(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch attendance", err);
      setAttendances([]);
    } finally {
      setLoading(false);
    }
  };

  const markTimeIn = async () => {
    if (!selectedUserId) {
      toast.warning("Please select a user");
      return;
    }
    try {
      await UseAxios("attendance", "POST", {
        user_id: Number(selectedUserId),
        date: selectedDate,
        note: `Time In - ${format(new Date(), "yyyy-MM-dd HH:mm")}`,
      });
      toast.success("Time In marked successfully");
      fetchAttendances();
      setSelectedUserId("");
    } catch (err: any) {
      if (err?.response?.status === 409) {
        toast.info("Already marked. Use Time Out below to mark checkout.");
      } else {
        toast.error("Failed to mark attendance");
      }
    }
  };

  const markTimeOut = async (attendanceId: number, userId: number) => {
    try {
      await UseAxios("attendance/time-out", "POST", {
        user_id: userId,
        date: selectedDate,
      });
      toast.success("Time Out marked successfully");
      fetchAttendances();
    } catch (err) {
      toast.error("Failed to mark time out");
    }
  };

  const filteredAttendances = attendances.filter((a) =>
    `${a.user?.firstName ?? ""} ${a.user?.lastName ?? ""}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <ToastContainer position="top-center" autoClose={3000} theme="dark" />
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <FaUserClock className="text-amber-400" /> Attendance Management
          </h1>
        </div>

        {/* Mark Attendance Card */}
        <div className="mb-6 p-6 rounded-2xl backdrop-blur-sm bg-slate-800/50 border border-slate-700/50">
          <h2 className="text-lg font-bold text-white mb-4">Mark Time In</h2>
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Date</label>
              <input
                type="date"
                className="border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="min-w-[220px]">
              <label className="block text-sm text-slate-300 mb-1">Select User</label>
              <select
                className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white focus:ring-2 focus:ring-amber-500"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                disabled={loadingUsers}
              >
                <option value="">Choose user...</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.firstName} {u.lastName} {u.email ? `(${u.email})` : ""}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={markTimeIn}
              disabled={!selectedUserId}
              className="flex items-center gap-2 bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSignInAlt /> Mark Time In
            </button>
          </div>
        </div>

        {/* Search */}
        <form className="max-w-md mb-6" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="search"
              className="block w-full p-3 pl-10 text-sm text-white border border-slate-600 rounded-lg bg-slate-700/50 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>

        {/* Attendance Table */}
        <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-700/50 text-slate-300">
                <tr>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Time In</th>
                  <th className="px-6 py-3">Time Out</th>
                  <th className="px-6 py-3">Note</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500" />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredAttendances.map((a) => (
                      <tr key={a.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">
                          {a.user?.firstName} {a.user?.lastName}
                        </td>
                        <td className="px-6 py-4 text-slate-300">{formatTime(a.time_in)}</td>
                        <td className="px-6 py-4 text-slate-300">
                          {a.time_out ? formatTime(a.time_out) : "-"}
                        </td>
                        <td className="px-6 py-4 text-slate-400">{a.note || "-"}</td>
                        <td className="px-6 py-4">
                          {!a.time_out ? (
                            <button
                              onClick={() => markTimeOut(a.id, a.user_id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 text-sm font-medium"
                            >
                              <FaSignOutAlt /> Time Out
                            </button>
                          ) : (
                            <span className="text-slate-500 text-xs">Completed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filteredAttendances.length === 0 && !loading && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                          No attendance records for {format(new Date(selectedDate), "MMM d, yyyy")}
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
