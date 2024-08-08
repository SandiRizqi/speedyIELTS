
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AcademicReadingPage from "./AcademicReadingPage";

export const metadata: Metadata = {
  title: "Speedy IELTS | Academic Reading",
  description:
    "Boost your IELTS band with Speedy IELTS test platform",
};

const Page = () => {
  return (
    <DefaultLayout>
      <AcademicReadingPage />
    </DefaultLayout>
  );
};

export default Page;
