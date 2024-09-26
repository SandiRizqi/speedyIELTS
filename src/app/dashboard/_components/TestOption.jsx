"use client"
import React from 'react';
import { useRouter } from 'next/navigation';


const TestOption = ({ title, options, isPremium, isSoon, Url, subscribtion, userQuota }) => {
    const router = useRouter();
  
    function handleStart() {
      router.replace(Url);
    }
  
    const isQuotaExceeded = subscribtion !== "PREMIUM" && userQuota?.used >= userQuota?.total;
    const isButtonDisabled = (subscribtion !== "PREMIUM" && isPremium) || isQuotaExceeded;
  
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
        <div className="p-6">
          <div className='flex flex-row justify-between items-center mb-6 space-x-4'>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{title}</h3>
            <div className="flex space-x-2">
              {isSoon && (
                <span className="bg-amber-400 text-amber-900 text-xs font-bold py-1 px-3 rounded-md animate-pulse">
                  COMING SOON
                </span>
              )}
              {isPremium && subscribtion !== "PREMIUM" && (
                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold py-1 px-3 rounded-md shadow-lg">
                  PREMIUM
                </span>
              )}
            </div>
          </div>
          <ul className="space-y-3 mb-6">
            {options.map((option, index) => (
              <li key={index} className="flex items-start group">
                <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 transition-transform duration-300 ease-in-out transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">{option}</span>
              </li>
            ))}
          </ul>
          <div className='space-y-4 mb-4'>
            {!isSoon && (
              <>
                <button 
                  onClick={handleStart} 
                  disabled={isButtonDisabled}
                  className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-102 ${
                    isButtonDisabled
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-orange-400 hover:to-orange-600'
                  }`}
                >
                  {isButtonDisabled ? 'UNAVAILABLE' : 'START TEST'}
                </button>
                {subscribtion !== "PREMIUM" && !isPremium && userQuota && (
                  <div className="w-full">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                      <span>Quota: {userQuota.used} / {userQuota.total} tests used</span>
                      <span className={userQuota.used === userQuota.total ? 'text-danger font-semibold' : ''}>{((userQuota.used / userQuota.total) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 dark:bg-slate-700 overflow-hidden">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ease-out ${
                          userQuota.used === userQuota.total ? 'bg-danger' : 'bg-gradient-to-r from-green-400 to-blue-500'
                        }`}
                        style={{ width: `${(userQuota.used / userQuota.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {isPremium && subscribtion !== "PREMIUM" && (
            <div className="mt-6">
              <a href="/dashboard/payment" className="block w-full">
                <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-102 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center justify-center space-x-2 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Unlock Unlimited Tests</span>
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };


  export default TestOption;