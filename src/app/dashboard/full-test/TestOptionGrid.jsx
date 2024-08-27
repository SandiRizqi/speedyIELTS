"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import withUser from '@/hooks/withUser';
import { FirebaseFunction } from '@/service/firebase';
import { httpsCallable } from 'firebase/functions';
import { useUser } from '@/service/user';
import Score from "./Score";
import Loader from '@/components/common/Loader';


const TestOption = ({ title, options, isPremium, isSoon, Url }) => (
  <div className="bg-white p-4 pb-0 shadow-lg dark:bg-slate-600 dark:text-white">
    <div className='flex flex-row justify-between border-b border-slate-300 mb-4'>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {isSoon && (
        <span className="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded mb-2 inline-block">
          COMMING SOON
        </span>
      )}
      {isPremium && (
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
    {!isSoon && (<a href={Url} className='flex justify-center'><button className="bg-blue-600 hover:bg-orange-400 text-white font-bold py-3 px-8  transition-colors duration-300 mb-4">START TEST</button></a>)}
    {isPremium && (
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

const IELTSTestOptionsGrid = () => {
  const user = useUser();
  const functions = FirebaseFunction();
  const [chartData, setChartData] = useState(null);


  const getChartData = async () => {
    const getData = httpsCallable(functions, 'getChartDataPG');
    await getData({ id: user.uid }).then((result) => {
      setChartData(result.data);
    });
  };


  useEffect(() => {
    getChartData();
  }, [])

  if (!chartData) {
    return <Loader />
  }


  const testOptions =  [
      {
        title: "ACADEMIC IELTS TEST",
        isPremium: true,
        Url: "/dashboard/full-test/academic",
        options: [
          "2.5 to 3 hours long",
          "Suitable for complete IELTS Academic practice",
          "It contains all four sections: Speaking, Writing, Listening, and Reading",
          "Instant result within minutes",
          "Comprehensive feedback",
          "Contains latest IELTS topics and questions",
          "The testing interface is exactly like the real tes"
        ],
      },
      {
        title: "GENERAL IELTS TEST",
        isSoon: true,
        Url: "#",
        options: [
          "2.5 to 3 hours long",
          "Suitable for complete IELTS General practice",
          "It contains all four sections: Speaking, Writing, Listening, and Reading",
          "Instant result within minutes",
          "Comprehensive feedback",
          "Contains latest IELTS topics and questions",
          "The testing interface is exactly like the real tes"
        ],
      },
    ]

  return (
    <div className="container mx-auto p-4">
      <div className='flex flex-row justify-between border-b border-slate-300 mb-6 gap-4'>
        <div className='text-black dark:text-slate-400'>
          <h2 className="text-2xl font-bold mb-2">Choose an IELTS Full Skill Test to begin.</h2>
          <p className="text-gray-600 mb-2">Choose a test to begin, and get your results in just a few minutes by AI.</p>
        </div>
        <div className='relative'>
          <Score title="Estimated Score" score={chartData['full']} size={"medium"}/>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {testOptions.map((option, index) => (
          <TestOption key={index} {...option} />
        ))}
      </div>
    </div>
  );
};

export default withUser(IELTSTestOptionsGrid);