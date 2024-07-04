import WritingFullPage from "./WritingFullPage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


export const metadata: Metadata = {
    title: "Speedy IELTS | Writing ",
    description:
      "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
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
