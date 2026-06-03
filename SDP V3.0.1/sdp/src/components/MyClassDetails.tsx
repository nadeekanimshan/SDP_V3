import ClassDetails from "./ClassDetails";
import { useEffect, useState } from "react";
import { UseAxios } from "../hook/useAxios";
import { SYSTEM_KEY } from "../config/Constent";

export interface ClassInstallment {
  id: number;
  class_student_id: number;
  amount: string;
  status: "done" | "pending";
  paymentDate: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  deleteStatus: boolean;
  installments_Due_Date: string;
}

export interface ClassInfo {
  id: number;
  name: string;
  description: string;
  duration: string;
  day: string;
  startTime: string;
  endTime: string;
  installments_count: number;
  installments_price: string;
  full_price: string;
}

export interface StudentInfo {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  typeId: number;
  contactNumber: string;
  address: string;
  city: string;
  district: string;
  createdAt: string;
  updatedAt: string;
  deleteStatus: boolean;
}

export interface ClassStudentRegistration {
  id: number;
  class_id: number;
  student_id: number;
  createdAt: string;
  updatedAt: string;
  deleteStatus: boolean;
  class_installments: ClassInstallment[];
  class: ClassInfo;
  student: StudentInfo;
}

export default function MyClassDetails() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [classes, setClasses] = useState<ClassStudentRegistration[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem(SYSTEM_KEY.ID);
    if (!userId) return;

    const getClasses = async () => {
      setLoading(true);
      try {
        const response = await UseAxios(`classes/user/${userId}`, "GET");
        const data = response?.data ?? response;
        setClasses(Array.isArray(data) ? data : []);
        setError(null);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    getClasses();
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-800/60 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="px-6 py-5 border-b border-slate-700/50 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10">
        <h1 className="text-2xl font-bold text-white">My Classes</h1>
        <p className="text-slate-400 mt-1">View your class details and manage your schedule.</p>
      </div>
      <div className="p-6 flex flex-col gap-6">
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        )}
        {error && (
          <p className="text-rose-400 py-4">Error loading classes: {error.message}</p>
        )}

        {classes.length === 0 && !loading && (
          <div className="rounded-2xl border border-dashed border-slate-600/50 bg-slate-700/20 p-8 text-center">
            <p className="text-slate-400 font-medium">No class registrations yet</p>
            <p className="text-slate-500 text-sm mt-1">Enroll in a class below to get started</p>
          </div>
        )}

        {classes?.map((c) => (
        <ClassDetails
          key={c.id}
          class={
            {
              id: c.class.id,
              name: c.class.name,
              description: c.class.description,
              duration: c.class.duration,
              day: c.class.day,
              startTime: c.class.startTime,
              endTime: c.class.endTime,
              installments_count: c.class.installments_count,
              installments_price: Number(c.class.installments_price),
              full_price: Number(c.class.full_price),
            }
          }
          class_installments={c.class_installments.map((installment) => ({
            id: installment.id,
            class_student_id: installment.class_student_id,
            amount: Number(installment.amount),
            status: installment.status,
            paymentDate: installment.paymentDate,
            paymentMethod: installment.paymentMethod,
            installments_Due_Date: installment.installments_Due_Date
          }))}
        />
      ))}
      </div>
    </div>
  );
}
