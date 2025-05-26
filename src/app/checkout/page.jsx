"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PayPalButton from "./PayPalButton";
import { FirestoreDB } from "@/service/firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "@/components/common/Loader";
// import {
//   PackageCheck,
//   BadgeDollarSign,
//   ShieldCheck,
// } from "lucide-react";

// Define plan data for lookup
// const planLookup = {
//   SPEEDYIELTS_WEEKLY: { amount: "5", name: "Weekly Premium", duration: "7 Days" },
//   SPEEDYIELTS_PREMIUM: { amount: "15", name: "Monthly Premium", duration: "31 Days" },
//   SPEEDYIELTS_3PREMIUM: { amount: "20", name: "3-Month Bundle", duration: "90 Days" },
// };

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const OrderID = searchParams.get("id");
  const [data, setData] = useState(null);
  const db = FirestoreDB();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (OrderID) {
      const fetchPlan = async () => {
        try {
          const docRef = doc(db, "payment-paypal", OrderID);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setData(data);
            // console.log(data);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPlan();
    }
  }, [OrderID]);

  if (loading || !data) return <Loader />




  const plan = data ? data.Subscribtion : null;

  const handleSuccess = (details) => {
    alert(`✅ Payment successful! Thank you, ${details.payer.name.given_name}.`);
    window.location.replace("/dashboard")
    // Optionally redirect or store payment data
  };

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-white">
        <div className="text-center max-w-md px-6">
          <h2 className="text-3xl font-bold mb-2">⚠️ Invalid Checkout</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Missing or incorrect payment information. Please return to the pricing page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 shadow-lg rounded-xl p-8 md:p-12 transition-all duration-300">
    
    {/* Title */}
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 mb-2">
        Checkout Summary
      </h1>
      <p className="text-gray-500 dark:text-gray-400">
        Review your information before completing your payment
      </p>
    </div>

    {/* Two-column layout */}
    <div className="flex flex-col md:flex-row gap-8">
      
      {/* LEFT: Order + User Details */}
      <div className="w-full md:w-1/2 space-y-6">
        {/* Order Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-600 dark:text-blue-300 mb-2">
            Order Details
          </h3>
          <div className="divide-y divide-gray-200 dark:divide-slate-600 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between py-2">
              <span className="font-medium">Plan</span>
              <span>{data?.Subscribtion}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Price</span>
              <span>${data?.gross_amount}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Payment ID</span>
              <span>{OrderID}</span>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-600 dark:text-blue-300 mb-2">
            User Details
          </h3>
          <div className="divide-y divide-gray-200 dark:divide-slate-600 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between py-2">
              <span className="font-medium">Full Name</span>
              <span>{data?.firstname} {data?.lastname || ""}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Email</span>
              <span>{data?.email}</span>
            </div>
            {data?.phonenumber && (
              <div className="flex justify-between py-2">
                <span className="font-medium">Phone</span>
                <span>{data?.phonenumber}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Payment Section */}
      <div className="w-full md:w-1/2 bg-slate-50 dark:bg-slate-700 rounded-lg p-6 flex flex-col justify-between shadow-sm">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
            Payment Section
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Your payment is secure and encrypted.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xs">
            <PayPalButton
              id={OrderID}
              data={data}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  );
}
