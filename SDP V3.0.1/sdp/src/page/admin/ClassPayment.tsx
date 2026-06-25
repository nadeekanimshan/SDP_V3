import { useEffect, useState } from 'react';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import { UseAxios } from '../../hook/useAxios';
import { format } from 'date-fns';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
}

interface PaymentData {
  id: number;
  amount: string;
  status: string;
  paymentDate: string;
  installments_Due_Date: string;
  class_student: {
    student: {
      firstName: string;
      lastName: string;
      contactNumber: string;
    };
    class: { name: string };
  };
}

export default function ClassPayment() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [studentPage, setStudentPage] = useState(1);

  // Filters for detail view
  const [payment, setPayment] = useState<"All" | "Done" | "Missing">("All");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [showAll, setShowAll] = useState(false);
  const [detailSearch, setDetailSearch] = useState("");
  const [data, setData] = useState<PaymentData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [detailPage, setDetailPage] = useState(1);
  const PAGE_SIZE = 20;

  // Fetch students
  const fetchStudents = async () => {
    setIsLoadingStudents(true);
    try {
      const res = await UseAxios("users", "GET");
      let all: Student[] = Array.isArray(res?.data) ? res.data : [];
      all = all.filter((u: any) => u.typeId !== 1);
      setStudents(all);
    } catch (e) {
      console.error(e);
      setStudents([]);
    } finally {
      setIsLoadingStudents(false);
    }
  };

  // Fetch payments for selected student
  const fetchData = async (studentId: number) => {
    setIsLoadingData(true);
    try {
      const dateParam = showAll ? "all" : date;
      const res = await UseAxios(`classes/installment/all/${payment}/${dateParam}`, "GET");
      let result: PaymentData[] = Array.isArray(res?.data) ? res.data : [];

      // Filter by this student
      result = result.filter((item) => {
        const name = `${item.class_student.student.firstName} ${item.class_student.student.lastName}`.toLowerCase();
        const selName = `${selectedStudent?.firstName ?? ""} ${selectedStudent?.lastName ?? ""}`.toLowerCase();
        return name === selName;
      });

      if (payment === "Missing" && !showAll) {
        const selected = new Date(date);
        result = result.filter((item) => {
          const dueDate = new Date(item.installments_Due_Date);
          return dueDate.getFullYear() === selected.getFullYear() &&
                 dueDate.getMonth() === selected.getMonth();
        });
      }

      if (detailSearch.trim()) {
        result = result.filter((item) =>
          item.class_student.class.name.toLowerCase().includes(detailSearch.toLowerCase())
        );
      }

      setData(result);
    } catch (e) {
      console.error(e);
      setData([]);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);
  useEffect(() => { setStudentPage(1); }, [search]);

  useEffect(() => {
    if (selectedStudent) fetchData(selectedStudent.id);
  }, [selectedStudent, payment, date, showAll, detailSearch]);
  useEffect(() => { setDetailPage(1); }, [selectedStudent, payment, date, showAll, detailSearch]);

  const filteredStudents = students.filter((s) =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalStudentPages = Math.ceil(filteredStudents.length / PAGE_SIZE);
  const pagedStudents = filteredStudents.slice((studentPage - 1) * PAGE_SIZE, studentPage * PAGE_SIZE);

  const totalDetailPages = Math.ceil(data.length / PAGE_SIZE);
  const pagedData = data.slice((detailPage - 1) * PAGE_SIZE, detailPage * PAGE_SIZE);

  const Pagination = ({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) => {
    if (total <= 1) return null;
    return (
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700/50">
        <span className="text-sm text-slate-400">Page {page} of {total}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-700/50 text-white hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Previous
          </button>
          {Array.from({ length: total }, (_, i) => i + 1).map((p) => {
            if (p === 1 || p === total || (p >= page - 1 && p <= page + 1)) {
              return (
                <button key={p} onClick={() => onChange(p)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${p === page ? "bg-amber-500 text-slate-900" : "bg-slate-700/50 text-white hover:bg-slate-600/50"}`}>
                  {p}
                </button>
              );
            } else if (p === page - 2 || p === page + 2) {
              return <span key={p} className="px-2 text-slate-500">...</span>;
            }
            return null;
          })}
          <button onClick={() => onChange(Math.min(total, page + 1))} disabled={page === total}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-700/50 text-white hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Next
          </button>
        </div>
      </div>
    );
  };

  // ── Student List View ──
  if (!selectedStudent) {
    return (
      <div className="py-6">
        <h2 className="text-2xl font-bold text-white mb-6">Select Student</h2>
        <div className="mb-6 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="search"
            className="block w-full p-3 pl-10 text-sm text-white border border-slate-600 rounded-lg bg-slate-700/50 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
            placeholder="Search by student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
          {isLoadingStudents ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500" />
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-24 text-slate-400">No students found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-700/50 text-slate-300">
                  <tr>
                    <th className="px-6 py-3">Student Name</th>
                    <th className="px-6 py-3">Contact</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedStudents.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedStudent(s)}
                    >
                      <td className="px-6 py-4 text-white font-medium">{s.firstName} {s.lastName}</td>
                      <td className="px-6 py-4 text-slate-300">{s.contactNumber ?? "—"}</td>
                      <td className="px-6 py-4 text-slate-300">{s.email ?? "—"}</td>
                      <td className="px-6 py-4">
                        <button
                          className="px-4 py-2 rounded-lg text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30 transition-colors"
                          onClick={(e) => { e.stopPropagation(); setSelectedStudent(s); }}
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
          <Pagination page={studentPage} total={totalStudentPages} onChange={setStudentPage} />
        </div>
      </div>
    );
  }

  // ── Student Payment Detail View ──
  return (
    <div className="py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => { setSelectedStudent(null); setData([]); setDetailSearch(""); setShowAll(false); setPayment("All"); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 text-white hover:bg-slate-600/50 transition-colors"
        >
          <FaArrowLeft /> Back
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">{selectedStudent.firstName} {selectedStudent.lastName}</h2>
          <p className="text-slate-400 text-sm">{selectedStudent.contactNumber} • {selectedStudent.email}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showAll ? "bg-amber-500" : "bg-slate-600"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showAll ? "translate-x-6" : "translate-x-1"}`} />
          </button>
          <span className="text-sm text-slate-400">
            {showAll ? <span className="text-amber-400 font-medium">All Payments</span> : "By Month"}
          </span>
        </div>

        {!showAll && (
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="w-[200px] h-10 border border-slate-600 rounded-lg bg-slate-700/50 text-white px-3 focus:ring-2 focus:ring-amber-500"
          />
        )}

        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value as "All" | "Done" | "Missing")}
          className="h-10 border border-slate-600 rounded-lg bg-slate-700/50 text-white px-3 focus:ring-2 focus:ring-amber-500"
        >
          <option value="All">All</option>
          <option value="Done">Done</option>
          <option value="Missing">Missing</option>
        </select>

        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="search"
            className="block w-full p-3 pl-10 text-sm text-white border border-slate-600 rounded-lg bg-slate-700/50 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
            placeholder="Search by class name..."
            value={detailSearch}
            onChange={(e) => setDetailSearch(e.target.value)}
          />
        </div>
      </div>

      <p className="text-sm text-slate-400 mb-3">
        Showing <span className="text-white font-medium">{data.length}</span> record(s)
        {showAll ? " (all time)" : ` for ${format(new Date(date), "MMMM yyyy")}`}
      </p>

      <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
        {isLoadingData ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-700/50 text-slate-300">
                <tr>
                  <th className="px-6 py-3">Class</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3">Payment Date</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">No payments found.</td></tr>
                ) : (
                  pagedData.map((item) => (
                    <tr key={item.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{item.class_student.class.name}</td>
                      <td className="px-6 py-4 text-slate-300">{format(new Date(item.installments_Due_Date), "MMM d, yyyy")}</td>
                      <td className="px-6 py-4 text-slate-300">
                        {item.paymentDate ? format(new Date(item.paymentDate), "MMM d, yyyy") : "—"}
                      </td>
                      <td className="px-6 py-4 text-white font-medium">LKR {item.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                          item.status?.toLowerCase() === "done"
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                            : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                        }`}>
                          {item.status?.toLowerCase() === "done" ? "Done" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={detailPage} total={totalDetailPages} onChange={setDetailPage} />
      </div>
    </div>
  );
}
