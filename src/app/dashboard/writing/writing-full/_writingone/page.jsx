'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import Feedback from './FeedBack';
import axios from 'axios';

const WritingOne = ({finish}) => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState({
    questionId: '',
    testType: 'WritingTask1',
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
          setFeedback(res.data)
          console.log(res.data)
          setLoading(false);
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



  const Overall = ({ score }) => {
    return (
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900">
          Overall Score
          <span className="sr-only">Plan</span>
        </h2>

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> {score} </strong>
        </p>
      </div>
    )
  }





  return (

    <section className="bg-white rounded-sm  pt-14 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-800">
      <div className="mx-auto min-h-screen  w-full h-full px-4 sm:px-6 lg:px-8">
        <header className="bg-gray-50">
          <div className="mx-auto max-w-screen-xl py-14 px-4 sm:px-6 sm:py-12 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left ">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Writing Task 1</h1>
                <div className='flex flex-col mt-4'>
                  <span className="mt-1 inline-flex items-center gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <p className="mt-1.5 text-sm text-gray-500">Write minimum 150 words within 20 minutes.</p>
                  </span>

                  <span className="mt-1 inline-flex items-center gap-1.5">
                    <p className="mt-1.5 text-sm text-gray-500"><span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span> Follow the task instruction to complete the test.</p>
                  </span>

                  <span className="mt-1 inline-flex items-center gap-1.5">
                    <p className="mt-1.5 text-sm text-gray-500"><span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span> The test will be automatically submitted after it finishes.</p>
                  </span>

                  <span className="mt-1 inline-flex items-center gap-1.5">
                    <p className="mt-1.5 text-sm text-gray-500"><span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span> The result will be generated instantly after the test is finished.</p>
                  </span>
                </div>

              </div>

              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                {finish && feedback && (<Overall score={feedback.overall} />)}
              </div>
            </div>
          </div>
        </header>


        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3 ">
          <div className='flex flex-col min-h-full'>
            <div className="text-left">
              <p className="max-w-full text-md text-gray-500">
                Feedback :
              </p>
            </div>
            {!feedback && !loading && (<span className='inline-flex mt-4 items-center justify-center rounded-md bg-amber-100 px-2.5 py-0.5 text-amber-700'>Submit your answer to get feedback and score!</span>)}
            <Feedback feedback={feedback} loading={loading} />
          </div>


          <div className="mt-4 lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 xs:col-span-1 xs:row-span-1 xs:row-start-1">
            <QuestionForm answer={answer} setAnswer={setAnswer} handleSubmit={handleSubmit} start={start} loading={loading} finish={finish} feedback={feedback}/>
            {feedback && (
              <div className='mt-4'>
                <span className='font-bold'>Evaluation: </span>
                <textarea
                  id="OrderNotes"
                  className="w-full resize-none border border-gray-300 rounded-md align-top focus:ring-0 sm:text-sm"
                  rows="13"
                  disabled
                  value={feedback.evaluation}
                ></textarea>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>



  );
}


export default WritingOne;