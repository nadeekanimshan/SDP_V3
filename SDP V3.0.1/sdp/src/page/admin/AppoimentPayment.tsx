import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { UseAxios } from "../../hook/useAxios";
import { AxiosError } from "axios";

export default function AppoimentPayment() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [search, setSearch] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [payments, setPayments] = useState<any[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [appointmentId, setAppointmentId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState("");
  const notify = () => toast(error);

  const fetchPayments = async () => {
    try {
      const res = await UseAxios(`appointments/date/${date}`, "GET");
      let result = res.data;

      if (search.trim() !== "") {
        result = result.filter((item: any) => {
          const fullName = `${item.user.firstName} ${item.user.lastName}`.toLowerCase();
          return fullName.includes(search.toLowerCase());
        });
      }

      setPayments(result);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [date, search]);

  const fetchAppointmentDetail = async (id: string) => {
    try {
      await UseAxios(`appointments/payment/${id}`, "GET");
      if (!id) return;
      const res = await UseAxios(`appointments/detail/${id}`, "GET");
      setSelectedPayment(res.data);
    } catch (error) {
      if(error instanceof AxiosError){
        if(error.response?.status === 409){
          setError("Allready paid");
          notify();
        } else {
          setError("Something went wrong");
          notify();
        }
      }
      setSelectedPayment(null);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchAppointmentDetail(appointmentId);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [appointmentId]);

  const handleSubmit = async () => {
    if (!selectedPayment || !amount || !paymentType) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const userId = localStorage.getItem("id"); // logged in user id
      const data = {
        user_id: Number(userId),
        amount: parseFloat(amount),
        note: note || null,
        status: "done",
        paymentMethod: paymentType,
        paymentType: "Appointment",
        appointment_id: selectedPayment.id,
      };

      await UseAxios("appointments/payment", "POST", data);
      setError("Payment successful!");
      setAppointmentId("");
      setSelectedPayment(null);
      setAmount("");
      setNote("");
      setPaymentType("");
      setCardNumber("");
      fetchPayments();
    } catch (err) {
      console.error("Payment submission failed", err);
      setError("Payment failed. Check console for details.");
      notify();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full py-6">
      <ToastContainer autoClose={5000} position="top-right" />
      <div className="flex-1">
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-[200px] h-10 border border-slate-600 rounded-lg bg-slate-700/50 text-white px-3 focus:ring-2 focus:ring-amber-500" />
          <form className="flex-1 min-w-[200px]" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="search" className="block w-full p-3 pl-10 text-sm text-white border border-slate-600 rounded-lg bg-slate-700/50 placeholder-slate-500 focus:ring-2 focus:ring-amber-500" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />
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
              <th className="px-6 py-3">Appointment Date/Time</th>
              <th className="px-6 py-3">Payment Amount</th>
              <th className="px-6 py-3">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-slate-500">No data found</td></tr>
            ) : (
              payments.map((item) => (
                <tr key={item.id} onClick={() => { setSelectedPayment(item); setAppointmentId(item.appointment_id?.toString() || ""); setAmount(item.amount || ""); }} className="cursor-pointer border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4 text-white">{item.user?.firstName} {item.user?.lastName}</td>
                  <td className="px-6 py-4 text-slate-300">{item.user?.contactNumber}</td>
                  <td className="px-6 py-4 text-slate-300">{item.user?.email}</td>
                  <td className="px-6 py-4 text-slate-300">{item.paymentDate?.split("T")[0]} | {item.appointment?.time_in} - {item.appointment?.time_out}</td>
                  <td className="px-6 py-4 text-slate-300">{item.amount}</td>
                  <td className="px-6 py-4 text-slate-300 capitalize">{item.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:w-80 shrink-0">
        <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Make Payment</h2>
          <div className="flex flex-col gap-4">
            <div><label className="block text-sm text-slate-400 mb-1">Appointment ID</label><input type="text" value={appointmentId} onChange={(e) => setAppointmentId(e.target.value)} className="w-full border border-slate-600 rounded-lg p-2 bg-slate-700/50 text-white" /></div>
            <p className="text-slate-300 text-sm">Customer: {selectedPayment ? `${selectedPayment.user?.firstName} ${selectedPayment.user?.lastName}` : "-"}</p>
            <p className="text-slate-300 text-sm">Contact: {selectedPayment?.user?.contactNumber || "-"}</p>
            <p className="text-slate-300 text-sm">Email: {selectedPayment?.user?.email || "-"}</p>
            <p className="text-slate-300 text-sm">Date/Time: {selectedPayment?.appointment?.date || "-"} | {selectedPayment?.time_in} - {selectedPayment?.time_out}</p>
            <div><label className="block text-sm text-slate-400 mb-1">Amount</label><input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-slate-600 rounded-lg p-2 bg-slate-700/50 text-white" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Payment Type</label><select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} className="w-full border border-slate-600 rounded-lg p-2 bg-slate-700/50 text-white"><option value="">-- Select --</option><option value="Cash">Cash</option><option value="Card">Card</option></select></div>
            {paymentType === "Card" && <div><label className="block text-sm text-slate-400 mb-1">Card Number</label><input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full border border-slate-600 rounded-lg p-2 bg-slate-700/50 text-white" /></div>}
            <div><label className="block text-sm text-slate-400 mb-1">Note</label><textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full border border-slate-600 rounded-lg p-2 bg-slate-700/50 text-white" /></div>
            <button onClick={handleSubmit} disabled={!selectedPayment || !amount || !paymentType} className="w-full py-2 px-4 bg-amber-500 text-slate-900 font-medium rounded-lg hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed">Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
