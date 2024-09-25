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
      title: "GENERAL TASK 1",
      isSoon: true,
      options: [
        "General IELTS part 1 letter writing",
        "Instant result",
        "Comprehensive feedback",
        "33% of your total IELTS writing score",
        "The latest writing topics and questions",
        "Graded on all four IELTS parameters: Grammar, Coherence & Cohesion, Lexical Resource, and Task Response"
      ],
    },
    {
      title: "ACADEMIC TASK 1",
      Url: "/dashboard/writing/writing-one",
      userQuota: {used: userQuota["writing1-questions"] || 0, total: 2},
      options: [
        "Academic IELTS Task 1 writing",
        "Instant result",
        "Comprehensive feedback",
        "33% of your total IELTS writing score",
        "The latest writing topics and questions",
        "Graded on all four IELTS parameters: Grammar, Coherence & Cohesion, Lexical Resource, and Task Response"
      ],
    },
    {
      title: "ACADEMIC ESSAY WRITING",
      isPremium: true,
      Url: "/dashboard/writing/writing-two",
      options: [
        "IELTS Task 2 essay writing",
        "Instant result",
        "Comprehensive feedback",
        "66% of your total IELTS writing score",
        "The latest writing topics and questions",
        "Graded on all four IELTS parameters: Grammar, Coherence & Cohesion, Lexical Resource, and Task Response"
      ],
    },
    {
      title: "ACADEMIC FULL WRITING",
      isPremium: true,
      Url: "/dashboard/writing/writing-full",
      options: [
        "IELTS Writing Academic full test",
        "Instant result",
        "Comprehensive feedback",
        "100% of your total IELTS writing score",
        "The latest writing topics and questions",
        "Graded on all four IELTS parameters: Grammar, Coherence & Cohesion, Lexical Resource, and Task Response"
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
          <h2 className="text-2xl font-bold mb-2">Choose a Writing Test to begin.</h2>
          <p className="text-gray-600 mb-2">The only resource you will ever need for your IELTS Writing preparation.</p>
        </div>
        <div className='relative'>
          <Score title="Estimated Score" score={chartData['writing']} size={"medium"} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {testOptions.map((option, index) => (
          <TestOption key={index} {...option} subscribtion={user?.subscribtion}/>
        ))}
      </div>
    </div>
  );
};

export default withUser(IELTSTestOptionsGrid);