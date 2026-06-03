import { useEffect, useState, useCallback } from "react";
import { UseAxios } from "../../hook/useAxios";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
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

interface AppointmentItem {
  id: number;
  appointment_id: number;
  time_in: string;
  time_out: string;
  appointmentType?: string;
  note: string;
  user_id: number;
  status: string;
  cancelRequested?: boolean;
  cancelReason?: string | null;
  user: User;
  appointment: { id: number; date: string; status: string; note: string | null };
}

const APPOINTMENTS_POLL_INTERVAL_MS = 15000;

const getStatusBadgeClass = (status: string, cancelRequested?: boolean) => {
  if (cancelRequested) return "bg-orange-500/20 text-orange-400 border-orange-500/40";
  switch (status?.toLowerCase()) {
    case "accepted": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
    case "rejected": return "bg-rose-500/20 text-rose-400 border-rose-500/40";
    default: return "bg-amber-500/20 text-amber-400 border-amber-500/40";
  }
};

const displayTime = (t: string) => t.replace(".", ":");

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [listAllMode, setListAllMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [reasonModal, setReasonModal] = useState<{ open: boolean; item: AppointmentItem | null }>({ open: false, item: null });
  const [rejectModal, setRejectModal] = useState<{ open: boolean; item: AppointmentItem | null; reason: string; type: "appointment" | "cancel" }>({ open: false, item: null, reason: "", type: "appointment" });

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    try {
      if (listAllMode) {
        const params: Record<string, string> = {};
        if (selectedDate) params.date = selectedDate;
        if (selectedStatus) params.status = selectedStatus;
        const res = await UseAxios("appointments/list/all", "GET", undefined, params);
        const data = res?.data ?? res;
        setAppointments(Array.isArray(data) ? data : []);
      } else {
        const date = selectedDate || format(new Date(), "yyyy-MM-dd");
        const res = await UseAxios(`appointments/all/${date}`, "GET");
        const data = res?.data ?? res;
        const details = (data?.details ?? []) as AppointmentDetail[];
        const items: AppointmentItem[] = details.map((d) => ({
          ...d,
          appointment: data?.appointment ?? { id: 0, date, status: "", note: null },
        }));
        setAppointments(items);
      }
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  }, [listAllMode, selectedDate, selectedStatus]);

  useEffect(() => {
    if (!listAllMode && !selectedDate) {
      setSelectedDate(format(new Date(), "yyyy-MM-dd"));
    }
  }, [listAllMode]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Poll for real-time status updates every 15s
  useEffect(() => {
    const interval = setInterval(fetchAppointments, APPOINTMENTS_POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchAppointments]);

  const handleStatusChange = async (id: number, status: string, detail: AppointmentItem) => {
    if (status === "rejected") {
      setRejectModal({ open: true, item: detail, reason: "", type: "appointment" });
      return;
    }
    try {
      await UseAxios(`appointments/${id}`, "PUT", { status });
      fetchAppointments();
    } catch (err) {
      console.error("Failed to update appointment status:", err);
    }
  };

  const filteredAppointments = appointments.filter((item) =>
    `${item.user?.firstName ?? ""} ${item.user?.lastName ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <FaCalendarAlt className="text-amber-400" /> Appointments
          </h1>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6 items-end">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setListAllMode(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                listAllMode
                  ? "bg-amber-500 text-slate-900"
                  : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
              }`}
            >
              List All
            </button>
            <button
              onClick={() => setListAllMode(false)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                !listAllMode
                  ? "bg-amber-500 text-slate-900"
                  : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
              }`}
            >
              By Date
            </button>
          </div>

          {listAllMode && (
            <>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Filter by date</label>
                <input
                  type="date"
                  className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Filter by status</label>
                <select
                  className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="cancel_requested">Cancel requested</option>
                </select>
              </div>
            </>
          )}

          {!listAllMode && (
            <div>
              <label className="block text-xs text-slate-400 mb-1">Select Date</label>
              <input
                type="date"
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={selectedDate || format(new Date(), "yyyy-MM-dd")}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          )}

          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs text-slate-400 mb-1">Search by name</label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="search"
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Search by user name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-lg">No appointments found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-700/50 text-slate-300">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Cancel Reason</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((detail) => (
                    <tr
                      key={detail.id}
                      className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-white">
                        {detail.appointment?.date
                          ? format(new Date(detail.appointment.date + "T12:00:00"), "MMM d, yyyy")
                          : "-"}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {displayTime(detail.time_in)} – {displayTime(detail.time_out)}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {detail.appointmentType ?? "Vocal Recording"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(
                            detail.status,
                            detail.cancelRequested
                          )}`}
                        >
                          {detail.cancelRequested ? "Cancel requested" : detail.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white">
                        {detail.user?.firstName} {detail.user?.lastName}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {detail.user?.contactNumber ?? "-"}
                      </td>
                      <td className="px-6 py-4">
                        {detail.cancelRequested && detail.cancelReason ? (
                          <button
                            onClick={() => setReasonModal({ open: true, item: detail })}
                            className="text-amber-400 hover:text-amber-300 text-sm font-medium underline underline-offset-2"
                          >
                            View reason
                          </button>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {detail.cancelRequested ? (
                          <div className="flex gap-2">
                            <button
                              onClick={async () => {
                                try {
                                  await UseAxios(`appointments/cancel-approve/${detail.id}`, "PUT");
                                  fetchAppointments();
                                } catch (err) {
                                  console.error("Failed to approve cancel:", err);
                                }
                              }}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                            >
                              Approve
                            </button>
                            <button
                              onClick={async () => {
                                try {
                                  await UseAxios(`appointments/cancel-reject/${detail.id}`, "PUT");
                                  fetchAppointments();
                                } catch (err) {
                                  console.error("Failed to reject cancel:", err);
                                }
                              }}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <select
                            onChange={(e) => handleStatusChange(detail.id, e.target.value, detail)}
                            className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            value={detail.status}
                          >
                            <option value="pending">Pending</option>
                            <option value="rejected">Reject</option>
                            <option value="accepted">Accept</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Reject Reason Modal */}
      {rejectModal.open && rejectModal.item && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">
              {rejectModal.type === "cancel" ? "Reject Cancel Request" : "Reject Appointment"}
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              {rejectModal.item.user?.firstName} {rejectModal.item.user?.lastName} • {rejectModal.item.appointment?.date} ({displayTime(rejectModal.item.time_in)} – {displayTime(rejectModal.item.time_out)})
            </p>
            <p className="text-slate-300 text-sm mb-2">Reason (required – user will see this):</p>
            <textarea
              value={rejectModal.reason}
              onChange={(e) => setRejectModal((p) => ({ ...p, reason: e.target.value }))}
              placeholder="Enter reason for rejection..."
              className="w-full p-3 rounded-lg border border-slate-600 bg-slate-700/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 resize-none"
              rows={3}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setRejectModal({ open: false, item: null, reason: "", type: "appointment" })}
                className="flex-1 py-2.5 px-4 rounded-lg font-medium bg-slate-600 text-white hover:bg-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!rejectModal.reason.trim()) return;
                  try {
                    if (rejectModal.type === "cancel") {
                      await UseAxios(`appointments/cancel-reject/${rejectModal.item!.id}`, "PUT", { reason: rejectModal.reason.trim() });
                    } else {
                      await UseAxios(`appointments/${rejectModal.item!.id}`, "PUT", { status: "rejected", rejectReason: rejectModal.reason.trim() });
                    }
                    setRejectModal({ open: false, item: null, reason: "", type: "appointment" });
                    fetchAppointments();
                  } catch (err) {
                    console.error("Failed to reject:", err);
                  }
                }}
                disabled={!rejectModal.reason.trim()}
                className="flex-1 py-2.5 px-4 rounded-lg font-semibold bg-rose-500 text-white hover:bg-rose-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Reason Modal (view user's cancel reason) */}
      {reasonModal.open && reasonModal.item && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">Cancel Request Reason</h3>
            <p className="text-slate-300 text-sm mb-4">
              {reasonModal.item.user?.firstName} {reasonModal.item.user?.lastName} • {reasonModal.item.appointment?.date} ({displayTime(reasonModal.item.time_in)} – {displayTime(reasonModal.item.time_out)})
            </p>
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
              <p className="text-white whitespace-pre-wrap">{reasonModal.item.cancelReason || "No reason provided."}</p>
            </div>
            <button
              onClick={() => setReasonModal({ open: false, item: null })}
              className="mt-4 w-full py-2.5 px-4 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
