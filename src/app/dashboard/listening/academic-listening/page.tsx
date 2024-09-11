
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TestLayout from "@/components/Layouts/TestLayout";
import AcademicListeningPage from "./AcademicListeningPage";

export const metadata: Metadata = {
  title: "Speedy IELTS | Academic Listening",
  description:
    "Boost your IELTS band with Speedy IELTS test platform",
};

const Page = () => {

  return (
    <TestLayout>
      <AcademicListeningPage />
    </TestLayout>
  );
};

export default Page;
