import { AppLayout } from "../components/layout";
import MyClassDetails from "../components/MyClassDetails";
import VocalTraningClassCard from "../components/vocalTraningClass/VocalTraningClassCard";
import { useEffect, useState, useCallback } from "react";
import { UseAxios } from "../hook/useAxios";
import { SYSTEM_KEY } from "../config/Constent";

type TrainingClass = {
  id: number;
  name: string;
  description: string;
  duration: string;
  day: string;
  startTime: string;
  endTime: string;
  installments_count: number;
  installments_price: number;
  full_price: number;
};

export default function VocalTraningClass() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [classes, setClasses] = useState<TrainingClass[]>([]);
  const [enrolledClassIds, setEnrolledClassIds] = useState<number[]>([]);

  const fetchEnrolledClasses = useCallback(async () => {
    const userId = localStorage.getItem(SYSTEM_KEY.ID);
    if (!userId) return;
    try {
      const res = await UseAxios(`classes/user/${userId}`, "GET");
      const data = res?.data ?? res;
      const list = Array.isArray(data) ? data : [];
      setEnrolledClassIds(list.map((c: { class?: { id: number } }) => c.class?.id).filter(Boolean));
    } catch {
      setEnrolledClassIds([]);
    }
  }, []);

  useEffect(() => {
    const getClasses = async () => {
      setLoading(true);
      try {
        const [classesRes] = await Promise.all([
          UseAxios("classes", "GET"),
          fetchEnrolledClasses(),
        ]);
        setClasses(classesRes?.data ?? classesRes ?? []);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    getClasses();
  }, [fetchEnrolledClasses]);

  return (
    <AppLayout title="Vocal Training Class" subtitle="Improve your singing with our expert vocal coaches.">
      <div className="space-y-8">
        <MyClassDetails />
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Available Classes</h2>
          {loading && <p className="text-slate-300">Loading...</p>}
          {error && <p className="text-red-400">Error: {error.message}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classes?.map((trainingClass: TrainingClass) => (
              <VocalTraningClassCard
                key={trainingClass.id}
                id={trainingClass.id}
                title={trainingClass.name}
                description={trainingClass.description}
                duration={trainingClass.duration}
                time={trainingClass.day}
                installments={trainingClass.installments_count.toString()}
                fullPayment={trainingClass.full_price.toString()}
                installmentPayment={trainingClass.installments_price.toString()}
                isEnrolled={enrolledClassIds.includes(trainingClass.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
