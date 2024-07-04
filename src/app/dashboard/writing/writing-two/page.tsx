import WritingTwoPage from "./WritingTwoPage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Speedy IELTS | Writing Part 2",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const Page = () => {
  return (
    <DefaultLayout>
      <WritingTwoPage />
    </DefaultLayout>
  );
};

export default Page;
