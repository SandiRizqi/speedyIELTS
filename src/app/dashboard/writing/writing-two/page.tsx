import WritingTwoPage from "./WritingTwoPage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Speedy IELTS | Writing Part 2",
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
