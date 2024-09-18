import React from "react";
import Link from "next/link";
import SignUpPage from "./SignUpPage";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "SpeedyIELTS | Sign Up",
  description: "Boost your IELTS band with Speedy IELTS test platform",
  // other metadata
};

const SignUp: React.FC = () => {
  return (
  
    <>
    <SignUpPage />
    </>
  );
};

export default SignUp;
