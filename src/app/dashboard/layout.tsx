"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import 'react-resizable/css/styles.css';
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { UserProvider } from "@/service/user";
import AuthStateChangeProvider from "@/service/auth";
import Head from "next/head";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <Head>

        {/* Primary Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Add any additional head elements you need */}

        {/* Google Ads Global Site Tag */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16709210026"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-16709210026');
                    `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                    function gtagReportConversion(url) {
                        var callback = function () {
                          if (typeof(url) != 'undefined') {
                            window.location = url;
                          }
                        };
                        gtag('event', 'speedyielts_subs_conversion', {
                            'send_to': 'AW-16709210026/wNbICLed2tQZEKqfyZ8-',
                            'transaction_id': '',
                            'event_callback': callback
                        });
                        return false;
                      }
                    `,
          }}
        />
      </Head>
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
