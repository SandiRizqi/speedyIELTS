"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import UpgradeCard from "./UpgradeCard";
import AppVersion from "./AppVersion";
import { useUser } from "@/service/user";


type ColorVariant = 'blue' | 'green' | 'red' | 'yellow';

interface BadgeProps {
  children: React.ReactNode;
  color?: ColorVariant;
}

const colorClasses: Record<ColorVariant, string> = {
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  red: 'bg-red text-white',
  yellow: 'bg-yellow-100 text-yellow-800',
};

const Badge: React.FC<BadgeProps> = ({ children, color = 'blue' }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      {children}
    </span>
  );
};

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_130_9801)">
              <path
                d="M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z"
                fill=""
              />
              <path
                d="M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z"
                fill=""
              />
            </g>
            <defs>
              <clipPath id="clip0_130_9801">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(0 0.052124)"
                />
              </clipPath>
            </defs>
          </svg>
        ),
        label: "Dashboard",
        route: "/dashboard",
      },

    ],
  },
  {
    name: "PRACTICE MODULES",
    menuItems: [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" width="24px" height="24px">
            <path d="M12 3C7.03 3 3 7.03 3 12v7c0 1.1.9 2 2 2h1v-9H5v-1c0-3.86 3.14-7 7-7s7 3.14 7 7v1h-1v9h1c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9zm-3 11v7H8v-7h1zm8 7v-7h1v7h-1z" />
          </svg>

        ),
        label: "Listening",
        route: "/dashboard/listening",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M19 2H9C7.897 2 7 2.897 7 4V18C7 19.103 7.897 20 9 20H19C20.103 20 21 19.103 21 18V4C21 2.897 20.103 2 19 2ZM19 18H9V4H19V18Z"
            />
            <path
              d="M5 4H4C2.897 4 2 4.897 2 6V20C2 21.103 2.897 22 4 22H14C15.103 22 16 21.103 16 20V19H6C4.897 19 4 18.103 4 17V6C4 4.897 4.897 4 6 4H5V4Z"
            />
          </svg>

        ),
        label: "Reading",
        route: "/dashboard/reading",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M21 4.85l-1.17-1.17a2.5 2.5 0 00-3.54 0L3.5 16.5V20h3.5L20.85 7.35a2.5 2.5 0 000-3.54L21 4.85zM9 18H6v-3L17.85 3.15l3 3L9 18z"
            />
          </svg>

        ),
        label: "Writing",
        route: "/dashboard/writing",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" width="24px" height="24px">
            <path d="M12 2C10.35 2 9 3.35 9 5v6c0 1.65 1.35 3 3 3s3-1.35 3-3V5c0-1.65-1.35-3-3-3zm0 12c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2s2 .9 2 2v7c0 1.1-.9 2-2 2zm-7-5v2c0 3.87 3.13 7 7 7s7-3.13 7-7v-2h2v2c0 4.41-3.59 8-8 8s-8-3.59-8-8v-2h2zm7 10h-2v-2h2v2z" />
          </svg>



        ),
        label: "Speaking",
        route: "/dashboard/speaking",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2h-5v2h2v2H7v-2h2v-2H4a2 2 0 01-2-2V7a2 2 0 012-2zm0 2v10h16V7H4z"
            />
          </svg>

        ),
        label: "Complete test",
        route: "/dashboard/complete-test",
      },
    ]
  },
  {
    name: "LEARN",
    menuItems: [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="1.5" fill="currentColor" />
          </svg>
        ),
        label: "Learning Plans",
        soonBadge: true,
        route: "#",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="4" cy="4" r="2" fill="currentColor" />
            <circle cx="20" cy="20" r="2" fill="currentColor" />
            <circle cx="4" cy="20" r="2" fill="currentColor" />
            <circle cx="20" cy="4" r="2" fill="currentColor" />
          </svg>
        ),
        label: "Exercises",
        soonBadge: true,
        route: "#",
      }
    ],
  },
  {
    name: "OTHERS",
    menuItems: [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M3 4h18c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v2h18V6H3zm0 4v8h18v-8H3z"
            />
          </svg>
        ),
        label: "Payment",
        route: "/dashboard/payment",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H5.414a1 1 0 00-.707.293l-2.707 2.707A1 1 0 010 19V5a2 2 0 012-2zm4 5a1 1 0 100-2 1 1 0 000 2zm3-1a1 1 0 100-2 1 1 0 000 2zm3 1a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        ),
        label: "Feedback",
        route: "#",
      }
    ],
  }
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const user = useUser();
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

  }, [pathname]);

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            <Image
              width={70}
              height={70}
              src={"/images/logo/type/logo_round.png"}
              alt="Logo"
              priority
              className="rounded-full"
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
          <div className="flex flex-col justify-between mx-auto gap-2 w-full">
            {user.subscribtion !== "PREMIUM" && (<UpgradeCard />)}
            <AppVersion />
          </div>

        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
