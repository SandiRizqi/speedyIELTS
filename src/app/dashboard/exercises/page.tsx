import MiniPractice from "./MiniPractice";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


export const metadata: Metadata = {
  title: "Speedy IELTS | Exercices",
  description:
    "",
};

const Page = () => {
  return (
    <DefaultLayout>
        
      <MiniPractice />
    </DefaultLayout>
  );
};

export default Page;
