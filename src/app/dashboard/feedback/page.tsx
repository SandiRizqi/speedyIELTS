import FeedbackForm from "./FeedbackForm";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


export const metadata: Metadata = {
  title: "Speedy IELTS | Send Us Your Feedback",
  description:
    "",
};

const Page = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col item-center h-screen">
      <FeedbackForm />
      </div>
    </DefaultLayout>
  );
};

export default Page;
