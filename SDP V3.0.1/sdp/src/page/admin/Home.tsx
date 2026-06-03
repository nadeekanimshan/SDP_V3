import { format } from "date-fns";
import { FaBook, FaCalendarAlt, FaMoneyBill, FaUserClock, FaDownload, FaUsers, FaCreditCard, FaClock, FaCog, FaBolt } from "react-icons/fa";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { UseAxios } from "../../hook/useAxios";
import { SYSTEM_KEY } from "../../config/Constent";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
}

interface AppointmentDetail {
  id: number;
  appointment_id: number;
  time_in: string;
  time_out: string;
  note: string;
  user_id: number;
  status: string;
  cancelRequested?: boolean;
  user: User;
}

interface AppointmentResponse {
  appointment: { id: number; date: string; status: string; note: string };
  details: AppointmentDetail[];
}

const displayTime = (t: string) => t.replace(".", ":");

interface HomeProps {
  onNavigate?: (page: string) => void;
}

const QUICK_ACCESS_LINKS = [
  { id: "appointment", label: "Appointments", icon: FaCalendarAlt },
  { id: "events", label: "Events", icon: FaCalendarAlt },
  { id: "users", label: "Users", icon: FaUsers },
  { id: "payment", label: "Payment", icon: FaCreditCard },
  { id: "classes", label: "Classes", icon: FaBook },
  { id: "attendance", label: "Attendance", icon: FaUserClock },
  { id: "slots", label: "Slot Hours", icon: FaClock },
  { id: "profile", label: "Profile", icon: FaCog },
];

export default function Home({ onNavigate }: HomeProps) {
  const [appointment, setAppointment] = useState<AppointmentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    todayEvents: 0,
    upcomingEvents: 0,
    todayAppointments: 0,
    upcomingAppointments: "",
    todayClasses: 0,
    todayRevenue: 0,
    monthlyRevenue: 0,
  });
  const [showReportDropdown, setShowReportDropdown] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const monthsList = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [appRes, todayEv, upcomingEv, todayApp, upcomingApp, todayClass, todayRev, monthlyRev] = await Promise.all([
        UseAxios(`appointments/all/${format(new Date(), "yyyy-MM-dd")}`, "GET"),
        UseAxios("events/today", "GET"),
        UseAxios("events/upcoming", "GET"),
        UseAxios("appointments/today", "GET"),
        UseAxios("appointments/upcoming", "GET"),
        UseAxios("classes/today", "GET"),
        UseAxios("admin/revenue/today", "GET"),
        UseAxios("admin/revenue/monthly", "GET"),
      ]);
      setAppointment(appRes?.data ?? null);
      setStats({
        todayEvents: todayEv?.data ?? 0,
        upcomingEvents: upcomingEv?.data ?? 0,
        todayAppointments: todayApp?.data ?? 0,
        upcomingAppointments: typeof upcomingApp?.data === "string" ? upcomingApp.data : "",
        todayClasses: todayClass?.data ?? 0,
        todayRevenue: todayRev?.data ?? 0,
        monthlyRevenue: monthlyRev?.data ?? 0,
      });
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownloadReport = async () => {
    if (selectedMonths.length === 0) {
      alert("Please select at least one month");
      return;
    }
    
    try {
      console.log("Fetching report for months:", selectedMonths);
      
      // Build query parameters with array format expected by backend
      const params = new URLSearchParams();
      selectedMonths.forEach(month => {
        params.append('months[]', month);
      });
      
      const res = await UseAxios(`users/student/registerdThisMonth?${params.toString()}`, "GET");
      const students = res?.data ?? [];
      
      console.log("Report data received:", students);
      console.log("Number of students:", students.length);
      
      if (students.length === 0) {
        alert("No student data found for the selected month(s)");
        setShowReportDropdown(false);
        return;
      }
      
      const doc = new jsPDF();
      const now = new Date();
      
      // Header
      doc.setFontSize(18);
      doc.text("SDP Student Report", 14, 20);
      doc.setFontSize(12);
      doc.text(`Generated: ${format(now, "yyyy-MM-dd")} for ${selectedMonths.join(", ")}`, 14, 28);
      
      // Process table data
      const tableData = students.map((entry: any) => {
        const student = entry.student ?? entry ?? {};
        const classInfo = entry.class ?? {};
        const paymentDetails = (entry.class_installments ?? [])
          .map((p: any, i: number) => `${i + 1}. ${p.status} - Rs.${p.amount}`)
          .join("\n");
        
        return [
          `${student.firstName ?? "-"} ${student.lastName ?? ""}`.trim() || "-",
          student.contactNumber ?? "-",
          `${student.address ?? ""}, ${student.city ?? ""}`.trim() || "-",
          entry.createdAt ? format(new Date(entry.createdAt), "yyyy-MM-dd") : "-",
          classInfo.name ?? "-",
          paymentDetails || "-",
        ];
      });
      
      console.log("Table data prepared:", tableData);
      
      // Generate table
      autoTable(doc, {
        startY: 35,
        head: [["Student Name", "Contact", "Address", "Join Date", "Class", "Payments"]],
        body: tableData,
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [30, 58, 138] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });
      
      // Save PDF
      const filename = `SDP-report-${format(now, "yyyy-MM-dd-HHmm")}.pdf`;
      doc.save(filename);
      console.log("PDF saved:", filename);
      
      // Reset state
      setSelectedMonths([]);
      setShowReportDropdown(false);
      
    } catch (err) {
      console.error("Report error:", err);
      alert("Failed to generate report. Check console for details.");
    }
  };

  const firstName = localStorage.getItem(SYSTEM_KEY.FIRST_NAME) ?? "";
  const lastName = localStorage.getItem(SYSTEM_KEY.LAST_NAME) ?? "";

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Quick Access */}
        {onNavigate && (
          <div className="mb-6 p-6 rounded-2xl backdrop-blur-sm bg-slate-800/50 border border-slate-700/50">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FaBolt className="text-amber-400" /> Quick Access
            </h2>
            <div className="flex flex-wrap gap-3">
              {QUICK_ACCESS_LINKS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600/50 text-slate-200 hover:bg-amber-500/20 hover:border-amber-500/40 hover:text-amber-400 transition-all font-medium"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8 p-6 rounded-2xl backdrop-blur-sm bg-slate-800/50 border border-slate-700/50">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome, {firstName} {lastName}
              </h1>
              <p className="text-slate-400 mt-1">Audio Diary Studio Dashboard</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-amber-400">{format(new Date(), "yyyy")}</p>
              <p className="text-xl text-slate-300">{format(new Date(), "EEEE, MMM d")}</p>
              <p className="text-sm text-slate-500">{format(new Date(), "h:mm a")}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
              <StatCard icon={<FaCalendarAlt />} label="Today's Events" value={stats.todayEvents} color="blue" />
              <StatCard icon={<FaCalendarAlt />} label="Upcoming Events" value={stats.upcomingEvents} color="blue" />
              <StatCard icon={<FaUserClock />} label="Today's Appointments" value={stats.todayAppointments} color="emerald" />
              <StatCard icon={<FaUserClock />} label="Upcoming" value={stats.upcomingAppointments || "-"} color="emerald" />
              <StatCard icon={<FaBook />} label="Today's Classes" value={stats.todayClasses} color="amber" />
              <StatCard icon={<FaMoneyBill />} label="Today's Revenue" value={`LKR ${stats.todayRevenue}`} color="violet" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 p-6 rounded-2xl backdrop-blur-sm bg-slate-800/50 border border-slate-700/50">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FaMoneyBill className="text-amber-400" /> Monthly Revenue
                </h2>
                <p className="text-4xl font-bold text-amber-400">LKR {stats.monthlyRevenue}</p>
              </div>
              <div className="relative p-6 rounded-2xl backdrop-blur-sm bg-slate-800/50 border border-slate-700/50">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FaDownload className="text-emerald-400" /> Student Report
                </h2>
                <button
                  onClick={() => setShowReportDropdown(!showReportDropdown)}
                  className="w-full py-2 px-4 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 font-medium"
                >
                  Select Month(s) & Download
                </button>
                
                {/* Selected months display */}
                {selectedMonths.length > 0 && (
                  <div className="mt-3 p-2 bg-slate-700/50 rounded-lg">
                    <p className="text-xs text-slate-400 mb-1">Selected:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedMonths.map(m => (
                        <span key={m} className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-xs">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {showReportDropdown && (
                  <>
                    {/* Backdrop overlay */}
                    <div 
                      className="fixed inset-0 bg-black/20 z-[9999998]"
                      onClick={() => setShowReportDropdown(false)}
                    />
                    {/* Dropdown positioned above the button (opens upward) */}
                    <div className="absolute bottom-full mb-2 left-0 right-0 p-4 rounded-xl bg-slate-800 border border-slate-600 shadow-2xl z-[9999999] max-h-96 overflow-y-auto">
                      <p className="text-white font-medium mb-3">Select Months:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {monthsList.map((m) => (
                          <label key={m} className="flex items-center gap-2 text-slate-200 cursor-pointer py-1.5 px-2 hover:bg-slate-700/50 rounded transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedMonths.includes(m)}
                              onChange={() =>
                                setSelectedMonths((p) =>
                                  p.includes(m) ? p.filter((x) => x !== m) : [...p, m]
                                )
                              }
                              className="w-4 h-4 accent-emerald-500"
                            />
                            <span className="text-sm">{m}</span>
                          </label>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-600">
                        <button
                          onClick={() => setShowReportDropdown(false)}
                          className="flex-1 py-2 rounded-lg bg-slate-600 text-white hover:bg-slate-500 font-medium transition-colors"
                        >
                          Close
                        </button>
                        <button
                          onClick={handleDownloadReport}
                          disabled={selectedMonths.length === 0}
                          className="flex-1 py-2 rounded-lg bg-emerald-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors"
                        >
                          Download ({selectedMonths.length})
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Today's Appointments */}
            <div className="rounded-2xl backdrop-blur-sm bg-slate-800/50 border border-slate-700/50 overflow-hidden">
              <h2 className="text-xl font-bold text-white p-6 border-b border-slate-700/50">
                Today&apos;s Appointments
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-slate-700/50 text-slate-300">
                    <tr>
                      <th className="px-6 py-4">Time</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointment?.details?.map((d) => (
                      <tr key={d.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                        <td className="px-6 py-4 text-white">
                          {displayTime(d.time_in)} – {displayTime(d.time_out)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${
                            d.cancelRequested
                              ? "bg-orange-500/20 text-orange-400 border-orange-500/40"
                              : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                          }`}>
                            {d.cancelRequested ? "Cancel requested" : d.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white">
                          {d.user?.firstName} {d.user?.lastName}
                        </td>
                        <td className="px-6 py-4 text-slate-400">{d.user?.contactNumber ?? "-"}</td>
                      </tr>
                    ))}
                    {(!appointment?.details || appointment.details.length === 0) && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                          No appointments today
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: "blue" | "emerald" | "amber" | "violet";
}) {
  const colors = {
    blue: "bg-blue-500/20 border-blue-500/40 text-blue-400",
    emerald: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
    amber: "bg-amber-500/20 border-amber-500/40 text-amber-400",
    violet: "bg-violet-500/20 border-violet-500/40 text-violet-400",
  };
  return (
    <div className="p-6 rounded-2xl backdrop-blur-sm bg-slate-800/50 border border-slate-700/50">
      <div className={`inline-flex p-2 rounded-lg border ${colors[color]} mb-3`}>{icon}</div>
      <p className="text-slate-400 text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}
