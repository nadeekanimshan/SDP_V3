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
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [reasonModal, setReasonModal] = useState<{ open: boolean; item: AppointmentItem | null }>({ open: false, item: null });
  const [rejectModal, setRejectModal] = useState<{ open: boolean; item: AppointmentItem | null; reason: string; type: "appointment" | "cancel" }>({ open: false, item: null, reason: "", type: "appointment" });
  const [payModal, setPayModal] = useState<{ open: boolean; item: AppointmentItem | null; fullAmount: string; paidAmount: string; paymentType: string; note: string; loading: boolean; previousPayments: any[] }>({ open: false, item: null, fullAmount: "", paidAmount: "", paymentType: "", note: "", loading: false, previousPayments: [] });
  const [paymentStatuses, setPaymentStatuses] = useState<Record<number, string>>({});

  const fetchPaymentStatuses = useCallback(async (items: AppointmentItem[]) => {
    const statusMap: Record<number, string> = {};
    await Promise.all(
      items.map(async (item) => {
        try {
          const res = await UseAxios(`appointments/payment/${item.id}`, "GET");
          const payments: any[] = Array.isArray(res?.data) ? res.data : [];
          if (payments.length > 0) {
            statusMap[item.id] = payments[payments.length - 1].status ?? "done";
          }
        } catch {
          // no payment — leave undefined
        }
      })
    );
    setPaymentStatuses(statusMap);
  }, []);

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
        fetchPaymentStatuses(Array.isArray(data) ? data : []);
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
        fetchPaymentStatuses(items);
      }
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  }, [listAllMode, selectedDate, selectedStatus, fetchPaymentStatuses]);

  useEffect(() => {
    if (!listAllMode && !selectedDate) {
      setSelectedDate(format(new Date(), "yyyy-MM-dd"));
    }
  }, [listAllMode]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Poll for real-time status updates every 15s (only if autoRefresh is enabled)
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(fetchAppointments, APPOINTMENTS_POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchAppointments, autoRefresh]);

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

  const filteredAppointments = appointments
    .filter((item) =>
      `${item.user?.firstName ?? ""} ${item.user?.lastName ?? ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by date (nearest date first)
      const dateA = new Date(a.appointment?.date || 0);
      const dateB = new Date(b.appointment?.date || 0);
      
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime(); // Ascending order (earliest first)
      }
      
      // If same date, sort by time_in
      const timeA = a.time_in?.replace(".", ":") || "00:00";
      const timeB = b.time_in?.replace(".", ":") || "00:00";
      return timeA.localeCompare(timeB);
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedDate, selectedStatus, listAllMode]);

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <FaCalendarAlt className="text-amber-400" /> Appointments
          </h1>
          
          {/* Auto-refresh toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">Auto-refresh (15s)</span>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoRefresh ? "bg-emerald-500" : "bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoRefresh ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            {autoRefresh && (
              <span className="text-xs text-emerald-400 font-medium">ON</span>
            )}
            {!autoRefresh && (
              <span className="text-xs text-slate-500 font-medium">OFF</span>
            )}
          </div>
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
                  {paginatedAppointments.map((detail) => (
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
                        <div className="flex items-center gap-2">
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
                        <button
                          onClick={async () => {
                            if (paymentStatuses[detail.id] === "done") return;
                            // Fetch previous payments if partially paid
                            let previousPayments: any[] = [];
                            let savedFullAmount = "";
                            if (paymentStatuses[detail.id] === "partially_done") {
                              try {
                                const res = await UseAxios(`appointments/payment/${detail.id}`, "GET");
                                previousPayments = Array.isArray(res?.data) ? res.data : [];
                                // Get fullAmount from the first payment record
                                if (previousPayments.length > 0 && previousPayments[0].fullAmount) {
                                  savedFullAmount = previousPayments[0].fullAmount.toString();
                                }
                              } catch (err) {
                                console.error("Failed to fetch previous payments:", err);
                              }
                            }
                            setPayModal({ open: true, item: detail, fullAmount: savedFullAmount, paidAmount: "", paymentType: "", note: "", loading: false, previousPayments });
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                            paymentStatuses[detail.id] === "done"
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 cursor-default"
                              : paymentStatuses[detail.id] === "partially_done"
                              ? "bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30 cursor-pointer"
                              : "bg-slate-500/20 text-slate-300 border-slate-500/40 hover:bg-slate-500/30 cursor-pointer"
                          }`}
                          disabled={paymentStatuses[detail.id] === "done"}
                        >
                          {paymentStatuses[detail.id] === "done"
                            ? "Full"
                            : paymentStatuses[detail.id] === "partially_done"
                            ? "Partially"
                            : "Pay"}
                        </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {!isLoading && filteredAppointments.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700/50">
              <div className="text-sm text-slate-400">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredAppointments.length)} of {filteredAppointments.length} appointments
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-700/50 text-white hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-amber-500 text-slate-900"
                              : "bg-slate-700/50 text-white hover:bg-slate-600/50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2 text-slate-500">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-700/50 text-white hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
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

      {/* Pay Modal */}
      {payModal.open && payModal.item && (() => {
        const full = parseFloat(payModal.fullAmount) || 0;
        const paid = parseFloat(payModal.paidAmount) || 0;
        
        // Calculate total previous payments
        const totalPreviousPaid = payModal.previousPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
        
        // Calculate total after this payment
        const totalAfterPayment = totalPreviousPaid + paid;
        const balance = full - totalAfterPayment;
        
        // Check if this payment makes it partial or done
        const isPartial = paid > 0 && totalAfterPayment < full;
        const isDone = paid > 0 && totalAfterPayment >= full;
        const canSubmit = full > 0 && paid > 0 && totalAfterPayment <= full && !!payModal.paymentType && !payModal.loading;

        const handlePay = async (status: string) => {
          if (!payModal.item) return;
          const itemId = payModal.item.id;
          setPayModal((p) => ({ ...p, loading: true }));
          try {
            await UseAxios("appointments/payment", "POST", {
              user_id: payModal.item.user_id,
              amount: paid,
              fullAmount: full,
              note: payModal.note || null,
              status,
              paymentMethod: payModal.paymentType,
              paymentType: "Appointment",
              appointment_id: payModal.item.id,
            });
            // immediately update button state without waiting for full refetch
            setPaymentStatuses((prev) => ({ ...prev, [itemId]: status }));
            setPayModal({ open: false, item: null, fullAmount: "", paidAmount: "", paymentType: "", note: "", loading: false, previousPayments: [] });
            fetchAppointments();
          } catch (err) {
            console.error("Payment failed", err);
            setPayModal((p) => ({ ...p, loading: false }));
          }
        };

        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Appointment Payment</h3>

              {/* Info rows */}
              <div className="bg-slate-700/40 rounded-xl border border-slate-600/50 p-4 mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">User Name</span>
                  <span className="text-white font-medium">{payModal.item.user?.firstName} {payModal.item.user?.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contact</span>
                  <span className="text-white">{payModal.item.user?.contactNumber ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Appointment Date</span>
                  <span className="text-white">{payModal.item.appointment?.date ? format(new Date(payModal.item.appointment.date + "T12:00:00"), "MMM d, yyyy") : "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Time</span>
                  <span className="text-white">{displayTime(payModal.item.time_in)} – {displayTime(payModal.item.time_out)}</span>
                </div>
                {/* Show Full Amount in details if there are previous payments */}
                {payModal.previousPayments.length > 0 && full > 0 && (
                  <div className="flex justify-between border-t border-slate-600 pt-2 mt-2">
                    <span className="text-slate-400">Full Amount</span>
                    <span className="text-white font-semibold">LKR {full.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Previous payments summary */}
              {payModal.previousPayments.length > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-4">
                  <h4 className="text-sm font-semibold text-amber-400 mb-2">Previous Payments</h4>
                  <div className="space-y-1.5">
                    {payModal.previousPayments.map((payment, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-slate-300">
                          {format(new Date(payment.paymentDate), "MMM d, yyyy")} - {payment.paymentMethod}
                        </span>
                        <span className="text-white font-medium">LKR {parseFloat(payment.amount).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t border-amber-500/20 pt-2 mt-2 flex justify-between text-sm font-semibold">
                      <span className="text-amber-400">Total Paid</span>
                      <span className="text-amber-400">LKR {totalPreviousPaid.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment fields */}
              <div className="space-y-3">
                {/* Only show Full Amount input if this is the first payment */}
                {payModal.previousPayments.length === 0 && (
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Full Amount (LKR)</label>
                    <input
                      type="number" min="0" placeholder="Enter full amount"
                      value={payModal.fullAmount}
                      onChange={(e) => setPayModal((p) => ({ ...p, fullAmount: e.target.value, paidAmount: "" }))}
                      className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Paid Amount (LKR)</label>
                  <input
                    type="number" min="0" max={payModal.fullAmount || undefined} placeholder="Enter paid amount"
                    value={payModal.paidAmount}
                    onChange={(e) => setPayModal((p) => ({ ...p, paidAmount: e.target.value }))}
                    className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Balance display */}
                {full > 0 && paid > 0 && (
                  <div>
                    {/* Show calculation breakdown if there are previous payments */}
                    {totalPreviousPaid > 0 && (
                      <div className="bg-slate-700/30 rounded-lg px-4 py-2 mb-2 text-xs space-y-1">
                        <div className="flex justify-between text-slate-400">
                          <span>Previously Paid:</span>
                          <span>LKR {totalPreviousPaid.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Current Payment:</span>
                          <span>LKR {paid.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-white font-medium border-t border-slate-600 pt-1">
                          <span>Total Paid:</span>
                          <span>LKR {totalAfterPayment.toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                    <div className={`flex justify-between items-center rounded-lg px-4 py-2.5 text-sm font-medium border ${
                      balance <= 0
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    }`}>
                      <span>Remaining Balance</span>
                      <span>LKR {balance > 0 ? balance.toFixed(2) : "0.00"}</span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Payment Method</label>
                  <select
                    value={payModal.paymentType}
                    onChange={(e) => setPayModal((p) => ({ ...p, paymentType: e.target.value }))}
                    className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">-- Select --</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Note (optional)</label>
                  <textarea
                    value={payModal.note}
                    onChange={(e) => setPayModal((p) => ({ ...p, note: e.target.value }))}
                    className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white focus:ring-2 focus:ring-amber-500 resize-none"
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setPayModal({ open: false, item: null, fullAmount: "", paidAmount: "", paymentType: "", note: "", loading: false, previousPayments: [] })}
                  className="flex-1 py-2.5 px-4 rounded-lg font-medium bg-slate-600 text-white hover:bg-slate-500"
                >
                  Cancel
                </button>
                {/* Show "Partially Done" button only if balance will remain after payment */}
                {isPartial && (
                  <button
                    disabled={!canSubmit || !isPartial}
                    onClick={() => handlePay("partially_done")}
                    className="flex-1 py-2.5 px-4 rounded-lg font-semibold bg-amber-500/80 text-slate-900 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    {payModal.loading ? "..." : "Partially Done"}
                  </button>
                )}
                {/* Show "Done" button when payment completes the full amount */}
                {isDone && (
                  <button
                    disabled={!canSubmit || !isDone}
                    onClick={() => handlePay("done")}
                    className="flex-1 py-2.5 px-4 rounded-lg font-semibold bg-emerald-500 text-white hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    {payModal.loading ? "..." : "Done"}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
