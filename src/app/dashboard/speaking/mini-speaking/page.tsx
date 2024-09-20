import { Metadata } from "next";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Container from "./Container";



export const metadata: Metadata = {
  title: "SpeedyIELTS | Mini Speaking",
  description:
    "Boost your IELTS band with Speedy IELTS test platform",
};

const Page = () => {
  return (
    // <DefaultLayout>
      <Container />
    // </DefaultLayout>
  );
};

export default Page;
