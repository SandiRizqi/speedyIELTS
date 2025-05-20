import MyDashboard from "@/components/Dashboard/MyDashboard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";



export const metadata: Metadata = {
  title:
    "SpeedyIELTS | Dashboard",
  description: "Boost your IELTS band with Speedy IELTS test platform",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <MyDashboard />
      </DefaultLayout>
    </>
  );
}
