import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Container from "./Container";



export const metadata: Metadata = {
  title: "SpeedyIELTS | Speaking",
  description:
    "Boost your IELTS band with Speedy IELTS test platform",
};

const Page = () => {
  return (
      <Container />
  );
};

export default Page;
