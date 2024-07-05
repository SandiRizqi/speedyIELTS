import FullSpeakingPage from "./FullSpeakingPage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Speedy IELTS | Speaking",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const Page = () => {
  return (
    <DefaultLayout>
      <FullSpeakingPage />
    </DefaultLayout>
  );
};

export default Page;
