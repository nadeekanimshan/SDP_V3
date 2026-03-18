import ClassDetails from "./ClassDetails"; // Confirm this is the correct component
import { useEffect, useState } from "react";
import { UseAxios } from "../hook/useAxios";

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
    const getClasses = async () => {
      setLoading(true);
      try {
        const response = await UseAxios("classes/user/2", "GET");
        setClasses(response.data);
        console.log("Loaded classes:", response.data);
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
    <div className="h-auto w-full p-4 flex flex-col gap-4 shadow-lg rounded-md bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">My Classes</h1>
      <p>View your class details and manage your class schedule.</p>

      {loading && <p>Loading...</p>}
      {error && (
        <p className="text-red-500">Error loading classes: {error.message}</p>
      )}

      {classes.length === 0 && !loading && (
        <p className="text-gray-400">No class registrations found.</p>
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
  );
}
