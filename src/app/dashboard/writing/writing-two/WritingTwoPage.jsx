'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import Feedback from './FeedBack';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import axios from 'axios';

const WritingTwoPage = () => {
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState({
    createdAt: Date.now(),
    questionId: '',
    testType: 'WritingTask2',
    answer: '',
  });
  const [feedback, setFeedback] = useState(null);



  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      axios.post(`${process.env.NEXT_PUBLIC_EXAMINER_URL}/getwritingscore`, answer, config)
        .then((res) => {
          setFeedback(res.data);
          setLoading(false);
          setFinish(true);
        })
        .catch(() => {
          setLoading(false);
        });
    }
    catch (error) {
      console.log(error);
      setLoading(false)
    }
  };


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

    return (
      <div className='block text-center bg-slate-800 rounded-md p-1'>
        <p className='text-2xl font-medium text-gray-900 text-white'>{timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</p>
      </div>
    );
  };


  const Overall = ({ score }) => {
    return (
      <div class="text-center">
        <h2 class="text-lg font-medium text-gray-900">
          Overall Score
          <span class="sr-only">Plan</span>
        </h2>

        <p class="mt-2 sm:mt-4">
          <strong class="text-3xl font-bold text-gray-900 sm:text-4xl"> {score} </strong>
        </p>
      </div>
    )
  }





  return (
      <>
        <Breadcrumb pageName='Writing Part Two'/>
        <div className='flex flex-1 justify-center'>
          <div className='fixed w-full flex justify-center bg-white bg-opacity-0 items-center py-1 top-20 inline-block gap-4 z-50'>
            {start && (<Timer minutes={40} seconds={0} />)}
            {!start && (<button
              className="block rounded-lg bg-indigo-500 px-5 py-3 text-xs font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
              onClick={() => setStart(true)}
            >
              Start
            </button>)}

          </div>
          

          <section className="bg-white rounded-sm w-full h-full py-14 dark:bg-slate-800 dark:text-slate-400">
            <div className="mx-auto min-h-screen pb-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
              <header className="bg-gray-50">
                <div className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 sm:py-12 lg:px-8">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="text-center sm:text-left">
                      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Writing Task 2</h1>
                      <div className='flex flex-col mt-4'>
                        <span className="mt-1 inline-flex items-center gap-1.5">
                          <p className="mt-1.5 text-sm text-gray-500"><span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span> Write minimum 250 words within 40 minutes.</p>
                        </span>

                        <span className="mt-1 inline-flex items-center gap-1.5">
                          <p className="mt-1.5 text-sm text-gray-500"><span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span> Follow the task instruction to complete the test.</p>
                        </span>

                        <span className="mt-1 inline-flex items-center gap-1.5">
                          <p className="mt-1.5 text-sm text-gray-500"><span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span> The test will be automatically submitted after it finishes.</p>
                        </span>

                        <span className="mt-1 inline-flex items-center gap-1.5">
                          <p className="mt-1.5 text-sm text-gray-500 items-center"><span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span> The result will be generated instantly after the test is finished.</p>
                        </span>
                      </div>

                    </div>

                    <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                      {finish && feedback && (<Overall score={feedback.overall} />)}
                    </div>
                  </div>
                </div>
              </header>


              <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className='flex flex-col min-h-full dark:bg-slate-700 rounded-md p-4'>
                  <div className="text-left">
                    <p className="max-w-full text-md text-gray-900 dark:text-slate-300">
                      Feedback :
                    </p>
                  </div>
                  {!feedback && !loading && (<span className='inline-flex mt-4 items-center justify-center rounded-md bg-amber-100 px-2.5 py-0.5 text-amber-700'>Submit your answer to get feedback and score!</span>)}
                  <Feedback feedback={feedback} loading={loading} />
                </div>


                <div className="mt-4 lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 xs:col-span-1 xs:row-span-1 xs:row-start-1">
                  <QuestionForm answer={answer} setAnswer={setAnswer} handleSubmit={handleSubmit} start={start} loading={loading} finish={finish} feedback={feedback} />
                  {feedback && (
                    <div className='mt-4'>
                      <span className='font-bold'>Evaluation: </span>
                      <textarea
                        id="OrderNotes"
                        className="w-full resize-none border border-gray-300 p-4 rounded-md align-top focus:ring-0 sm:text-sm"
                        rows="30"
                        disabled
                        value={feedback?.evaluation}
                      ></textarea>
                    </div>
                  )}
                </div>


              </div>
            
            </div>
            
          </section>
          
          
        </div>
        
        
        
      </>
  );
}


export default WritingTwoPage;