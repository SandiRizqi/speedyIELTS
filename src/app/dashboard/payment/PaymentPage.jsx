'use client';

import { UserProvider } from '@/service/user';
import AuthStateChangeProvider from '@/service/auth';
import useSubscrip from './hooks/useSubscrib';
import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import PaymentSuccessPage from './status/PaymentSuccessPage';
import PaymentPendingPage from './status/PaymentPendingPage';
import PaymentErrorPage from './status/PaymentErrorPage';

const SubsButton = ({ type, action }) => {
    const { Subs, loading, status, errorMessage } = useSubscrip();

    async function handleSubs() {
        await Subs(type, action);
    }

    return (
        <a
            className="mt-4 block bg-blue-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-orange-400 focus:bg-orange-400 active:text-indigo-500 sm:mt-6"
            href="#"
            onClick={handleSubs}
        >
            {!loading ? "Get Started" : "Loading..."}
        </a>
    )
}

const PaymentPage = () => {
    const [showSnap, setShowSnap] = useState(false);
    const { loading, status, errorMessage } = useSubscrip(); // Extracting loading, status, and errorMessage from the hook

    return (
        <UserProvider>
            <AuthStateChangeProvider>
                <Breadcrumb pageName='Payment' />
                <div className="flex flex-1 max-w-screen-xl mx-auto items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    {/* Payment status handlers */}
                    {status === 'success' && (
                        <PaymentSuccessPage 
                            amount={300000} 
                            transactionId="TRANSACTION_ID" 
                            date={new Date().toLocaleDateString()} 
                        />
                    )}

                    {status === 'pending' && (
                        <PaymentPendingPage 
                            amount={300000} 
                            transactionId="TRANSACTION_ID" 
                            date={new Date().toLocaleDateString()} 
                        />
                    )}

                    {status === 'error' && (
                        <PaymentErrorPage error={errorMessage} />
                    )}

                    {!showSnap && !status && (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
                            {/* Free Plan */}
                            <div className="divide-y divide-gray-200 rounded-sm shadow-lg bg-white dark:border-strokedark dark:bg-boxdark">
                                <div className="p-6 sm:px-8">
                                    <h2 className="text-lg font-medium text-gray-900">Free Plan</h2>
                                    <p className="mt-2 sm:mt-4">
                                        <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">IDR 0</strong>
                                    </p>
                                </div>
                                <div className="p-6 sm:px-8">
                                    <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>
                                    <ul className="mt-2 space-y-2 sm:mt-4">
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Absolutely Free</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">One free mini speaking test</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Two free writing part 1 tests</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">One free listening test</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">One free reading test</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Complete result & feedback</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Previous results tracking</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Good for quick revision before the exam</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Weekly Plan */}
                            <div className="divide-y divide-gray-200 rounded-sm shadow-lg bg-white dark:border-strokedark dark:bg-boxdark">
                                <div className="p-6 sm:px-8">
                                    <h2 className="text-lg font-medium text-gray-900">Weekly Subscription</h2>
                                    <p className="mt-2 sm:mt-4">
                                        <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">IDR 150.000</strong>
                                        <span className="text-sm font-medium text-gray-700">/week</span>
                                    </p>
                                    <SubsButton type={"SPEEDYIELTS_WEEKLY"} action={setShowSnap} />
                                </div>
                                <div className="p-6 sm:px-8">
                                    <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>
                                    <ul className="mt-2 space-y-2 sm:mt-4">
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">7 Days access to All Unlimited Tests</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Access to hundreds of samples</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Complete result</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Comprehensive feedback</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">All previous results tracking</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Good for quick practice before the exam</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Improve your IELTS score rapidly</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Cancel any time</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Premium Plan */}
                            <div className="divide-y divide-gray-200 rounded-sm shadow-lg bg-white dark:border-strokedark dark:bg-boxdark">
                                <div className="p-6 sm:px-8">
                                    <h2 className="text-lg font-medium text-gray-900">Premium Plan</h2>
                                    <p className="mt-2 sm:mt-4">
                                        <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">IDR 300.000</strong>
                                        <span className="text-sm font-medium text-gray-700">/month</span>
                                    </p>
                                    <SubsButton type={"SPEEDYIELTS_PREMIUM"} action={setShowSnap} />
                                </div>
                                <div className="p-6 sm:px-8">
                                    <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>
                                    <ul className="mt-2 space-y-2 sm:mt-4">
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">31 Days access to All Unlimited Tests</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Access to hundreds of samples</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Complete result</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Comprehensive feedback</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">All previous results tracking</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Good for thorough practice before the exam</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Improve your IELTS score rapidly</span>
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-gray-700">Cancel any time</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    <div id="snap-container" className={showSnap ? 'bg-white p-4 rounded-lg shadow-md w-full max-w-md' : 'hidden'}></div>
                </div>
            </AuthStateChangeProvider>
        </UserProvider>
    )
};

export default PaymentPage;
