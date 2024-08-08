import WritingFullPage from "./WritingFullPage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


export const metadata: Metadata = {
    title: "Speedy IELTS | Writing ",
    description:
      "Boost your IELTS band with Speedy IELTS test platform",
  };
  
export default function Home() {
  return (
    <>
      <DefaultLayout>
        <WritingFullPage />
      </DefaultLayout>
    </>
  );
}
