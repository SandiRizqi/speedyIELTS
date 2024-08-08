import React from "react";
import { Metadata } from "next";
import SignIn from "./SignIn";

export const metadata: Metadata = {
  title: "Speedy IELTS | Sign In",
  description: "Boost your IELTS band with Speedy IELTS test platform",
  // other metadata
};

const SignInPage: React.FC = () => {
  return (
  <SignIn />
  );
};

export default SignInPage;
