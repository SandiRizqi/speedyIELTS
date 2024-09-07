import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import IELTSAssessment from "./IELTSAssessment";


export const metadata: Metadata = {
  title: "SpeedyIELTS | Speaking Result and Feedback",
  description:
    "Boost your IELTS band with Speedy IELTS test platform",
};

const Page = () => {
  return (
    <DefaultLayout>
      <IELTSAssessment />
    </DefaultLayout>
  );
};

export default Page;
