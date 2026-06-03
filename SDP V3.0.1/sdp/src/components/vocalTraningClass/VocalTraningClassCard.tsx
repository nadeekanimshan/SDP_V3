import profile from "../../assets/icon/home/2L.jpg"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import { Bounce } from "react-toastify";
import { toast } from "react-toastify";
import { UseAxios } from "../../hook/useAxios"
import { SYSTEM_KEY } from "../../config/Constent"

interface VocalTraningClassCardProps {
    id: number;
    title: string;
    description: string;
    duration: string;
    time: string;
    installments: string;
    fullPayment: string;
    installmentPayment: string;
    isEnrolled?: boolean;
}

export default function VocalTraningClassCard({ id, title, description, duration, time, installments, fullPayment, installmentPayment, isEnrolled }: VocalTraningClassCardProps) {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const notify = () => toast(error);

    async function navigateToPayment(paymentType: "full" | "installment") {
        const userId = localStorage.getItem(SYSTEM_KEY.ID);
        if (!userId) {
            toast.error("Please log in to enroll");
            return;
        }
        try {
            const res = await UseAxios(`classes/user/${userId}/class/${id}`, "GET");
            if (res?.status === 200 || res?.data) {
                localStorage.setItem("classId", id.toString());
                localStorage.setItem("payment_type", paymentType);
                navigate(paymentType === "full" ? "/payment-form-full" : "/payment-form-reg");
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 409) {
                    setError("Class is already registered");
                    notify();
                } else {
                    setError("Something went wrong");
                    notify();
                }
            }
        }
    }

    return (
        <div className="shadow-xl rounded-2xl w-full overflow-hidden backdrop-blur-sm bg-slate-800/50 border border-slate-700/50 p-6 flex flex-col md:flex-row items-stretch gap-6">
            <img src={profile} className="w-full md:w-44 h-44 object-cover rounded-xl flex-shrink-0" alt="" />
            <div className="flex flex-col gap-4 flex-1">
                <h1 className="text-xl font-bold text-white">{title}</h1>
                <p className="text-slate-300">{description}</p>
                <div className="text-slate-400 text-sm">
                    <p>Duration: {duration}</p>
                    <p>{time}</p>
                    <p><span>{installments}</span> installments</p>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-slate-300">
                        Full payment <span className="ml-2 text-amber-500 font-bold">LKR {fullPayment}</span>
                    </span>
                    <span className="text-sm text-slate-400">
                        {installments} installments (LKR {installmentPayment} per installment)
                    </span>
                </div>
                {isEnrolled ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-medium w-fit">
                        Already enrolled
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => navigateToPayment("full")}
                            className="bg-amber-500 text-slate-900 px-6 py-2.5 rounded-lg font-medium hover:bg-amber-400 transition-colors"
                        >
                            Pay Full – LKR {fullPayment}
                        </button>
                        <button
                            onClick={() => navigateToPayment("installment")}
                            className="bg-slate-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-500 border border-slate-500 transition-colors"
                        >
                            Pay in Installments – LKR {installmentPayment}/mo
                        </button>
                    </div>
                )}
                {error && <ToastContainer autoClose={5000} transition={Bounce} position="bottom-right" />}
            </div>
        </div>
    );
}
