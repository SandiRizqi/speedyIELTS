import React from "react";
import { Metadata } from "next";
import Login from "./Login"

export const metadata: Metadata = {
  title: "SpeedyIELTS | Sign In",
  description: "Boost your IELTS band with Speedy IELTS test platform",
  // other metadata
};

const SignInPage: React.FC = () => {
  return (
  <Login />
  );
};

export default SignInPage;
