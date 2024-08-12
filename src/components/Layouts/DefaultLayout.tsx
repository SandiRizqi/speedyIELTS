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
  const fullpage = ['/dashboard/reading/academic-reading']
 

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
          <main>
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