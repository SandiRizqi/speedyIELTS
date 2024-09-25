"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import withUser from '@/hooks/withUser';
import { FirebaseFunction } from '@/service/firebase';
import { httpsCallable } from 'firebase/functions';
import { useUser } from '@/service/user';
import Score from "./Score";
import Loader from '@/components/common/Loader';
import TestOption from '../_components/TestOption';





const IELTSTestOptionsGrid = () => {
  const user = useUser();
  const {userState} = user;
  const functions = FirebaseFunction();
  const [chartData, setChartData] = useState(null);
  const [userQuota, setUserQuota] = useState({});

  const getQuota = async () => {
    const getData = httpsCallable(functions, 'getUserQuota');
    await getData({ userId: userState.uid }).then((result) => {
      setUserQuota(result.data);
    });
  };


  const getChartData = async () => {
    const getData = httpsCallable(functions, 'getChartDataPG');
    await getData({ id: userState.uid }).then((result) => {
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
          <TestOption key={index} {...option} subscribtion={userState?.subscribtion} />
        ))}
      </div>
    </div>
  );
};

export default withUser(IELTSTestOptionsGrid);