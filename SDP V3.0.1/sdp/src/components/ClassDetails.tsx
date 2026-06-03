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

    const paidCount = class_installments.filter((i) => i.status === "done").length;

    return (
        <div className="rounded-2xl border border-slate-600/50 bg-slate-700/40 p-6 shadow-lg hover:shadow-xl hover:border-slate-500/50 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40">
                            <FaBook className="text-amber-400 w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-white">{name}</h2>
                    </div>
                    {description && <p className="text-slate-300 text-sm mb-2">{description}</p>}
                    <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                        <span>Duration: {duration}</span>
                        <span>•</span>
                        <span>{day}, {startTime} – {endTime}</span>
                        <span>•</span>
                        <span>{paidCount}/{installments_count} paid</span>
                    </div>
                </div>
                <button
                    onClick={handleToggle}
                    className="shrink-0 px-4 py-2 rounded-lg text-sm font-medium bg-slate-600 text-slate-200 hover:bg-slate-500 transition-colors"
                >
                    {isDetailsOpen ? "Hide details" : "Show details"}
                </button>
            </div>

            {isDetailsOpen && (
                <div className="mt-6 pt-6 border-t border-slate-600/50">
                    <h3 className="text-sm font-semibold text-slate-300 mb-4">Installments</h3>
                    <div className="flex flex-col gap-3">
                        {class_installments.map((installment, index) => (
                            <div
                                key={installment.id}
                                className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-600/50"
                            >
                                <FaCreditCard className="text-slate-400 w-4 h-4 shrink-0" />
                                <span className="text-white font-medium">{index + 1}. Installment</span>
                                <span className="text-amber-400 font-semibold">LKR {installment.amount}</span>
                                <span className="text-slate-400 text-sm">
                                    Due: {format(new Date(installment.installments_Due_Date), "MMM yyyy")}
                                </span>
                                <span className="ml-auto">
                                    {installment.status === "done" ? (
                                        <span className="inline-flex px-3 py-1 rounded-lg text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                            Paid
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                localStorage.setItem("installment_id", String(installment.id));
                                                navigate('/payment-form-inst');
                                            }}
                                            className="px-4 py-2 rounded-lg text-sm font-medium bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30 transition-colors"
                                        >
                                            Pay Now
                                        </button>
                                    )}
                                </span>
                                {installment.status !== "done" && format(new Date(installment.installments_Due_Date), "yyyy-MM") < format(new Date(), "yyyy-MM") && (
                                    <span className="text-rose-400 text-sm">Missed payment</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
