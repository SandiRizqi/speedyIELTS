
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AcademicReadingPage from "./AcademicReadingPage";

export const metadata: Metadata = {
  title: "Speedy IELTS | Academic Reading",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const Page = () => {
  return (
    <DefaultLayout>
      <AcademicReadingPage />
    </DefaultLayout>
  );
};

export default Page;
