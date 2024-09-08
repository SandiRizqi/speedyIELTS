'use client'
import React from 'react';
import QuestionForm from './QuestionForm';
import { useRef, useEffect } from 'react';
import Feedback from './FeedBack';
import ScoreDisplay from '../../ScoreDisplay';
import LoadingScore from '../../LoadingScore';


const WritingTwo = ({ question, answer, setAnswer, feedback, isLoading }) => {
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

    <section className="bg-white  rounded-sm pt-14 min-h-screen dark:bg-slate-800 dark:text-slate-400 dark:border-slate-800">
      <div className="mx-auto min-h-screen pb-4 w-full h-full px-4 sm:px-6 lg:px-8">
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
                    <p className="mt-1.5 text-sm text-gray-500"><span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span> The result will be generated instantly after the test is finished.</p>
                  </span>
                </div>

              </div>


            </div>
          </div>
        </header>
        {feedback && (<ScoreDisplay result={feedback} />)}
        {isLoading && <LoadingScore />}


        <div className={`mt-8 grid gap-4 ${feedback || isLoading ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {/* Feedback Section */}
          <div className={`flex flex-col min-h-full dark:bg-slate-700 rounded-md p-4 ${feedback || isLoading ? 'lg:col-span-1' : ''}`}>
            <div className="text-left">
              <p className="max-w-full text-md text-gray-900 dark:text-slate-300">Feedback :</p>
            </div>
            {!feedback && !isLoading && (
              <span className="inline-flex mt-4 items-center justify-center rounded-md bg-amber-100 px-2.5 py-0.5 text-amber-700">
                Submit your answer to get feedback and score!
              </span>
            )}
            <Feedback feedback={feedback} loading={isLoading} />
          </div>

          {/* Question Form */}
          <div className={`w-full ${feedback || isLoading ? 'lg:col-span-2' : ''}`}>
          <QuestionForm answer={answer} setAnswer={setAnswer} loading={isLoading} feedback={feedback} question={question['question2']} />
            {feedback && (
              <div className="mt-4">
                <span className="font-bold">Evaluation: </span>
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
        </div>

      </div>
    </section>



  );
}


export default WritingTwo;