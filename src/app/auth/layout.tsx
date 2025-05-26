"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import Head from "next/head";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { UserProvider } from "@/service/user";
import AuthStateChangeProvider from "@/service/auth";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LH95ET351W"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LH95ET351W');
          `}
        </Script>
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <UserProvider>
            <AuthStateChangeProvider>
              {loading ? <Loader /> : children}
            </AuthStateChangeProvider>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
