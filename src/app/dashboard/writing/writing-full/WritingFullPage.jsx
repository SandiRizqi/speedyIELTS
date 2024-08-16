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
import { SuccessMessage, ErrorMessage } from '../../_components/Alert';
import axios from 'axios';

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

export default function WritingFullPage({ isFullTest, setCollectAnswer, setNextTest, savedQuestion, savedAnswer }) {
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState(savedAnswer || {
    task1: {
      createdAt: Date.now(),
      questionId: '',
      testType: 'WritingTask1',
      answer: '',
    },
    task2:
    {
      createdAt: Date.now(),
      questionId: '',
      testType: 'WritingTask2',
      answer: '',
    }
  });
  const [feedback, setFeedback] = useState(null);
  const [question, setQuestion] = useState(savedQuestion);
  const functions = FirebaseFunction();
  const [activeTab, setActiveTab] = useState(1);



  const getWritingScore = async (values) => {
    const getData = httpsCallable(functions, 'getWritingScore');
    try {
      const res = await getData(values);
      const respon = res.data;
      const result = respon["result"];
      return result; // Return the result here
    } catch (error) {
      console.error("Error fetching questions:", error);
      return undefined; // Return undefined explicitly in case of an error
    }

  };

  const handleSubmit = async () => {
    if (isFullTest) {
      return setCollectAnswer(prev => ({ ...prev, writing: { ...prev['writing'], answer: answer } }));
    }

    setIsLoading(true);
    try {
      const [feedback1, feedback2] = await Promise.all([
        getWritingScore(answer['task1']),
        getWritingScore(answer['task2']),
      ]);

      setIsLoading(false);

      if (!feedback1 || !feedback2) {
        throw new Error('Failed to fetch data');
      };

      setFeedback({ feedback1: feedback1, feedback2: feedback2 });
      //SuccessMessage({score: null})


    } catch (e) {
      ErrorMessage(e);
      setIsLoading(false);
    }
  };



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
        setAnswer(prev => ({ ...prev, task1: { ...prev['task1'], ...question1 }, task2: { ...prev['task2'], ...question2 } }))
        setQuestion({ question1: question1, question2: question2 });
        if (isFullTest) {
          setCollectAnswer(prev => ({ ...prev, writing: { ...prev['writing'], question: { question1: question1, question2: question2 } } }));
        }

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
    return <StartInstruction setStart={setStart} />
  };


  return (
    <>
      <Breadcrumb pageName='Writing' />
      <div className='flex flex-1 justify-center'>
        <div className='fixed w-full flex justify-center bg-white bg-opacity-0 items-center py-1 top-20 inline-block gap-4 z-50'>
          {start && !feedback && (<Timer minutes={60} seconds={0} setFinish={setFinish} />)}
        </div>
        <div className='dark:bg-slate-800 dark:text-slate-400 dark:border-slate-800 bg-white'>
          {activeTab === 1 ? <WritingOne question={question} answer={answer['task1']} setAnswer={setAnswer} feedback={feedback?.feedback1} isLoading={isLoading} /> : <WritingTwo question={question} answer={answer['task2']} setAnswer={setAnswer} feedback={feedback?.feedback2} isLoading={isLoading} />}

          <div className="m-8 flex justify-end gap-4">
            <TabNavigation />
            {!feedback && (
              <button
                className="bg-blue-600 hover:bg-orange-400 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleSubmit()}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
