import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TestOptionGrid from "./TestOptionGrid";


export const metadata: Metadata = {
    title: "Speedy IELTS | Writing ",
    description:
      "Boost your IELTS band with Speedy IELTS test platform",
  };
  
export default function Home() {
  return (
    <>
      <DefaultLayout>
        <TestOptionGrid />
      </DefaultLayout>
    </>
  );
}
