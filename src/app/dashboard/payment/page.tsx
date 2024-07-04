import PaymentPage from "./PaymentPage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Speedy IELTS | Payment",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const Page = () => {
  return (
    <DefaultLayout>
      <PaymentPage />
    </DefaultLayout>
  );
};

export default Page;
