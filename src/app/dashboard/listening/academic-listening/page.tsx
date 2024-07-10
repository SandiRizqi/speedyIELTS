
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AcademicListeningPage from "./AcademicListeningPage";

export const metadata: Metadata = {
  title: "Speedy IELTS | Academic Listening",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const Page = () => {
  return (
    <DefaultLayout>
      <AcademicListeningPage />
    </DefaultLayout>
  );
};

export default Page;
