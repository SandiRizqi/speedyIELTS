'use client'
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import QuestionForm from './QuestionForm';
import Feedback from './FeedBack';
import ScoreDisplay from '../../ScoreDisplay';


const WritingOne = ({ answer, question, setAnswer, feedback, isLoading }) => {
  const textareaRef = useRef(null);


  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [feedback]);






  return (

    <section className="bg-white rounded-sm  py-14 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-800">
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
            </div>
          </div>
        </header>
        {feedback && (<ScoreDisplay result={feedback}/>)}

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:order-1 lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <QuestionForm answer={answer} setAnswer={setAnswer} loading={isLoading} feedback={feedback} question={question['question1']} />
            {feedback && (
              <div className='mt-4'>
                <span className='font-bold'>Evaluation: </span>
                <textarea
                  ref={textareaRef}
                  className="w-full p-4 resize-none border border-gray-300 rounded-md align-top focus:ring-0 sm:text-sm"
                  rows={1}
                  disabled
                  value={feedback.evaluation}
                  style={{ overflow: 'hidden', resize: 'none' }}
                ></textarea>
              </div>
            )}
          </div>

          <div className='lg:order-1 lg:col-span-1 flex flex-col min-h-full dark:bg-slate-700 rounded-md p-4'>
            <div className='flex flex-col min-h-full'>
              <div className="text-left">
                <p className="max-w-full text-md text-gray-500">
                  Feedback :
                </p>
              </div>
              {!feedback && !isLoading && (<span className='inline-flex mt-4 items-center justify-center rounded-md bg-amber-100 px-2.5 py-0.5 text-amber-700'>Submit your answer to get feedback and score!</span>)}
              <Feedback feedback={feedback} loading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </section>



  );
}


export default WritingOne;