import { useState } from "react";
import ClassPayment from "./ClassPayment";
import AppoimentPayment from "./AppoimentPayment";

export default function Payment() {
    const [selectedPayment, setSelectedPayment] = useState<"Appointment"|"Class">("Class");
  return (
    <div className="flex-1 bg-gray-900 p-6">
        <div>
            <button className={` px-4 py-2  hover:bg-gray-700 ${selectedPayment === "Class" ? "bg-gray-200 text-black" : "bg-gray-800 text-gray-500"}`} onClick={() => setSelectedPayment("Class")}>Class Payment</button>
            <button className={` px-4 py-2  hover:bg-gray-700 ${selectedPayment === "Appointment" ? "bg-gray-200 text-black" : "bg-gray-800 text-gray-500"}`} onClick={() => setSelectedPayment("Appointment")}>Appointment Payment</button>
        </div>
        {
            selectedPayment === "Class" ? (
                <ClassPayment />
            ) : (
                <AppoimentPayment />
            )
        }

    </div>
  )
}
