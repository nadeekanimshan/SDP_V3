import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { UseAxios } from "../../hook/useAxios";

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

export default function AppoimentPayment() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [payments, setPayments] = useState<any[]>([]);

  const fetchPayments = async () => {
    try {
      const res = await UseAxios(`appointments/date/${date}`, "GET");
      let result: any[] = res.data ?? [];

      if (search.trim()) {
        result = result.filter((item: any) => {
          const fullName = `${item.user?.firstName ?? ""} ${item.user?.lastName ?? ""}`.toLowerCase();
          return fullName.includes(search.toLowerCase());
        });
      }

      if (statusFilter) {
        result = result.filter((item: any) => item.status?.toLowerCase() === statusFilter);
      }

      setPayments(result);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [date, search, statusFilter]);

  return (
    <div className="w-full py-6">
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="w-[200px] h-10 border border-slate-600 rounded-lg bg-slate-700/50 text-white px-3 focus:ring-2 focus:ring-amber-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 border border-slate-600 rounded-lg bg-slate-700/50 text-white px-3 focus:ring-2 focus:ring-amber-500"
        >
          <option value="">All Statuses</option>
          <option value="done">Done</option>
          <option value="partially_done">Partially Done</option>
        </select>
        <form className="flex-1 min-w-[200px]" onSubmit={(e) => e.preventDefault()}>
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
      </div>

      <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-700/50 text-slate-300">
              <tr>
                <th className="px-6 py-3">Client Name</th>
                <th className="px-6 py-3">Client Contact</th>
                <th className="px-6 py-3">Client Email</th>
                <th className="px-6 py-3">Appointment Date / Time</th>
                <th className="px-6 py-3">Payment Amount</th>
                <th className="px-6 py-3">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">No data found</td>
                </tr>
              ) : (
                payments.map((item) => (
                  <tr key={item.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-white">{item.user?.firstName} {item.user?.lastName}</td>
                    <td className="px-6 py-4 text-slate-300">{item.user?.contactNumber ?? "—"}</td>
                    <td className="px-6 py-4 text-slate-300">{item.user?.email ?? "—"}</td>
                    <td className="px-6 py-4 text-slate-300">
                      {item.paymentDate?.split("T")[0]}
                      {item.appointment?.time_in && item.appointment?.time_out
                        ? ` | ${item.appointment.time_in} – ${item.appointment.time_out}`
                        : ""}
                    </td>
                    <td className="px-6 py-4 text-white font-medium">LKR {item.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadge(item.status)}`}>
                        {getPaymentStatusLabel(item.status)}
                      </span>
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
