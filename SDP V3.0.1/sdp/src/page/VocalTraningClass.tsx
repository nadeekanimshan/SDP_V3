import NavBar from "../components/vocalTraningClass/NavBar";
import MyClassDetails from "../components/MyClassDetails";
import VocalTraningClassCard from "../components/vocalTraningClass/VocalTraningClassCard";
import { useEffect, useState } from "react";
import { UseAxios } from "../hook/useAxios";

type TrainingClass = {
    id: number
    name: string
    description: string
    duration: string
    day: string
    startTime: string
    endTime: string
    installments_count: number
    installments_price: number
    full_price: number
}

export default function VocalTraningClass() {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [classes, setClasses] = useState<TrainingClass[]>([]);

    useEffect(() => {
      try {
      setLoading(true)
      const getEvents = async () => {
          const response = await UseAxios('classes', "GET");
          setClasses(response.data);
        console.log(classes)
        setLoading(false)
        setError(null)
  }
  getEvents()
} catch (error) {
  setError(error as Error)
} finally {
  setLoading(false)
}
}, [])
    return (
        <div>
            <NavBar/>
            <div className="relative mt-12">
                <MyClassDetails/>
            </div>
            <div className="flex flex-wrap flex-col justify-center items-center gap-6 bg-gray-100 mt-6">
                <div className="w-full p-4">
                    <h1 className="text-2xl font-bold">Vocal Training Class</h1>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}

                {classes?.map((trainingClass: TrainingClass) => (
                    <VocalTraningClassCard key={trainingClass.id} id={trainingClass.id} title={trainingClass.name} description={trainingClass.description} duration={trainingClass.duration} time={trainingClass.day} installments={trainingClass.installments_count.toString()} fullPayment={trainingClass.full_price.toString()} installmentPayment={trainingClass.installments_price.toString()}/>
                ))}

                {/* <VocalTraningClassCard title="Vocal Training Class" description="Improve your singing with our expert vocal coaches through personalized training sessions." duration="1 hour" time="Wensdays 6:00 PM - 7:00 PM" installments="6" fullPayment="6000.00" installmentPayment="1000.00"/>
                <VocalTraningClassCard title="Vocal Training Class" description="Improve your singing with our expert vocal coaches through personalized training sessions." duration="1 hour" time="Wensdays 6:00 PM - 7:00 PM" installments="6" fullPayment="6000.00" installmentPayment="1000.00"/>
                <VocalTraningClassCard title="Vocal Training Class" description="Improve your singing with our expert vocal coaches through personalized training sessions." duration="1 hour" time="Wensdays 6:00 PM - 7:00 PM" installments="6" fullPayment="6000.00" installmentPayment="1000.00"/> */}
            </div>
        </div>
    )
}
