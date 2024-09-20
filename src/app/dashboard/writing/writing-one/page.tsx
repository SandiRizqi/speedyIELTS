import WritingOnePage from "./WritingOnePage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "SpeedyIELTS | Writing Task 1",
  description:
    "Boost your IELTS band with Speedy IELTS test platform",
};

const Page = () => {
  return (
    
      <WritingOnePage />
    
  );
};

export default Page;
