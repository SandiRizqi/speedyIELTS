
'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";


const Sidebar = () => {
    const  path = usePathname();
    

    return (
        <div className="flex h-screen max-w-max justify-between  bg-white z-50 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-900">
            <div className="flex flex-col border-r border-sm bg-white dark:bg-slate-900 dark:text-slate-400 dark:border-slate-900">
                <div className="inline-flex size-14 items-center justify-center dark:border-slate-700">
                    <a className="block text-teal-600 dark:border-slate-800" href="/dashboard">
                        <span className="sr-only">Home</span>
                        <img
                            alt=""
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            className="h-8 w-auto dark:border-slate-800"
                        />
                    </a>
                </div>

                <div className="dark:bg-slate-900 dark:text-slate-400 dark:border-slate-900">
                    <div className="px-2">
                    <div className="py-2 pb-1">
                            <Link
                                href="/dashboard"
                                className={`t group relative flex justify-center rounded ${path === '/dashboard' ? 'bg-indigo-100 text-indigo-700': 'text-gray-500'} px-2 py-1.5 `}
                            >
                                <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="1"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>

                                <span
                                    className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                >
                                    Dashboard
                                </span>
                            </Link>
                        </div>

                        

                        <ul className="space-y-1 border-t border-gray-100 pt-4">

                            <li>
                                <a
                                    href="/dashboard/payment"
                                    className={`t group relative flex justify-center rounded ${path === '/dashboard/payment' ? 'bg-indigo-100 text-indigo-700': 'text-gray-500'} px-2 py-1.5 `}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5 opacity-75"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>

                                    <span
                                        className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible z-50"
                                    >
                                        Billing
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5 opacity-75"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                        />
                                    </svg>

                                    <span
                                        className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                    >
                                        Invoices
                                    </span>
                                </a>
                            </li>

                            
                        </ul>
                    </div>
                </div>
            </div>

            
        </div>

    )
};

export default Sidebar;