import React, {useState} from "react";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import { addMonths, format } from "date-fns";

import logo from "../assets/icon/logo.png"
import bg from "../assets/icon/1L.jpg"
import bank from "../assets/icon/card .png"
import { useNavigate } from "react-router-dom";
import { UseAxios } from "../hook/useAxios";
interface PaymentFormProps {
    navigateTo: string;
    backTo: string;
    payment:"REGISTRATION" | "INSTALLMENT"
}

const PaymentForm: React.FC<PaymentFormProps> = ({navigateTo, backTo, payment}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [status, setStatus] = useState < string | null > (null);
    const navigate = useNavigate();

    

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        if (! stripe || ! elements) 
            return;
        

        const cardElement = elements.getElement(CardElement);
        if (! cardElement) 
            return;
        

        const {error, paymentMethod} = await stripe.createPaymentMethod({type: "card", card: cardElement});

        if (error) {
            setStatus(`Payment Failed: ${
                error.message
            }`);
        } else {
            console.log("Payment Method:", paymentMethod);
            setStatus("Payment Successful ✅");
            if (payment === "REGISTRATION") {
                classRegistrationPayment();
            } else {
                classInstallmentPayment();
            }
        }
    };

    async function classInstallmentPayment() {
        try {
    
            await UseAxios(`classes/installment`, "POST", {
             installment_id: Number(localStorage.getItem("installment_id")),
             user_id: Number(localStorage.getItem("id")),
             paymentMethod: "card",
             status: "done"
            });
    
            setStatus("Payment and Registration Successful ✅");
            navigate(navigateTo);
          } catch (err: Error | unknown) {
            console.error(err);
            setStatus("Registration Failed after Payment ❌");
          }
        }

    async function classRegistrationPayment() {
        try {
          const classId = Number(localStorage.getItem("classId"));
          const userId = Number(localStorage.getItem("id"));
      
          // Get class start date
          const classStartDateRes = await UseAxios(
            `classes/start-date/${classId}`,
            "GET"
          );
          const classStartDateStr = classStartDateRes.data.startDate;
          console.log(classStartDateStr)
          const classStartDate = new Date(classStartDateStr);
      
          // Get class details
          const classRes = await UseAxios(
            `classes/${classId}`,
            "GET"
          );
          const { installments_count, installments_price } = classRes.data;
      
          // Create installment objects with due dates
          const installments = Array.from({ length: installments_count }, (_, index) => {
            const dueDate = addMonths(classStartDate, index); // Add index months
            return {
              amount: Number(installments_price),
              status: index === 0 ? "done" : "pending",
              installments_Due_Date: format(dueDate, "yyyy-MM-dd")
            };
          });
      
          // Post to registration endpoint
          await UseAxios(`classes/register`, "POST", {
            class_id: classId,
            user_id: userId,
            installments
          });
      
          setStatus("Payment and Registration Successful ✅");
          navigate(navigateTo);
        } catch (err: unknown) {
          console.error(err);
          setStatus("Registration Failed after Payment ❌");
        }
      }


    return (
        <div className="flex flex-row items-center h-screen w-screen">
            <div className="flex flex-col items-center justify-center bg-gray-200 text-white p-6 h-full w-full" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <img className="w-[200px] h-auto" src={logo}
                    alt=""/>
                <h1 className="text-2xl font-bold ">AUDIO DIARY</h1>
            </div>
            <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-gray-200 text-gray-800 h-full w-full flex flex-col justify-center items-center">
                <img className="w-[200px] h-auto" src={bank}
                    alt=""/>
                <h2 className="text-2xl font-bold mb-4">Make your Payment</h2>
                <form onSubmit={handleSubmit}
                    className="space-y-4 w-[80%]">
                    <div className="border p-2 rounded">
                        <CardElement/>
                    </div>
                    <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
                        disabled={
                            ! stripe
                    }>
                        Pay
                    </button>
                    <button className="w-full bg-white border border-gray-800 text-gray-800 py-2 rounded hover:bg-gray-800 hover:text-white transition" onClick={() => {navigate(navigateTo)}}>Back to {backTo}</button>
                </form>
                {
                status && <p className="mt-4 text-center">
                    {status}</p>
            } </div>
        </div>

    );
};

export default PaymentForm;
