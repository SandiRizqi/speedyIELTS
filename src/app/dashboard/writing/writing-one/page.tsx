import WritingOnePage from "./WritingOnePage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Speedy IELTS | Writing Part 1",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const Page = () => {
  return (
    <DefaultLayout>
      <WritingOnePage />
    </DefaultLayout>
  );
};

export default Page;
