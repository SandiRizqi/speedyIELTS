"use client";

import { useEffect, useState } from "react";
import PaymentPage from "./PaymentPage";
import PaypalPage from "./paypall/PaypalPage";
import Loader from "@/components/common/Loader";

const DynamicPaymentRouter = () => {
  const [isIndonesia, setIsIndonesia] = useState<boolean | null>(null);

  useEffect(() => {
    async function detectLocation() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setIsIndonesia(data.country_code === "ID");
      } catch (error) {
        console.error("Location detection failed:", error);
        setIsIndonesia(false);
      }
    }

    detectLocation();
  }, []);

  if (isIndonesia === null) {
    return (
      <Loader />
    );
  }

  return isIndonesia ? <PaymentPage /> : <PaypalPage />;
};

export default DynamicPaymentRouter;
