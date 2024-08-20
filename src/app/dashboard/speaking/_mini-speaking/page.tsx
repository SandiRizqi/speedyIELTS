import FullSpeakingPage from "./FullSpeakingPage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "SpeedyIELTS | Mini Speaking",
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
