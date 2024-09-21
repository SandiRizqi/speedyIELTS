"use client";
import React, { useState, ReactNode, useEffect} from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import withProtected from "@/hooks/withProtected";
import Motion from "@/app/dashboard/_components/Motion";
import { usePathname } from "next/navigation";


const DefaultLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const fullpage = ['/dashboard/reading/academic-reading', '/dashboard/payment']

  useEffect(() => {
    // Create a new script element
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16709210026';
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Initialize gtag after the script has been loaded
    script.onload = () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'AW-16709210026');

      // Function to report conversion
      (window as any).gtagReportConversion = (url?: string) => {
        const callback = () => {
          if (typeof url !== 'undefined') {
            window.location.href = url;
          }
        };
        gtag('event', 'speedyielts_subs_conversion', {
          'send_to': 'AW-16709210026/wNbICLed2tQZEKqfyZ8-',
          'transaction_id': '',
          'event_callback': callback,
        });
        return false;
      };
    };

    // Cleanup script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);
 

  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main >
            <div className={fullpage.includes(pathname) ?  "mx-auto max-w-screen p-4 md:p-6 2xl:p-10 h-full min-h-screen": "mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 h-full min-h-screen"}>
              <Motion>
                {children}
              </Motion>
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}


export default withProtected(DefaultLayout);