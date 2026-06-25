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

interface EnrolledClass {
  classStudentId: number;
  classId: number;
  className: string;
  totalInstallments: number;
  paidCount: number;
  pendingCount: number;
  totalPaid: number;
  installments: Installment[];
}

interface Installment {
  id: number;
  amount: string;
  status: string;
  paymentDate: string;
  paymentMethod: string;
  installments_Due_Date: string;
}

const PAGE_SIZE = 20;

const Pagination = ({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) => {
  if (total <= 1) return null;
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700/50">
      <span className="text-sm text-slate-400">Page {page} of {total}</span>
      <div className="flex items-center gap-2">
        <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}
          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-700/50 text-white hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed">
          Previous
        </button>
        {Array.from({ length: total }, (_, i) => i + 1).map((p) => {
          if (p === 1 || p === total || (p >= page - 1 && p <= page + 1)) {
            return (
              <button key={p} onClick={() => onChange(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${p === page ? "bg-amber-500 text-slate-900" : "bg-slate-700/50 text-white hover:bg-slate-600/50"}`}>
                {p}
              </button>
            );
          } else if (p === page - 2 || p === page + 2) {
            return <span key={p} className="px-2 text-slate-500">...</span>;
          }
          return null;
        })}
        <button onClick={() => onChange(Math.min(total, page + 1))} disabled={page === total}
          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-700/50 text-white hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </div>
  );
};

export default function ClassPayment() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [enrolledClasses, setEnrolledClasses] = useState<EnrolledClass[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [isLoadingClasses, setIsLoadingClasses] = useState(false);
  const [studentPage, setStudentPage] = useState(1);
  const [classPage, setClassPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [detailModal, setDetailModal] = useState<{ open: boolean; cls: EnrolledClass | null }>({ open: false, cls: null });

  // Fetch only enrolled students
  const fetchStudents = async () => {
    setIsLoadingStudents(true);
    try {
      const res = await UseAxios("classes/installment/all/All/all", "GET");
      const installments: any[] = Array.isArray(res?.data) ? res.data : [];
      const studentMap = new Map<number, Student>();
      installments.forEach((item: any) => {
        const s = item.class_student?.student;
        if (s && !studentMap.has(s.id)) {
          studentMap.set(s.id, { id: s.id, firstName: s.firstName, lastName: s.lastName, contactNumber: s.contactNumber, email: s.email });
        }
      });
      setStudents(Array.from(studentMap.values()));
    } catch (e) {
      console.error(e);
      setStudents([]);
    } finally {
      setIsLoadingStudents(false);
    }
  };

  // Fetch enrolled classes for selected student
  const fetchEnrolledClasses = async (student: Student) => {
    setIsLoadingClasses(true);
    try {
      const res = await UseAxios("classes/installment/all/All/all", "GET");
      const allInstallments: any[] = Array.isArray(res?.data) ? res.data : [];

      // Filter by this student
      const studentInstallments = allInstallments.filter((item: any) => {
        const s = item.class_student?.student;
        return s && `${s.firstName} ${s.lastName}`.toLowerCase() === `${student.firstName} ${student.lastName}`.toLowerCase();
      });

      // Group by class_student_id
      const classMap = new Map<number, EnrolledClass>();
      studentInstallments.forEach((item: any) => {
        const csId = item.class_student?.id;
        const cls = item.class_student?.class;
        if (!csId || !cls) return;

        if (!classMap.has(csId)) {
          classMap.set(csId, {
            classStudentId: csId,
            classId: cls.id,
            className: cls.name,
            totalInstallments: 0,
            paidCount: 0,
            pendingCount: 0,
            totalPaid: 0,
            installments: [],
          });
        }

        const entry = classMap.get(csId)!;
        entry.totalInstallments++;
        entry.installments.push({
          id: item.id,
          amount: item.amount,
          status: item.status,
          paymentDate: item.paymentDate,
          paymentMethod: item.paymentMethod,
          installments_Due_Date: item.installments_Due_Date,
        });

        if (item.status?.toLowerCase() === "done") {
          entry.paidCount++;
          entry.totalPaid += parseFloat(item.amount) || 0;
        } else {
          entry.pendingCount++;
        }
      });

      setEnrolledClasses(Array.from(classMap.values()));
    } catch (e) {
      console.error(e);
      setEnrolledClasses([]);
    } finally {
      setIsLoadingClasses(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);
  useEffect(() => { setStudentPage(1); }, [search]);
  useEffect(() => {
    if (selectedStudent) fetchEnrolledClasses(selectedStudent);
  }, [selectedStudent]);

  const filteredStudents = students.filter((s) =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase())
  );
  const pagedStudents = filteredStudents.slice((studentPage - 1) * PAGE_SIZE, studentPage * PAGE_SIZE);
  const totalStudentPages = Math.ceil(filteredStudents.length / PAGE_SIZE);

  const filteredClasses = statusFilter === "paid"
    ? enrolledClasses.filter(c => c.pendingCount === 0)
    : statusFilter === "pending"
    ? enrolledClasses.filter(c => c.pendingCount > 0 && c.paidCount === 0)
    : statusFilter === "partial"
    ? enrolledClasses.filter(c => c.pendingCount > 0 && c.paidCount > 0)
    : enrolledClasses;
  const pagedClasses = filteredClasses.slice((classPage - 1) * PAGE_SIZE, classPage * PAGE_SIZE);
  const totalClassPages = Math.ceil(filteredClasses.length / PAGE_SIZE);

  // ── Level 1: Student List ──
  if (!selectedStudent) {
    return (
      <div className="py-6">
        <h2 className="text-2xl font-bold text-white mb-6">Select Student</h2>
        <div className="mb-6 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input type="search"
            className="block w-full p-3 pl-10 text-sm text-white border border-slate-600 rounded-lg bg-slate-700/50 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
            placeholder="Search by student name..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
          {isLoadingStudents ? (
            <div className="flex justify-center items-center py-24"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500" /></div>
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
                    <tr key={s.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer" onClick={() => setSelectedStudent(s)}>
                      <td className="px-6 py-4 text-white font-medium">{s.firstName} {s.lastName}</td>
                      <td className="px-6 py-4 text-slate-300">{s.contactNumber ?? "—"}</td>
                      <td className="px-6 py-4 text-slate-300">{s.email ?? "—"}</td>
                      <td className="px-6 py-4">
                        <button className="px-4 py-2 rounded-lg text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30 transition-colors"
                          onClick={(e) => { e.stopPropagation(); setSelectedStudent(s); }}>
                          View Classes
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

  // ── Level 2: Enrolled Classes ──
  return (
    <div className="py-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => { setSelectedStudent(null); setEnrolledClasses([]); setStatusFilter(""); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 text-white hover:bg-slate-600/50 transition-colors">
          <FaArrowLeft /> Back
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">{selectedStudent.firstName} {selectedStudent.lastName}</h2>
          <p className="text-slate-400 text-sm">{selectedStudent.contactNumber} • {selectedStudent.email}</p>
        </div>
      </div>

      <div className="flex gap-4 items-center mb-4">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 border border-slate-600 rounded-lg bg-slate-700/50 text-white px-3 focus:ring-2 focus:ring-amber-500">
          <option value="">All Statuses</option>
          <option value="paid">Fully Paid</option>
          <option value="partial">Partially Paid</option>
          <option value="pending">No Payment</option>
        </select>
      </div>

      <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
        {isLoadingClasses ? (
          <div className="flex justify-center items-center py-24"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500" /></div>
        ) : filteredClasses.length === 0 ? (
          <div className="text-center py-24 text-slate-400">No enrolled classes found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-700/50 text-slate-300">
                <tr>
                  <th className="px-6 py-3">Class</th>
                  <th className="px-6 py-3">Total Installments</th>
                  <th className="px-6 py-3">Paid</th>
                  <th className="px-6 py-3">Pending</th>
                  <th className="px-6 py-3">Total Paid</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {pagedClasses.map((cls) => {
                  const isFullyPaid = cls.pendingCount === 0;
                  const isNoPay = cls.paidCount === 0;
                  return (
                    <tr key={cls.classStudentId} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer"
                      onClick={() => setDetailModal({ open: true, cls })}>
                      <td className="px-6 py-4 text-white font-medium">{cls.className}</td>
                      <td className="px-6 py-4 text-slate-300 text-center">{cls.totalInstallments}</td>
                      <td className="px-6 py-4 text-emerald-400 text-center">{cls.paidCount}</td>
                      <td className="px-6 py-4 text-amber-400 text-center">{cls.pendingCount}</td>
                      <td className="px-6 py-4 text-white font-medium">LKR {cls.totalPaid.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                          isFullyPaid ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                          : isNoPay ? "bg-slate-500/20 text-slate-400 border-slate-500/40"
                          : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                        }`}>
                          {isFullyPaid ? "Fully Paid" : isNoPay ? "No Payment" : "Partial"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-amber-400 hover:text-amber-300 text-sm font-medium underline underline-offset-2"
                          onClick={(e) => { e.stopPropagation(); setDetailModal({ open: true, cls }); }}>
                          {cls.totalInstallments} installment(s)
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={classPage} total={totalClassPages} onChange={setClassPage} />
      </div>

      {/* ── Level 3: Installment Detail Modal ── */}
      {detailModal.open && detailModal.cls && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-2">{detailModal.cls.className}</h3>
            <p className="text-slate-400 text-sm mb-4">
              {selectedStudent.firstName} {selectedStudent.lastName} •
              {detailModal.cls.paidCount}/{detailModal.cls.totalInstallments} paid •
              LKR {detailModal.cls.totalPaid.toFixed(2)} total paid
            </p>

            <div className="space-y-3">
              {detailModal.cls.installments
                .sort((a, b) => new Date(a.installments_Due_Date).getTime() - new Date(b.installments_Due_Date).getTime())
                .map((inst, idx) => {
                  const isPaid = inst.status?.toLowerCase() === "done";
                  return (
                    <div key={inst.id} className="bg-slate-700/30 rounded-lg border border-slate-600/50 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs text-slate-400">Installment #{idx + 1}</span>
                          <p className="text-white font-semibold text-lg">LKR {parseFloat(inst.amount).toFixed(2)}</p>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                          isPaid ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                        }`}>
                          {isPaid ? "Paid" : "Pending"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-slate-400">Due:</span>
                          <span className="text-white ml-2">{format(new Date(inst.installments_Due_Date), "MMM yyyy")}</span>
                        </div>
                        {isPaid && inst.paymentDate && (
                          <>
                            <div>
                              <span className="text-slate-400">Paid At:</span>
                              <span className="text-white ml-2">{format(new Date(inst.paymentDate), "MMM d, yyyy h:mm a")}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">Method:</span>
                              <span className="text-white ml-2">{inst.paymentMethod}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="mt-4 bg-slate-700/30 rounded-lg p-4 flex justify-between items-center">
              <span className="text-slate-300 font-semibold">Total Paid</span>
              <span className="text-emerald-400 font-bold text-xl">LKR {detailModal.cls.totalPaid.toFixed(2)}</span>
            </div>

            <button onClick={() => setDetailModal({ open: false, cls: null })}
              className="mt-6 w-full py-3 px-4 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-500 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
