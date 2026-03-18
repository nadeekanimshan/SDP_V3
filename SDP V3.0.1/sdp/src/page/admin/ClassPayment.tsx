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
    <div className='py-6'>
      <div className='flex flex-row gap-4 items-center justify-start mb-6'>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className='w-[200px] h-[40px] border border-gray-400 rounded bg-gray-200 p-2'
        />
        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value as "All" | "Done" | "Missing")}
          className='w-[200px] h-[40px] border border-gray-400 rounded bg-gray-200 p-2'
        >
          <option value="All">All</option>
          <option value="Done">Payment Done</option>
          <option value="Missing">Missing Payment</option>
        </select>

        {/* Search Bar */}
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

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  No data found.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    {item.class_student.student.firstName} {item.class_student.student.lastName}
                  </td>
                  <td className="px-6 py-4">{item.class_student.student.contactNumber}</td>
                  <td className="px-6 py-4">{item.class_student.class.name}</td>
                  <td className="px-6 py-4">{new Date(item.paymentDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{item.amount}</td>
                  <td className="px-6 py-4 capitalize">{item.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
