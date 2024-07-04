import { Metadata } from "next";
import SettingsPage from "./SettingsPage";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Speedy IELTS | Settings",
  description:
    "This is Next.js Settings page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Settings = () => {

  return (
    <DefaultLayout>
      <SettingsPage />
    </DefaultLayout>
  );
};

export default Settings;
