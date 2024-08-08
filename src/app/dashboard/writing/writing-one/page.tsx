import WritingOnePage from "./WritingOnePage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Speedy IELTS | Writing Part 1",
  description:
    "Boost your IELTS band with Speedy IELTS test platform",
};

const Page = () => {
  return (
    <DefaultLayout>
      <WritingOnePage />
    </DefaultLayout>
  );
};

export default Page;
