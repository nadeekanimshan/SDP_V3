import { useState } from "react";
import ClassPayment from "./ClassPayment";
import AppoimentPayment from "./AppoimentPayment";

export default function Payment() {
    const [selectedPayment, setSelectedPayment] = useState<"Appointment"|"Class">("Class");
  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Payment Management</h1>
        <div className="flex gap-2 mb-6">
            <button className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedPayment === "Class" ? "bg-amber-500 text-slate-900" : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"}`} onClick={() => setSelectedPayment("Class")}>Class Payment</button>
            <button className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedPayment === "Appointment" ? "bg-amber-500 text-slate-900" : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"}`} onClick={() => setSelectedPayment("Appointment")}>Appointment Payment</button>
        </div>
        {selectedPayment === "Class" ? <ClassPayment /> : <AppoimentPayment />}
      </div>
    </div>
  );
}
