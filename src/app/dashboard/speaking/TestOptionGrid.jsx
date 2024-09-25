"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import withUser from '@/hooks/withUser';
import { FirebaseFunction } from '@/service/firebase';
import { httpsCallable } from 'firebase/functions';
import { useUser } from '@/service/user';
import Score from "./Score";
import Loader from '@/components/common/Loader';
import { useRouter } from 'next/navigation';


const TestOption = ({ title, options, isPremium, isSoon, Url, subscribtion, userQuota }) => {
  const router = useRouter();

  function handleStart() {
    router.replace(Url);
  }


  return (
    <div className="bg-white p-4 pb-0 shadow-lg dark:bg-slate-600 dark:text-white">
      <div className='flex flex-row justify-between border-b border-slate-300 mb-4'>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {isSoon && (
          <span className="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded mb-2 inline-block">
            COMMING SOON
          </span>
        )}
        {isPremium && subscribtion !== "PREMIUM" && (
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold py-1 px-2 rounded mb-2 shadow-lg h-full">
            PREMIUM
          </span>
        )}
      </div>
      <ul className="space-y-2 mb-4">
        {options.map((option, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-sm">{option}</span>
          </li>
        ))}
      </ul>
      <div className='flex space-x-2 justify-center mb-4'>
      {!isSoon && (
          <>
            <button 
              onClick={() => handleStart()} 
              disabled={subscribtion !== "PREMIUM" && isPremium || userQuota.used >= userQuota.total}
              className={`flex items-center justify-center py-2 px-6 text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
                subscribtion !== "PREMIUM" && isPremium || userQuota.used >= userQuota.total ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-orange-400'
              }`}
            >
              START TEST
            </button>
            {subscribtion !== "PREMIUM" && !isPremium && (
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300 mb-1">
                  <span>Quota: {userQuota.used} / {userQuota.total} tests used</span>
                  <span>{(userQuota.used / userQuota.total * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${userQuota.used / userQuota.total * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {isPremium && subscribtion !== "PREMIUM" && (
        <div className="flex flex-col items-center space-x-8">
          <div className="relative">
            <a href="/dashboard/payment">
              <button className="bg-slate-300 hover:bg-teal-400 text-black hover:text-white px-4 py-1 rounded-t-xl flex items-center space-x-2 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11V7a4 4 0 10-8 0v4m16 0V7a4 4 0 00-8 0v4m12 0h-4m-4 0h4m4 0a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8z" />
                </svg>
                <span>Unlock unlimited tests</span>
              </button>
            </a>

          </div>
        </div>
      )}
    </div>
  );
}




const IELTSTestOptionsGrid = () => {
  const user = useUser();
  const functions = FirebaseFunction();
  const [chartData, setChartData] = useState(null);
  const [userQuota, setUserQuota] = useState({});

  const getQuota = async () => {
    const getData = httpsCallable(functions, 'getUserQuota');
    await getData({ userId: user.uid }).then((result) => {
      setUserQuota(result.data);
    });
  };


  const getChartData = async () => {
    const getData = httpsCallable(functions, 'getChartDataPG');
    await getData({ id: user.uid }).then((result) => {
      setChartData(result.data);
    });
  };


  useEffect(() => {
    Promise.all([getChartData(), getQuota()])
  }, [])


  if (!chartData) {
    return <Loader />
  }


  const testOptions = [
    {
      title: "MINI SPEAKING",
      Url: "/dashboard/speaking/mini-speaking",
      userQuota: {used: userQuota["speaking-questions"] || 0, total: 2},
      options: [
        "3 - 5 minutes long",
        "Instant result",
        "Comprehensive feedback",
        "Only contains IELTS speaking part 1",
        "Good for quick revision before the exam",
        "The Latest speaking topics and questions",
        "Graded on all four IELTS parameters: Grammar, Lexical Resources, Pronunciation and Fluency"
      ],
    },
    {
      title: "FULL SPEAKING",
      isPremium: true,
      Url: "/dashboard/speaking/full-speaking",
      options: [
        "10 - 15 minutes long",
        "Instant result",
        "Comprehensive feedback",
        "Contains all the IELTS speaking parts",
        "Good for complete practice before the exam",
        "The Latest speaking topics and questions",
        "Graded on all four IELTS parameters: Grammar, Lexical Resources, Pronunciation and Fluency"
      ],
    },
  ]

  return (
    <div className="container mx-auto p-4">
       <div className="absolute inset-0 overflow-hidden -z-1">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-blue-600 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-4000"></div>
      </div> 
      <div className='flex flex-row justify-between border-b border-slate-300 mb-6 gap-4'>
        <div className='text-black dark:text-slate-400'>
          <h2 className="text-2xl font-bold mb-2">Choose an IELTS Speaking Test to begin.</h2>
          <p className="text-gray-600 mb-2">The only resource you will ever need for your IELTS speaking preparation.</p>
        </div>
        <div className='relative'>
          <Score title="Estimated Score" score={chartData['speaking']} size={"medium"} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {testOptions.map((option, index) => (
          <TestOption key={index} {...option} subscribtion={user?.subscribtion} />
        ))}
      </div>
    </div>
  );
};

export default withUser(IELTSTestOptionsGrid);