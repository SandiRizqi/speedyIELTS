
import { Metadata } from "next";
import AcademicReadingPage from "./AcademicReadingPage";

export const metadata: Metadata = {
  title: "Speedy IELTS | Academic Reading",
  description:
    "Boost your IELTS band with Speedy IELTS test platform",
};

const Page = () => {

  return (
    <>
      <AcademicReadingPage />
    </>
  );
};

export default Page;
