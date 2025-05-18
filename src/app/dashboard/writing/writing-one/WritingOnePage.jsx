'use client'
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import QuestionForm from './QuestionForm';
import Feedback from './FeedBack';
import { UserProvider } from '@/service/user';
import AuthStateChangeProvider from '@/service/auth';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { SuccessMessage, ErrorMessage } from '../../_components/Alert';
import StartInstruction from './StartInstruction';
import { FirebaseFunction } from '@/service/firebase';
import { httpsCallable } from 'firebase/functions';
import ScoreDisplay from '../ScoreDisplay';
import LoadingScore from '../LoadingScore';
import Loader from '@/components/common/Loader';
import { useSearchParams } from 'next/navigation';
import TestLayout from '@/components/Layouts/TestLayout';
import { useUser } from '@/service/user';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import withUser from '@/hooks/withUser';
import checkQuota from '@/hooks/checkQuota';


const WritingOnePage = () => {
  const user = useUser();
  const {userState} = user;
  const [question, setQuestion] = useState(null);
  const functions = FirebaseFunction();
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState({
    createdAt: Date.now(),
    questionId: '',
    testType: 'WritingTask1',
    answer: '',
  });
  const [feedback, setFeedback] = useState(null);
  const textareaRef = useRef(null);
  const params = useSearchParams();
  const [testResult, setTestResult] = useState(null);

  const db = getFirestore();

  const getResult = async (selectedId) => {
    try {
      const testTakenRef = doc(db, 'test-taken', selectedId);
      const testTakenDoc = await getDoc(testTakenRef);

      if (testTakenDoc.exists()) {
        const firestoreData = testTakenDoc.data();
        // console.log(firestoreData);
        
        // Only process if it's a Writing Task 1
        if (firestoreData.testType === 'WritingTask1') {
          setStart(true);
          getQuestion(firestoreData.questionId);
          setTestResult(firestoreData);
          setFeedback(firestoreData.result);
          setAnswer({
            ...answer,
            answer: firestoreData.answer,
            questionId: firestoreData.questionId
          });
        }
      }
    } catch (error) {
      console.error('Error fetching Firestore data:', error);
      ErrorMessage(error);
    }
  };

  useEffect(() => {
    if (params.get("result")) {
      getResult(params.get("result"));
    }
  }, [params]);



  const getWritingScore = async () => {
    setFinish(true)
    setLoading(true);
    const getData = httpsCallable(functions, 'getWritingScore');
    try {
      await getData(answer).then((result) => {
        const respon = result.data;
        setFeedback(respon["result"])
        setLoading(false);
        SuccessMessage({ score: respon['result']['overall'] })

      });

    } catch (error) {
      ErrorMessage(error)
     
    } finally {
      setLoading(false);
    }

  };


  const getQuestion = async (questID) => {
    const getData = httpsCallable(functions, 'getQuestion');
    try {
      await getData({ type: "writing1-questions", id: questID, userId: userState.uid }).then((result) => {
        const quest = result.data;
        setQuestion(quest);
      });

    } catch (error) {
      ErrorMessage(error);
    }

  };



  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [feedback]);

  useEffect(() => {
    if(!question && !params.get("result")) {
      getQuestion(params.get("id"));
    }
  }, [])

  useEffect(() => {
    if (finish) {
       getWritingScore();
    }

}, [finish])

  if (!question) {
    return <Loader />
  }


  if (!start && question) {
    return <StartInstruction setStart={setStart} />
  }






  return (
    <UserProvider>
      <AuthStateChangeProvider>
        {/* <Breadcrumb pageName='Writing Task 1' /> */}
        <TestLayout onSubmit={() => setFinish(true)}  time={20} loading={loading} finish={finish} onCancel={null} isFinish={params.get("result") ? true : false}>
        <div className='flex flex-1 justify-center'>
          {/* <div className='fixed w-full flex justify-center bg-white bg-opacity-0 items-center py-1  top-20 inline-block gap-4 z-50'>
            {start && !finish && (<Timer minutes={20} seconds={0} setFinish={setFinish} />)}
          </div> */}

          <section className="bg-white rounded-sm w-full h-full py-14 dark:bg-slate-800 dark:text-slate-400">

            <div className="mx-auto min-h-screen  max-w-screen-xl px-4 sm:px-6 lg:px-8">
              <header className="bg-gray-50">
                <div className="mx-auto max-w-screen-xl py-14 px-4 sm:px-6 sm:py-12 lg:px-8">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="text-center sm:text-left ">
                      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Writing Task 1</h1>
                      <div className='flex flex-col mt-4'>
                          <span className="mt-1 inline-flex items-center gap-1.5">
                            <p className="mt-1.5 text-sm text-gray-500"><span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span> Write minimum 150 words within 20 minutes.</p>
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
              {!feedback && loading && (<LoadingScore />)}

              <div className={`mt-8 grid gap-4 ${feedback || loading ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {/* Feedback Section */}
                  <div className={`flex flex-col min-h-full dark:bg-slate-700 rounded-md p-4 ${feedback || loading ? 'lg:col-span-1' : ''}`}>
                    <div className="text-left">
                      <p className="max-w-full text-md text-gray-900 dark:text-slate-300">Feedback :</p>
                    </div>
                    {!feedback && !loading && (
                      <span className="inline-flex mt-4 items-center justify-center rounded-md bg-amber-100 px-2.5 py-0.5 text-amber-700">
                        Submit your answer to get feedback and score!
                      </span>
                    )}
                    <Feedback feedback={feedback} loading={loading} />
                  </div>

                  {/* Question Form */}
                  <div className={`w-full ${feedback || loading ? 'lg:col-span-2' : ''}`}>
                    <QuestionForm
                      quest={question}
                      answer={answer}
                      setAnswer={setAnswer}
                      handleSubmit={() => setFinish(true)}
                      start={start}
                      loading={loading}
                      finish={finish}
                      feedback={feedback}
                    />
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

        </div>
        </TestLayout>
      </AuthStateChangeProvider>
    </UserProvider>
  );
}


export default checkQuota(withUser(WritingOnePage), "writing1-questions")