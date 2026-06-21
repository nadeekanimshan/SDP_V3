import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import { UseAxios } from "../../hook/useAxios";
import { format } from "date-fns";

const getPaymentStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case "done":
      return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40";
    case "partially_done":
      return "bg-amber-500/20 text-amber-400 border border-amber-500/40";
    default:
      return "bg-slate-500/20 text-slate-400 border border-slate-500/40";
  }
};

const getPaymentStatusLabel = (status: string) => {
  switch (status?.toLowerCase()) {
    case "done": return "Done";
    case "partially_done": return "Partially Done";
    default: return status ?? "—";
  }
};

interface User {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
}

interface PaymentDetail {
  id: number;
  amount: string;
  paymentDate: string;
  paymentMethod: string;
  note: string | null;
  status: string;
  fullAmount: string | null;
}

export default function AppoimentPayment() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPayments, setUserPayments] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);
  const [paymentDetailModal, setPaymentDetailModal] = useState<{ open: boolean; appointment: any; payments: PaymentDetail[] }>({ open: false, appointment: null, payments: [] });

  // Fetch all users who have appointments
  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const res = await UseAxios("users", "GET");
      console.log("Users API response:", res);
      let allUsers: User[] = [];
      
      // Handle different response structures
      if (Array.isArray(res)) {
        allUsers = res;
      } else if (Array.isArray(res?.data)) {
        allUsers = res.data;
      } else if (res?.data && typeof res.data === 'object') {
        allUsers = Object.values(res.data);
      }
      
      console.log("All users:", allUsers);
      // Filter to only show users who have made appointments (typeId !== 1 means not admin)
      const clientUsers = allUsers.filter((u: any) => u.typeId !== 1);
      console.log("Client users (filtered):", clientUsers);
      setUsers(clientUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Fetch appointments and payments for selected user
  const fetchUserPayments = async (userId: number) => {
    setIsLoadingPayments(true);
    try {
      const res = await UseAxios(`appointments/user/${userId}`, "GET");
      let appointments: any[] = Array.isArray(res?.data) ? res.data : [];

      // Fetch payment status for each appointment
      const paymentsWithStatus = await Promise.all(
        appointments.map(async (apt) => {
          try {
            const payRes = await UseAxios(`appointments/payment/${apt.id}`, "GET");
            const payments: any[] = Array.isArray(payRes?.data) ? payRes.data : [];
            if (payments.length > 0) {
              const latestPayment = payments[payments.length - 1];
              return {
                ...apt,
                paymentAmount: payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0),
                paymentStatus: latestPayment.status,
                payments: payments,
              };
            }
            return { ...apt, paymentAmount: 0, paymentStatus: null, payments: [] };
          } catch {
            return { ...apt, paymentAmount: 0, paymentStatus: null, payments: [] };
          }
        })
      );

      setUserPayments(paymentsWithStatus);
    } catch (error) {
      console.error("Error fetching user payments:", error);
      setUserPayments([]);
    } finally {
      setIsLoadingPayments(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchUserPayments(selectedUser.id);
    }
  }, [selectedUser]);

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPayments = statusFilter
    ? userPayments.filter((p) => p.paymentStatus?.toLowerCase() === statusFilter)
    : userPayments;

  // User List View
  if (!selectedUser) {
    return (
      <div className="w-full py-6">
        <h2 className="text-2xl font-bold text-white mb-6">Select Client</h2>
        
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="search"
              className="block w-full p-3 pl-10 text-sm text-white border border-slate-600 rounded-lg bg-slate-700/50 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
              placeholder="Search by client name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
          {isLoadingUsers ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-lg">No clients found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-700/50 text-slate-300">
                  <tr>
                    <th className="px-6 py-3">Client Name</th>
                    <th className="px-6 py-3">Contact</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedUser(user)}
                    >
                      <td className="px-6 py-4 text-white font-medium">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-6 py-4 text-slate-300">{user.contactNumber ?? "—"}</td>
                      <td className="px-6 py-4 text-slate-300">{user.email ?? "—"}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUser(user);
                          }}
                          className="px-4 py-2 rounded-lg text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30 transition-colors"
                        >
                          View Payments
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // User Payments View
  return (
    <div className="w-full py-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => {
            setSelectedUser(null);
            setUserPayments([]);
            setStatusFilter("");
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 text-white hover:bg-slate-600/50 transition-colors"
        >
          <FaArrowLeft /> Back
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">
            {selectedUser.firstName} {selectedUser.lastName}
          </h2>
          <p className="text-slate-400 text-sm">
            {selectedUser.contactNumber} • {selectedUser.email}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 border border-slate-600 rounded-lg bg-slate-700/50 text-white px-3 focus:ring-2 focus:ring-amber-500"
        >
          <option value="">All Statuses</option>
          <option value="done">Done</option>
          <option value="partially_done">Partially Done</option>
          <option value="">No Payment</option>
        </select>
      </div>

      <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
        {isLoadingPayments ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <p className="text-lg">No appointments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-700/50 text-slate-300">
                <tr>
                  <th className="px-6 py-3">Appointment Date</th>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Total Paid</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Payments</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((item) => (
                  <tr 
                    key={item.id} 
                    className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer"
                    onClick={() => setPaymentDetailModal({ open: true, appointment: item, payments: item.payments || [] })}
                  >
                    <td className="px-6 py-4 text-white">
                      {item.appointment?.date
                        ? format(new Date(item.appointment.date + "T12:00:00"), "MMM d, yyyy")
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {item.time_in?.replace(".", ":")} – {item.time_out?.replace(".", ":")}
                    </td>
                    <td className="px-6 py-4 text-slate-300">{item.appointmentType ?? "Vocal Recording"}</td>
                    <td className="px-6 py-4 text-white font-medium">
                      {item.paymentAmount > 0 ? `LKR ${item.paymentAmount.toFixed(2)}` : "—"}
                    </td>
                    <td className="px-6 py-4">
                      {item.paymentStatus ? (
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadge(
                            item.paymentStatus
                          )}`}
                        >
                          {getPaymentStatusLabel(item.paymentStatus)}
                        </span>
                      ) : (
                        <span className="text-slate-500">No payment</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPaymentDetailModal({ open: true, appointment: item, payments: item.payments || [] });
                        }}
                        className="text-amber-400 hover:text-amber-300 text-sm font-medium underline underline-offset-2"
                      >
                        {item.payments?.length > 0 ? `${item.payments.length} payment(s)` : "No payments"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Detail Modal */}
      {paymentDetailModal.open && paymentDetailModal.appointment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Payment History</h3>

            {/* Appointment Info */}
            <div className="bg-slate-700/40 rounded-xl border border-slate-600/50 p-4 mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Appointment Date</span>
                <span className="text-white font-medium">
                  {paymentDetailModal.appointment.appointment?.date
                    ? format(new Date(paymentDetailModal.appointment.appointment.date + "T12:00:00"), "MMMM d, yyyy")
                    : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Time</span>
                <span className="text-white">
                  {paymentDetailModal.appointment.time_in?.replace(".", ":")} – {paymentDetailModal.appointment.time_out?.replace(".", ":")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Type</span>
                <span className="text-white">{paymentDetailModal.appointment.appointmentType ?? "Vocal Recording"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status</span>
                <span className="text-white">
                  {paymentDetailModal.appointment.status ? (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadge(
                        paymentDetailModal.appointment.status
                      )}`}
                    >
                      {paymentDetailModal.appointment.status}
                    </span>
                  ) : "—"}
                </span>
              </div>
            </div>

            {/* Payment History */}
            {paymentDetailModal.payments.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p className="text-lg">No payments made yet</p>
              </div>
            ) : (
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Payment Transactions</h4>
                <div className="space-y-3">
                  {paymentDetailModal.payments.map((payment, idx) => (
                    <div
                      key={payment.id}
                      className="bg-slate-700/30 rounded-lg border border-slate-600/50 p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs text-slate-400">Payment #{idx + 1}</span>
                          <p className="text-white font-semibold text-lg">LKR {parseFloat(payment.amount).toFixed(2)}</p>
                        </div>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadge(
                            payment.status
                          )}`}
                        >
                          {getPaymentStatusLabel(payment.status)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-slate-400">Date:</span>
                          <span className="text-white ml-2">
                            {format(new Date(payment.paymentDate), "MMM d, yyyy 'at' h:mm a")}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Method:</span>
                          <span className="text-white ml-2">{payment.paymentMethod}</span>
                        </div>
                        {payment.fullAmount && (
                          <div>
                            <span className="text-slate-400">Full Amount:</span>
                            <span className="text-white ml-2">LKR {parseFloat(payment.fullAmount).toFixed(2)}</span>
                          </div>
                        )}
                        {payment.note && (
                          <div className="col-span-2">
                            <span className="text-slate-400">Note:</span>
                            <span className="text-white ml-2">{payment.note}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-400 font-semibold">Total Paid</span>
                    <span className="text-emerald-400 font-bold text-xl">
                      LKR {paymentDetailModal.payments.reduce((sum, p) => sum + parseFloat(p.amount), 0).toFixed(2)}
                    </span>
                  </div>
                  {paymentDetailModal.payments[0]?.fullAmount && (
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-emerald-500/20">
                      <span className="text-slate-300 text-sm">
                        {paymentDetailModal.appointment.paymentStatus === "done" ? "Fully Paid" : "Remaining Balance"}
                      </span>
                      <span className="text-white font-semibold">
                        LKR {(
                          parseFloat(paymentDetailModal.payments[0].fullAmount) -
                          paymentDetailModal.payments.reduce((sum, p) => sum + parseFloat(p.amount), 0)
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={() => setPaymentDetailModal({ open: false, appointment: null, payments: [] })}
              className="mt-6 w-full py-3 px-4 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
