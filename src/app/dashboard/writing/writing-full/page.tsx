import { Metadata } from "next";
import Container from "./Container";


export const metadata: Metadata = {
    title: "Speedy IELTS | Writing ",
    description:
      "Boost your IELTS band with Speedy IELTS test platform",
  };
  
export default function Home() {
  return (
    <>
        <Container />
    </>
  );
}
