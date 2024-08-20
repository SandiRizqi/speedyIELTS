import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname();

  return (
    <>
      <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
        {item.map((item: any, index: number) => (
          <li key={index}>
            <Link
              href={item.route}
              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === item.route ? "text-white" : ""
                }`}
            >
              {item.label}
              <div className="flex items-center space-x-2">
                {item.soonBadge && (
                  <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-yellow-400 rounded-full">
                    Soon
                  </span>
                )}

              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarDropdown;
