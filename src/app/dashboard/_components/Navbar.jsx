'use client'
import { useState, useEffect } from "react";
import { UserProvider } from "@/app/service/user";
import AuthStateChangeProvider from "@/app/service/auth";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";
import { LIST_MENU } from "./conts";


const MenuOverlay = ({ navbarOpen }) => {
    

    return (
        <nav
            className={`fixed flex top-0 left-0 w-full md:order-1 p-10 z-10 h-screen justify-center pt-24 bg-white text-gray-500 bg-opacity-100 transform delay-100 transition-all duration-300 ${navbarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
                }`}
        >
            <div className="flex h-screen flex-1  w-full pl-14 justify-between bg-white" >

                <div className="px-4 py-6 w-full">

                    <ul className="mt-14 space-y-1">



                        {LIST_MENU.map((obj, idx) => (
                            <li key={idx}>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary
                                        className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <span className="text-sm font-medium"> {obj.title} </span>

                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </summary>

                                    <ul className="mt-2 space-y-1 px-4">
                                        {obj.children.map((obj, idx) => (
                                            <li key={idx}>
                                                <Link
                                                    href={obj.url}
                                                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                >
                                                    {obj.title}
                                                </Link>
                                            </li>
                                        ))}

                                    </ul>
                                </details>
                            </li>
                        ))}

                    </ul>
                    
                </div>

            </div>

        </nav>
    );
};





const Navbar = () => {
    const [indexOpen, setIndexOpen] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [isdark, setIsdark] = useState(false);
    const [isload, setIsLoad] = useState(false);

    
    

    function handleDark (value) {
        console.log("click")
        if (value) {
            setIsdark(true)
            localStorage.setItem("isdark", "true");
        } else {
            localStorage.setItem("isdark", "false");
            setIsdark(false);
        }
    };

    useEffect(() => {
        if (isload) {
            if (localStorage.getItem("isdark") === "true") {
                setIsdark(true);
                document.documentElement.classList.add('dark');
            } else {
                setIsdark(false);
                document.documentElement.classList.remove('dark');
            }
        }
    },[isload, isdark])

    useEffect(() => {
        setIsLoad(true)
    },[])



    return (
        <UserProvider>
            <AuthStateChangeProvider>
                <header className="fixed top-0  bg-white border-b flex max-w-screen items-center border-sm pr-4  md:shadow-md dark:bg-slate-900 dark:text-white dark:border-slate-900">
                    <div className="px-4 sm:px-6 lg:px-8 w-screen flex items-center justify-end">
                        <div className="flex h-14 items-center">
                            <div className="md:flex md:items-center md:gap-12">
                                <nav aria-label="Global" className="hidden md:block">
                                    <ul className="flex items-center gap-4 text-sm">

                                    </ul>
                                </nav>

                                <div className="flex items-center gap-4">
                                    
                                    
                                        
                                        <label className="flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full" htmlFor="light-switch"  onClick={() => handleDark(!isdark)}>
                                            <input type="checkbox" name="light-switch"  className="light-switch sr-only"  value={isdark} />
                                            <svg className="w-4 h-4 dark:hidden" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                                <path className="fill-current text-slate-400" d="M7 0h2v2H7V0Zm5.88 1.637 1.414 1.415-1.415 1.413-1.414-1.414 1.415-1.414ZM14 7h2v2h-2V7Zm-1.05 7.433-1.415-1.414 1.414-1.414 1.415 1.413-1.414 1.415ZM7 14h2v2H7v-2Zm-4.02.363L1.566 12.95l1.415-1.414 1.414 1.415-1.415 1.413ZM0 7h2v2H0V7Zm3.05-5.293L4.465 3.12 3.05 4.535 1.636 3.121 3.05 1.707Z" />
                                                <path className="fill-current text-slate-500" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
                                            </svg>
                                            <svg className="w-4 h-4 hidden dark:block" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                                <path className="fill-current text-slate-400" d="M6.2 2C3.2 2.8 1 5.6 1 8.9 1 12.8 4.2 16 8.1 16c3.3 0 6-2.2 6.9-5.2C9.7 12.2 4.8 7.3 6.2 2Z" />
                                                <path className="fill-current text-slate-500" d="M12.5 6a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 6Z" />
                                            </svg>
                                            <span className="sr-only">Switch</span>
                                        </label>
                                   

                                    <ProfileMenu indexOpen={indexOpen} setIndexOpen={setIndexOpen} />

                                    <div className="block md:hidden">
                                        <button
                                            className="lg:hidden flex top-0 right-0 z-20 relative w-10 h-10  focus:outline-none"
                                            onClick={() => setToggle(!toggle)}
                                        >
                                            <div className="absolute w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                                                <span
                                                    className={`absolute h-0.5 w-5 bg-gray-500 transform transition duration-300 ease-in-out ${toggle ? "rotate-45 delay-200" : "-translate-y-1.5"
                                                        }`}
                                                ></span>
                                                <span
                                                    className={`absolute h-0.5 bg-gray-500 transform transition-all duration-200 ease-in-out ${toggle ? "w-0 opacity-50" : "w-5 delay-200 opacity-100"
                                                        }`}
                                                ></span>
                                                <span
                                                    className={`absolute h-0.5 w-5 bg-gray-500 transform transition duration-300 ease-in-out ${toggle ? "-rotate-45 delay-200" : "translate-y-1.5"
                                                        }`}
                                                ></span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </header>
                <MenuOverlay navbarOpen={toggle} />
            </AuthStateChangeProvider>
        </UserProvider>
    );
};

export default Navbar;
