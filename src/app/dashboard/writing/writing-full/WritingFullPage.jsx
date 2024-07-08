'use client'
import React from 'react';
import WritingOne from './_writingone/page';
import WritingTwo from './_writingtwo/page';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

export default function WritingFullPage() {
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);

  const Timer = ({ minutes, seconds }) => {
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
      if (timeLeft.minutes === 0 && timeLeft.seconds === 0 ) {
        setFinish(true);
      }
    },[timeLeft]);

    return (
      <div className='block text-center bg-slate-800 rounded-md p-1'>
        <p className='text-2xl font-medium text-gray-900 text-white'>{timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</p>
      </div>
    );
  };



  return (
    <>
      <Breadcrumb pageName='Writing'/>
      <div className='flex flex-1 justify-center'>
        <div className='fixed w-full flex justify-center bg-white bg-opacity-0 items-center py-1 top-20 inline-block gap-4 z-50'>
          {start && (<Timer minutes={60} seconds={0} />)}
          {!start && (<button
            className="block rounded-lg bg-indigo-500 px-5 py-3 text-xs font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
            type="button"
            onClick={() => setStart(true)}
          >
            Start
          </button>)}

        </div>
        <div className='dark:bg-slate-800 dark:text-slate-400 dark:border-slate-800'>
          <WritingOne finish={finish}/>
          <WritingTwo finish={finish}/>
        </div>
      </div>
    </>
  );
}
