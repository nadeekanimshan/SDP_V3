import { format } from "date-fns";
import bg from './../../assets/icon/gallery/bg b&w gallery.jpg'
import { FaBook, FaCalendarAlt, FaMoneyBill, FaUserClock } from "react-icons/fa";
import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { UseAxios } from "../../hook/useAxios";
import DownloadMonthReport from "../../components/admin/DownloadMonthReport";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
    password: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
interface AppointmentDetail {
    id: number;
    appointment_id: number;
    time_in: string;
    time_out: string;
    note: string;
    user_id: number;
    status: string;
    user: User;
  }
  
  interface AppointmentResponse {
    appointment: {
      id: number;
      date: string;
      status: string;
      note: string;
    };
    details: AppointmentDetail[];
  }

export default function Home() {

    const [appointment, setAppointment] = useState<AppointmentResponse | null>(null);

    const [TodayEventCount, setTodayEventCount] = useState<number>(0);
    const [UpcomingEventCount, setUpcomingEventCount] = useState<number>(0);
    const [TodayAppointmentCount, setTodayAppointmentCount] = useState<number>(0);
    const [UpcomingAppointmentCount, setUpcomingAppointmentCount] = useState<number>(0);
    const [TodayClassCount, setTodayClassCount] = useState<number>(0);
    const [TodayRevenue, setTodayRevenue] = useState<number>(0);
    const [MonthlyRevenue, setMonthlyRevenue] = useState<number>(0);

    const handleDownload = async (selectedMonths: string[]) => {
      try {
        const res = await UseAxios('users/student/registerdThisMonth', "GET", undefined, { months: selectedMonths });
        const students = res.data;
    
        const doc = new jsPDF();
        const now = new Date();
        const dateStr = format(now, 'yyyy-MM-dd HH-mm-ss');
    
        // Title
        doc.setFontSize(18);
        doc.text('SDP Student Report', 14, 20);
        doc.setFontSize(12);
        doc.text(`Generated on: ${format(now, 'yyyy')} for ${selectedMonths.join(', ')}`, 14, 28);
    
        // Table headers
        const tableHeaders = [
          [
            'Student Name',
            'Contact Number',
            'Address',
            'Join Date',
            'Class Name',
            'Payment Details'
          ],
        ];
    
        const tableData: any[] = [];
    
        students.forEach((entry: any) => {
          const student = entry.student;
          const classInfo = entry.class;
    
          const paymentDetails = entry.class_installments
            .map((install: any, index: number) =>
              `${index + 1}. ${install.status.toUpperCase()} - Rs.${install.amount} (${install.paymentMethod})`
            ).join('\n');
    
          tableData.push([
            `${student.firstName} ${student.lastName}`,
            student.contactNumber,
            `${student.address}, ${student.city}`,
            format(new Date(entry.createdAt), 'yyyy-MM-dd'),
            classInfo.name,
            paymentDetails
          ]);
        });
    
        autoTable(doc, {
          startY: 35,
          head: tableHeaders,
          body: tableData,
          styles: {
            fontSize: 8,
            cellPadding: 3,
            valign: 'top'
          },
          headStyles: {
            fillColor: [41, 128, 185]
          },
          columnStyles: {
            5: { cellWidth: 60 }
          }
        });
    
        // Ask user where to save (trigger download)
        doc.save(`SDP student report in ${dateStr}.pdf`);
      } catch (err) {
        console.error('Error generating report:', err);
      }
    };


    const fetchAppointment = async () => {
        try {
          const res = await UseAxios(`appointments/all/${format(new Date(), 'yyyy-MM-dd')}`, "GET");
          setAppointment(res.data);
        } catch (err) {
          console.error("Failed to fetch appointment:", err);
          setAppointment(null);
        }
      };

      useEffect(() => {
        fetchAppointment();
        getCout();
      }, []);

      const getCout = async () => {
       
        const res_todayEventCount = await  UseAxios("events/today", "GET");;
        setTodayEventCount(res_todayEventCount.data);
        const res_upcomingEventCount = await UseAxios("events/upcoming", "GET");;
        setUpcomingEventCount(res_upcomingEventCount.data);
        const res_todayAppointmentCount = await UseAxios("appointments/today", "GET");;
        setTodayAppointmentCount(res_todayAppointmentCount.data);
        const res_upcomingAppointmentCount = await UseAxios("appointments/upcoming", "GET");;
        setUpcomingAppointmentCount(res_upcomingAppointmentCount.data);
        const res_todayClassCount = await UseAxios("classes/today", "GET");;
        setTodayClassCount(res_todayClassCount.data);
        const res_todayRevenue = await UseAxios("admin/revenue/today", "GET");;
        setTodayRevenue(res_todayRevenue.data);
        const res_monthlyRevenue = await UseAxios("admin/revenue/monthly", "GET");;
        setMonthlyRevenue(res_monthlyRevenue.data);
      };

  return (
    <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-row gap-4 justify-between items-center p-4 rounded-md" style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <h1 className="text-4xl font-bold text-white">Welcome {localStorage.getItem('first-name')} {localStorage.getItem('last-name')}</h1>
            <div className="flex flex-col">
                <h1 style={{letterSpacing: '8px'}} className="text-5xl font-bold text-gray-200">{format(new Date(), 'yyyy')}</h1>
                <h1 className="text-5xl font-bold text-gray-200">{format(new Date(), 'MMM dd')}</h1>
                <h1 style={{letterSpacing: '2px'}} className="text-3xl font-bold text-gray-200">{format(new Date(), 'h:mm a')}</h1>
            </div>
        </div>
      
      <div className="flex flex-row gap-4 flex-wrap">
        <div className="flex flex-col gap-4 justify-start items-start p-4 rounded-md bg-blue-400 w-[300px] text-white">
            <h1 className="text-xl font-bold flex flex-row items-center gap-2"> <FaCalendarAlt /> Upcoming Events</h1>
            <h1 className="text-4xl font-bold">{UpcomingEventCount}</h1>
        </div>

        <div className="flex flex-col gap-4 justify-start items-start p-4 rounded-md bg-blue-400 w-[300px] text-white">
            <h1 className="text-xl font-bold flex flex-row items-center gap-2"> <FaCalendarAlt /> Today's Events</h1>
            <h1 className="text-4xl font-bold">{TodayEventCount}</h1>
        </div>

        <div className="flex flex-col gap-4 justify-start items-start p-4 rounded-md bg-gray-500 w-[300px] text-white">
            <h1 className="text-xl font-bold flex flex-row items-center gap-2"> <FaUserClock /> Today's Appointment</h1>
            <h1 className="text-4xl font-bold">{TodayAppointmentCount}</h1>
        </div>

        <div className="flex flex-col gap-4 justify-start items-start p-4 rounded-md bg-gray-500 w-[300px] text-white">
            <h1 className="text-xl font-bold flex flex-row items-center gap-2"> <FaUserClock /> Upcoming Appointment </h1>
            <h1 className="text-4xl font-bold">{UpcomingAppointmentCount}</h1>
        </div>

        <div className="flex flex-col gap-4 justify-start items-start p-4 rounded-md bg-amber-500 w-[300px] text-white">
            <h1 className="text-xl font-bold flex flex-row items-center gap-2"> <FaBook /> Tody Class </h1>
            <h1 className="text-4xl font-bold">{TodayClassCount}</h1>
        </div>

        <div className="flex flex-col gap-4 justify-start items-start p-4 rounded-md bg-indigo-400 w-[620px] text-white">
            <h1 className="text-xl font-bold flex flex-row items-center gap-2"> <FaMoneyBill /> Tody Revenue </h1>
            <h1 className="text-4xl font-bold"> LKR {TodayRevenue}</h1>
        </div>
        <div className="flex flex-col gap-4 justify-start items-start p-4 rounded-md bg-indigo-400 w-[620px] text-white">
            <h1 className="text-xl font-bold flex flex-row items-center gap-2"> <FaMoneyBill /> Monthly Revenue </h1>
            <h1 className="text-4xl font-bold"> LKR {MonthlyRevenue}</h1>
        </div>
        <DownloadMonthReport handleDownload={handleDownload} />
      </div>



      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Time In</th>
              <th className="px-6 py-3">Time Out</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Contact</th>
            </tr>
          </thead>
          <tbody>
            {appointment?.details.map((detail) => (
              <tr key={detail.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{detail.time_in}</td>
                <td className="px-6 py-4">{detail.time_out}</td>
                <td className="px-6 py-4">{detail.status}</td>
                <td className="px-6 py-4">
                  {detail.user.firstName} {detail.user.lastName}
                </td>
                <td className="px-6 py-4">{detail.user.contactNumber}</td>
              </tr>
            ))}
            {appointment?.details.length === 0 && (
              <tr className="bg-white dark:bg-gray-800">
                <td colSpan={5} className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                  No Appointments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

    </div>
  )
}
