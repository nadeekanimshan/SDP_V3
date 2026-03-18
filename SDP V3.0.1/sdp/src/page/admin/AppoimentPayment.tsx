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
    <div className="flex flex-row gap-6 w-full py-6">
      <ToastContainer autoClose={5000} position="top-right" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4">
        <div className='flex flex-row gap-4 items-center justify-start mb-6'>
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className='w-[200px] h-[40px] border border-gray-400 rounded bg-gray-200 p-2' />
          <form className="w-md mx-2" onSubmit={(e) => e.preventDefault()}>
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
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <tr>
                <td colSpan={6} className="text-center py-4">No data found</td>
              </tr>
            ) : (
              payments.map((item) => (
                <tr key={item.id}
                  onClick={() => {
                    setSelectedPayment(item);
                    setAppointmentId(item.appointment_id.toString());
                    setAmount(item.amount);
                  }}
                  className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{item.user.firstName} {item.user.lastName}</td>
                  <td className="px-6 py-4">{item.user.contactNumber}</td>
                  <td className="px-6 py-4">{item.user.email}</td>
                  <td className="px-6 py-4">{item.paymentDate?.split("T")[0]} | {item.appointment?.time_in} - {item.appointment?.time_out}</td>
                  <td className="px-6 py-4">{item.amount}</td>
                  <td className="px-6 py-4 capitalize">{item.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 w-1/4 text-white">
        <h1 className="text-2xl font-bold">Make your payment</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label>Appointment ID</label>
            <input type="text" value={appointmentId} onChange={(e) => setAppointmentId(e.target.value)} className="border border-gray-400 rounded p-2 bg-gray-700" />

            <span>Customer Name: {selectedPayment ? `${selectedPayment.user.firstName} ${selectedPayment.user.lastName}` : "-"}</span>
            <span>Customer Contact: {selectedPayment?.user.contactNumber || "-"}</span>
            <span>Customer Email: {selectedPayment?.user.email || "-"}</span>
            <span>Appointment Date/Time: {selectedPayment?.appointment?.date || "-"} | {selectedPayment?.time_in} - {selectedPayment?.time_out}</span>
          </div>

          <div className="flex flex-col gap-2">
            <label>Amount</label>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="border border-gray-400 rounded p-2 bg-gray-700" />
          </div>

          <div className="flex flex-col gap-2">
            <label>Payment Type</label>
            <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} className="border border-gray-400 rounded p-2 bg-gray-700">
              <option value="">-- Select --</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>
          </div>

          {paymentType === "Card" && (
            <div className="flex flex-col gap-2">
              <label>Card Number</label>
              <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="border border-gray-400 rounded p-2 bg-gray-700" />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label>Note</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} className="border border-gray-400 rounded p-2 bg-gray-700" />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedPayment || !amount || !paymentType}
            className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
