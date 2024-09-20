import React from "react";
import { Metadata } from "next";
import ResetPage from "./ResetPage";

export const metadata: Metadata = {
  title: "SpeedyIELTS | Reset Password",
  description: "Boost your IELTS band with Speedy IELTS test platform",
  // other metadata
};

const SignInPage: React.FC = () => {
  return (
  <ResetPage />
  );
};

export default SignInPage;
