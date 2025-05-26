import DynamicPaymentRouter from "./DynamicPaymentRouter";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speedy IELTS | Payment",
  description: "",
};



const Page = () => {
  

  return (
    <DefaultLayout>
     <DynamicPaymentRouter />
    </DefaultLayout>
  );
};

export default Page;
