import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { UseAxios } from '../../hook/useAxios';

interface PaymentData {
  id: number;
  amount: string;
  status: string;
  paymentDate: string;
  class_student: {
    student: {
      firstName: string;
      lastName: string;
      contactNumber: string;
    };
    class: {
      name: string;
    };
  };
}

export default function ClassPayment() {
  const [payment, setPayment] = useState<"All" | "Done" | "Missing">("All");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<PaymentData[]>([]);

  const fetchData = async () => {
    try {
      const res = await UseAxios(`classes/installment/all/${payment}/${date}`, "GET");
      let result = res.data;

      // if "Missing" selected, filter by installments_Due_Date is today
      if (payment === "Missing") {
        const today = new Date(date);
        result = result.filter((item: any) => {
          const dueDate = new Date(item.installments_Due_Date);
          return dueDate.toDateString() === today.toDateString();
        });
      }

      // Apply search filtering by student name
      if (search.trim() !== "") {
        result = result.filter((item: any) => {
          const fullName = `${item.class_student.student.firstName} ${item.class_student.student.lastName}`.toLowerCase();
          return fullName.includes(search.toLowerCase());
        });
      }

      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [payment, date, search]);

  return (
    <div className="py-6">
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-[200px] h-10 border border-slate-600 rounded-lg bg-slate-700/50 text-white px-3 focus:ring-2 focus:ring-amber-500" />
        <select value={payment} onChange={(e) => setPayment(e.target.value as "All" | "Done" | "Missing")} className="w-[200px] h-10 border border-slate-600 rounded-lg bg-slate-700/50 text-white px-3 focus:ring-2 focus:ring-amber-500">
          <option value="All">All</option>
          <option value="Done">Payment Done</option>
          <option value="Missing">Missing Payment</option>
        </select>
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
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Student Contact</th>
              <th className="px-6 py-3">Class</th>
              <th className="px-6 py-3">Payment Date</th>
              <th className="px-6 py-3">Payment Amount</th>
              <th className="px-6 py-3">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">No data found.</td></tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 text-white">{item.class_student.student.firstName} {item.class_student.student.lastName}</td>
                  <td className="px-6 py-4 text-slate-300">{item.class_student.student.contactNumber}</td>
                  <td className="px-6 py-4 text-slate-300">{item.class_student.class.name}</td>
                  <td className="px-6 py-4 text-slate-300">{new Date(item.paymentDate).toLocaleDateString()}</td>
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
  );
}
