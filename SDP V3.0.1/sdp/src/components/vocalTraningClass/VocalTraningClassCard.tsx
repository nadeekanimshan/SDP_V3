import profile from "../../assets/icon/home/2L.jpg"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import { Bounce } from "react-toastify";
import { toast } from "react-toastify";
import { UseAxios } from "../../hook/useAxios"

interface VocalTraningClassCardProps {
    id: number;
    title: string;
    description: string;
    duration: string;
    time: string;
    installments: string;
    fullPayment: string;
    installmentPayment: string;
    
}
export default function VocalTraningClassCard({id,title, description, duration, time, installments, fullPayment, installmentPayment}:VocalTraningClassCardProps) {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const notify = () => toast(error);

    async function navigateClasss() {
        try {
        const res = await UseAxios(`classes/user/${localStorage.getItem("id")}/class/${id}`, "GET");
        if(res.status === 200) {
            localStorage.setItem("classId", id.toString());
            navigate('/payment-form-reg');
        } 
    } catch (error) {
        if(error instanceof AxiosError) {
            if(error.response?.status === 409) {
                setError("Class is already registered")
                notify()
            } else {
                setError("Something went wrong")
                notify()
            }
        }
    }
    }
  return (
    <div className="shadow-lg rounded-md  h-[400px] w-[800px] p-4 flex flex-row items-center gap-4">
        <img src={profile} className="w-[350px] h-[350px] object-cover rounded-md" alt="" />
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p>{description}</p>
            <div>
                <p className="text-sm text-gray-600">Duration: {duration}</p>
                <p className="text-sm text-gray-600">{time}</p>
                <p className="text-sm text-gray-600"><span>{installments}</span> installments</p>
            </div>
            <div className="flex flex-col gap-2">
                <span className=" text-xl text-gray-600">full payment <span className="ml-2 text-yellow-600 font-bold"> LKR {fullPayment}</span></span>
                <span className="text-sm text-gray-600">{installments} installments (LKR {installmentPayment} per installment)</span>
            </div>
            <button onClick={navigateClasss} className="bg-black text-white px-6 py-2 rounded hover:bg-white hover:text-black border-black border transition">Join Now <span className="ml-2 text-yellow-600 font-bold"> LKR {installmentPayment}</span></button>
            {error &&
            <ToastContainer autoClose={5000} transition={Bounce} position="bottom-right"/>
            }
        </div>
    </div>
  )
}
