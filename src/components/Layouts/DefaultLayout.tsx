"use client";
import React, { useState, ReactNode, useRef, useEffect } from "react";
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
  const fullScreenRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const notFull: string[] = ['/dashboard', '/dashboard/settings', '/dashboard/payment']


  const handleFullscreen = () => {
    if (fullScreenRef.current) {
      if (!document.fullscreenElement) {
        fullScreenRef.current.requestFullscreen().catch((err: any) => {
          console.log(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    if(!notFull.includes(pathname)) {
      handleFullscreen();
    }
  }, [pathname])

  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 h-full min-h-screen overflow-y-auto" ref={fullScreenRef}>
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