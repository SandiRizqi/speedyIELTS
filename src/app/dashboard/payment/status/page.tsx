import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import StatusHandler from "./StatusHandler";

export const metadata: Metadata = {
  title: "Speedy IELTS | Payment status",
  viewport: "width=device-width, initial-scale=1.0",
  description:
    "",
};

const Page = () => {
  return (
    <DefaultLayout>
      <StatusHandler />
    </DefaultLayout>
  );
};

export default Page;
