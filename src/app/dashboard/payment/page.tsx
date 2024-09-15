import PaymentPage from "./PaymentPage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


export const metadata: Metadata = {
  title: "Speedy IELTS | Payment",
  viewport: "width=device-width, initial-scale=1.0",
  description:
    "",
};

const Page = () => {
  return (
    <DefaultLayout>
      <PaymentPage />
    </DefaultLayout>
  );
};

export default Page;
