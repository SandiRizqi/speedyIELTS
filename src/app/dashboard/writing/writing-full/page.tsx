import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import WritingFullPage from "./WritingFullPage";


export const metadata: Metadata = {
    title: "Speedy IELTS | Writing ",
    description:
      "Boost your IELTS band with Speedy IELTS test platform",
  };
  
export default function Home() {
  return (
    <>
      <DefaultLayout>
        <WritingFullPage isFullTest={false} setCollectAnswer={null} setNextTest={null} savedQuestion={null} savedAnswer={null}/>
      </DefaultLayout>
    </>
  );
}
