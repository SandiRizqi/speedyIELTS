import WritingTwoPage from "./WritingTwoPage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "SpeedyIELTS | Writing Task 2",
  description:
    "Boost your IELTS band with Speedy IELTS test platform",
};

const Page = () => {
  return (
    <DefaultLayout>
      <WritingTwoPage />
    </DefaultLayout>
  );
};

export default Page;
