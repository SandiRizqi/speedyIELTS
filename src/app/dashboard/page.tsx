import MyDashboard from "@/components/Dashboard/MyDashboard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "SpeedyIELTS | Dashboard",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
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
