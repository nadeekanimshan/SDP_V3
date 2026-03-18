import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaBook } from 'react-icons/fa';
import { format } from "date-fns";

interface ClassDetailsProps {
    class:{
        id: number,
        name: string,
        description: string,
        duration: string,
        day: string,
        startTime: string,
        endTime: string,
        installments_count: number,
        installments_price: number,
        full_price: number
    },
    class_installments: {
        id: number,
        class_student_id: number,
        amount: number,
        status: string,
        paymentDate: string,
        paymentMethod: string,
        installments_Due_Date: string
    }[]
}

export default function ClassDetails({class:{name, description, duration, day, startTime, endTime, installments_count, installments_price, full_price}, class_installments}:ClassDetailsProps) {

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const handleToggle = () => setIsDetailsOpen(!isDetailsOpen);
    const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-6">
                <div className="flex flex-col w-full gap-6 bg-indigo-100 text-black p-4 rounded-md">
                <div className="flex flex-row justify-between items-center bg-white text-black p-4 rounded-md">
                    <div className="flex flex-col gap-2 items-start w-full">
                        <div className="flex flex-row gap-2 justify-between items-center w-full">
                            <div className="flex flex-row gap-2 items-center w-full">
                                <FaBook className="text-2xl"/>
                                <h1 className="text-xl font-bold bg-indigo-500 w-full rounded-sm text-center py-4 text-white">  {name}</h1>
                            </div>
                        <button onClick={handleToggle} className="text-gray-600 text-sm rounded hover:bg-gray-800 hover:text-white transition hover:border-black w-[150px]">{isDetailsOpen ? "hide details" : "show details"}</button>
                        </div>
                        <p>{description}</p>
                        <p>Duration: {duration}</p>
                        <p>{day}, {startTime} - {endTime}</p>
                        <div className="flex flex-row gap-2 text-sm text-gray-400">
                            <p>Installments: {installments_count}</p>
                            <p>Full Payment: {full_price}</p>
                            <p>Installment Payment: {installments_price}</p>
                        </div>
                    </div>
                </div>
                {isDetailsOpen && (
                <div className="flex flex-col gap-2 px-4">
                    {class_installments.map((installment,index) => (
                        <div className="flex flex-row gap-12 items-center">
                            <FaCreditCard/>
                            <p>{index + 1} installment</p>
                            <p>LKR {installment.amount}</p>
                            <p>Due Date to Pay: {format(new Date(installment.installments_Due_Date), "yyyy-MM")}</p>
                            <button className="border-green-600 border-2 text-green-600 px-6 py-2 rounded hover:bg-green-600 hover:text-white transition hover:border-green-600 w-[150px]" onClick={() => {
                                if (installment.status === "done") return;
                                localStorage.setItem("installment_id", String(installment.id));
                                navigate('/payment-form-inst')
                            }}>{installment.status === "done" ? "Paid" : "Pay Now"}</button>
                            {
                                installment.status === "done" ? <></>: format(new Date(installment.installments_Due_Date), "yyyy-MM") < format(new Date(), "yyyy-MM") ? (
                                    <p className="text-red-600">Missed Payment</p>
                                ) : <></>
                            }
                        </div>
                        
                    ))}
                </div>
                )}
                </div>
            </div>
  )
}
