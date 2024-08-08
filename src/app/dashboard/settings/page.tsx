import { Metadata } from "next";
import SettingsPage from "./SettingsPage";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Speedy IELTS | Settings",
  description:
    "Boost your IELTS band with Speedy IELTS test platform",
};

const Settings = () => {

  return (
    <DefaultLayout>
      <SettingsPage />
    </DefaultLayout>
  );
};

export default Settings;
