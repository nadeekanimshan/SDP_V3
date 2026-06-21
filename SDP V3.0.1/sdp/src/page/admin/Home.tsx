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
      const allStudents = res?.data ?? [];
      
      console.log("Report data received:", allStudents);
      console.log("Number of students:", allStudents.length);
      
      if (allStudents.length === 0) {
        alert("No student data found for the selected month(s)");
        setShowReportDropdown(false);
        return;
      }
      
      // Group students by registration month
      const studentsByMonth: Record<string, any[]> = {};
      
      // Initialize all selected months with empty arrays
      selectedMonths.forEach(month => {
        studentsByMonth[month] = [];
      });
      
      // Add students to their respective months
      allStudents.forEach((entry: any) => {
        if (entry.createdAt) {
          const monthName = format(new Date(entry.createdAt), "MMMM"); // e.g., "June"
          if (studentsByMonth[monthName]) {
            studentsByMonth[monthName].push(entry);
          }
        }
      });
      
      const doc = new jsPDF();
      const now = new Date();
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Header with logo/title area (only on first page)
      doc.setFillColor(30, 41, 59); // slate-800
      doc.rect(0, 0, pageWidth, 45, "F");
      
      doc.setFontSize(24);
      doc.setTextColor(251, 191, 36); // amber-400
      doc.text("Audio Diary Studio", pageWidth / 2, 18, { align: "center" });
      
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.text("Student Registration Report", pageWidth / 2, 28, { align: "center" });
      
      doc.setFontSize(10);
      doc.setTextColor(203, 213, 225); // slate-300
      const monthsText = selectedMonths.join(", ");
      doc.text(`Period: ${monthsText} ${format(now, "yyyy")}`, pageWidth / 2, 36, { align: "center" });
      doc.text(`Generated: ${format(now, "MMMM d, yyyy 'at' h:mm a")}`, pageWidth / 2, 42, { align: "center" });
      
      // Summary section
      let currentY = 55;
      doc.setFontSize(12);
      doc.setTextColor(51, 65, 85); // slate-700
      doc.text("Summary", 14, currentY);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text(`Total Students: ${allStudents.length}`, 14, currentY + 7);
      doc.text(`Report Generated By: ${firstName} ${lastName}`, 14, currentY + 14);
      
      currentY += 25;
      
      let grandTotalRevenue = 0;
      
      // Generate a table for each selected month
      selectedMonths.forEach((monthName, monthIndex) => {
        const monthStudents = studentsByMonth[monthName] || [];
        
        // Add new page for each month (except first)
        if (monthIndex > 0) {
          doc.addPage();
          currentY = 20;
        }
        
        // Month heading
        doc.setFontSize(14);
        doc.setTextColor(251, 191, 36); // amber-400
        doc.text(`${monthName} ${format(now, "yyyy")} - ${monthStudents.length} Student(s)`, 14, currentY);
        
        currentY += 8;
        
        // If no students for this month, show message
        if (monthStudents.length === 0) {
          doc.setFontSize(10);
          doc.setTextColor(148, 163, 184); // slate-400
          doc.text("No students registered in this month", 14, currentY + 10);
          currentY += 30;
          return;
        }
        
        let monthTotalRevenue = 0;
        
        // Prepare table data for this month
        const tableData = monthStudents.map((entry: any, index: number) => {
          const student = entry.student ?? entry ?? {};
          const classInfo = entry.class ?? {};
          
          // Format address
          const addressParts = [student.address, student.city, student.district].filter(Boolean);
          const fullAddress = addressParts.join(", ") || "-";
          
          // Format join date
          const joinDate = entry.createdAt 
            ? format(new Date(entry.createdAt), "MMM d, yyyy") 
            : "-";
          
          // Calculate payment - status is "done" for paid installments
          const installments = entry.class_installments ?? [];
          const totalPaid = installments
            .filter((p: any) => p.status?.toLowerCase() === "done")
            .reduce((sum: number, p: any) => sum + (parseFloat(p.amount) || 0), 0);
          
          const hasPending = installments.some((p: any) => p.status?.toLowerCase() !== "done");
          const paymentStatus = installments.length === 0 ? "No Pay" : hasPending ? "Partial" : "Paid";
          
          monthTotalRevenue += totalPaid;
          
          return [
            index + 1,
            `${student.firstName ?? ""} ${student.lastName ?? ""}`.trim() || "-",
            student.contactNumber ?? "-",
            student.email ?? "-",
            fullAddress,
            joinDate,
            classInfo.name ?? "-",
            `LKR ${totalPaid.toFixed(2)}`,
            paymentStatus,
          ];
        });
        
        grandTotalRevenue += monthTotalRevenue;
        
        // Generate table for this month
        autoTable(doc, {
          startY: currentY,
          head: [[
            "#",
            "Name",
            "Contact",
            "Email",
            "Address",
            "Join Date",
            "Class",
            "Paid",
            "Status"
          ]],
          body: [
            ...tableData,
            // Monthly total row
            [
              { content: `${monthName} Total Revenue`, colSpan: 7, styles: { halign: "right", fontStyle: "bold", fillColor: [30, 41, 59], textColor: [251, 191, 36] } },
              { content: `LKR ${monthTotalRevenue.toFixed(2)}`, styles: { halign: "right", fontStyle: "bold", fillColor: [30, 41, 59], textColor: [251, 191, 36] } },
              { content: "", styles: { fillColor: [30, 41, 59] } },
            ],
          ],
          styles: { 
            fontSize: 7, 
            cellPadding: 1.5,
            lineColor: [203, 213, 225],
            lineWidth: 0.1,
            overflow: 'linebreak',
            cellWidth: 'wrap',
          },
          headStyles: { 
            fillColor: [30, 58, 138],
            textColor: [255, 255, 255],
            fontStyle: "bold",
            halign: "center",
            fontSize: 7,
          },
          alternateRowStyles: { 
            fillColor: [248, 250, 252]
          },
          columnStyles: {
            0: { cellWidth: 8, halign: "center" },
            1: { cellWidth: 23 },
            2: { cellWidth: 18 },
            3: { cellWidth: 28 },
            4: { cellWidth: 28 },
            5: { cellWidth: 18, halign: "center" },
            6: { cellWidth: 23 },
            7: { cellWidth: 18, halign: "right" },
            8: { cellWidth: 15, halign: "center" },
          },
          margin: { left: 8, right: 8 },
          tableWidth: 'auto',
          theme: 'grid',
          didDrawPage: (data) => {
            const pageCount = doc.internal.pages.length - 1;
            const pageNo = doc.internal.getCurrentPageInfo().pageNumber;
            doc.setFontSize(8);
            doc.setTextColor(148, 163, 184);
            doc.text(
              `Page ${pageNo} of ${pageCount} | Audio Diary Studio © ${format(now, "yyyy")}`,
              pageWidth / 2,
              doc.internal.pageSize.getHeight() - 10,
              { align: "center" }
            );
          },
        });
        
        currentY = (doc as any).lastAutoTable.finalY + 15;
      });

      // Grand Total Revenue section at the very end
      const pageHeight = doc.internal.pageSize.getHeight();
      if (currentY + 30 > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFillColor(30, 41, 59);
      doc.roundedRect(8, currentY, pageWidth - 16, 22, 3, 3, "F");

      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.text("Grand Total Revenue (All Months)", 16, currentY + 9);

      doc.setFontSize(14);
      doc.setTextColor(251, 191, 36);
      doc.text(`LKR ${grandTotalRevenue.toFixed(2)}`, pageWidth - 16, currentY + 10, { align: "right" });

      doc.setFontSize(8);
      doc.setTextColor(203, 213, 225);
      doc.text(`Period: ${selectedMonths.join(", ")} ${format(now, "yyyy")}`, 16, currentY + 18);
      
      // Save PDF with properly formatted filename
      const monthsForFilename = selectedMonths.join("-").replace(/\s+/g, "");
      const filename = `Student-Report_${monthsForFilename}_${format(now, "yyyy-MMM-dd_HHmm")}.pdf`;
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
