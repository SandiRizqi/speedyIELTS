
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AcademicListeningPage from "./AcademicListeningPage";

export const metadata: Metadata = {
  title: "Speedy IELTS | Academic Listening",
  description:
    "Boost your IELTS band with Speedy IELTS test platform",
};

const Page = () => {

  return (
    <DefaultLayout>
      <AcademicListeningPage />
    </DefaultLayout>
  );
};

export default Page;
