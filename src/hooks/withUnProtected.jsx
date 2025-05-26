"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/service/user";
import { useEffect } from "react";

const withUnProtected = (Pages) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { userState } = useUser();
    const redirectTo = searchParams.get("redirect");

    useEffect(() => {
      if (userState?.uid) {
        // Redirect to custom redirect path if provided, else default to dashboard
        router.replace(redirectTo || "/dashboard");
      }
    }, [userState, router, redirectTo]);

    // While waiting for router.replace to execute, render nothing
    if (userState?.uid) {
      return null;
    }

    return <Pages {...props} />;
  };

  Wrapper.displayName = "withUnProtected";
  return Wrapper;
};

export default withUnProtected;
