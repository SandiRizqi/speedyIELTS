'use client'
import React from 'react';
import WritingOne from './_writingone/page';
import WritingTwo from './_writingtwo/page';
import { useState, useEffect, useCallback } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import StartInstruction from './StartInstruction';
import Loader from '@/components/common/Loader';
import { httpsCallable } from 'firebase/functions';
import { FirebaseFunction } from '@/service/firebase';

const Timer = ({ minutes, seconds, setFinish }) => {
  const [timeLeft, setTimeLeft] = useState({ minutes, seconds });

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({ minutes: timeLeft.minutes - 1, seconds: 59 });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      setFinish(true);
    }
  }, [timeLeft]);

  return (
    <div className='block text-center bg-slate-800 rounded-md p-1'>
      <p className='text-2xl font-medium text-gray-900 text-white'>{timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</p>
    </div>
  );
};

export default function WritingFullPage() {
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [question, setQuestion] = useState(null);
  const functions = FirebaseFunction();
  const [activeTab, setActiveTab] = useState(1);

  


  function TabNavigation() {
    const tabs = [1, 2];

    const handleKeyDown = useCallback((e) => {
      if (e.key === 'ArrowRight') {
        setActiveTab((prev) => (prev + 1) % tabs.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
      }
    }, [tabs.length]);

    return (
      <div className="flex w-full justify-end">
        <div className="flex border-b border-gray-200" role="tablist" onKeyDown={handleKeyDown}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={activeTab === tab}
              tabIndex={activeTab === tab ? 0 : -1}
              className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setActiveTab(tab)}
            >
              TASK-{tab}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const getQuestion = async (typequest) => {
    const getData = httpsCallable(functions, 'getQuestion');
    let quest;
    try {
      await getData({ type: typequest }).then((result) => {
        quest = result.data;
      });
      return quest;

    } catch (error) {
      console.error("Error fetching questions:", error);
    }

  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [question1, question2] = await Promise.all([
          getQuestion("writing1-questions"),
          getQuestion("writing2-questions"),
        ]);

        if (!question1 || !question2) {
          throw new Error('Failed to fetch data');
        };
        console.log(question1, question2)
        setQuestion({question1: question1, question2: question2})

        
      } catch (error) {
        console.log(error.message);
      };
    };

    fetchData();

  }, [])

  if (!question) {
    return <Loader />
  }

  if (!start && question) {
    return <StartInstruction setStart={setStart}/>
  };


  return (
    <>
      <Breadcrumb pageName='Writing' />
      <div className='flex flex-1 justify-center'>
        <div className='fixed w-full flex justify-center bg-white bg-opacity-0 items-center py-1 top-20 inline-block gap-4 z-50'>
          {start && (<Timer minutes={60} seconds={0} setFinish={setFinish}/>)}
        </div>
        <div className='dark:bg-slate-800 dark:text-slate-400 dark:border-slate-800 bg-white'>
          {activeTab === 1 ? <WritingOne finish={finish} question={question}/> : <WritingTwo finish={finish} question={question} />}

          <div className="m-8 flex justify-end gap-4">
            <TabNavigation />
            <button
              className="bg-blue-600 hover:bg-orange-400 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"

            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
