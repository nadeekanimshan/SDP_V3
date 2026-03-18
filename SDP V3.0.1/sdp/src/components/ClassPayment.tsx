// src/pages/ClassPayment.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VocalTraningClassCard from '../components/vocalTraningClass/VocalTraningClassCard';
import { UseAxios } from '../hook/useAxios';

export default function ClassPayment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [classData, setClassData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      UseAxios(`classes/${id}`, "GET").then((res) => {
        setClassData(res.data);
      });
    }
  }, [id]);

  const handleJoinNow = () => {
    navigate(`/payment/${id}`);
  };

  if (!classData) return <p className="text-white">Loading...</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <VocalTraningClassCard
        id={classData.id}
        title={classData.name}
        description={classData.description}
        duration={classData.duration}
        time={`${classData.day}, ${classData.startTime} - ${classData.endTime}`}
        installments={String(classData.installments_count)}
        fullPayment={classData.full_price}
        installmentPayment={classData.installments_price}
      />
      <button
        className="mt-6 bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
        onClick={handleJoinNow}
      >
        Proceed to Payment
      </button>
    </div>
  );
}
