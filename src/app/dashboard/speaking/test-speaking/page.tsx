import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FullSpeakingPage from "./FullSpeakingPage";


export const metadata: Metadata = {
  title: "SpeedyIELTS | Speaking",
  description:
    "Boost your IELTS band with Speedy IELTS test platform",
};

const Page = () => {
  return (
    <DefaultLayout>
      <FullSpeakingPage />
    </DefaultLayout>
  );
};

export default Page;