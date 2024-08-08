'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { UserProvider } from '@/service/user';
import AuthStateChangeProvider from '@/service/auth';
import { Microphone } from './components/Microphone';
import IntroChat from './components/IntroChat';
import { FirebaseFunction } from '@/service/firebase';
import PartTwo from './components/PartTwo';
import { httpsCallable } from 'firebase/functions';
import { ChatProvider } from './hook/chat';
import Loading from './components/Loading';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import StartInstruction from './StartInstruction';
import Loader from '@/components/common/Loader';



const FullSpeakingPage = () => {
  const DynamicChat = dynamic(() => import('./ChatPage'), { ssr: false })
  const SpeakingFeedback = dynamic(() => import('./components/SpeakingFeedback'), { ssr: false })
  const functions = FirebaseFunction();
  const [question, setQuestion] = useState(null);
  const [start, setStart] = useState(false);
  const order = ["intro1", "part1", "intro2", "part2", "intro3", "part3", "closing"];
  const [chatHistory, setChatHistory] = useState([]);
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);




  useEffect(() => {
    if (index < order.length) {
      setChatHistory([order[index]]);
    } else {
      setFinished(true);
      setStart(false);
      setChatHistory(null);
    }
  }, [index, question]);


  const getQuestion = async () => {
    const getData = httpsCallable(functions, 'get_speaking_questions');
    getData({ type: "speaking" }).then((result) => {
      setQuestion(result.data);
    });
  };


  useEffect(() => {
    getQuestion();
  }, []);

  if (!question) {
    return <Loader />;
  }

  if (!start && question) {
    return <StartInstruction setStart={setStart} />
  }



  return (
    <UserProvider>
      <AuthStateChangeProvider>
        <Breadcrumb pageName='Full Speaking'/>
        <div className='bg-white rounded-sm w-full h-full py-14 dark:bg-slate-800 dark:text-slate-400'>
          <header className="w-full">
            <div className="mx-auto max-w-screen-xl py-14 px-4 sm:px-6 sm:py-12 lg:px-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="text-center sm:text-left ">
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Full-speaking</h1>
                  <div className='flex flex-col mt-4'>
                    <span className="mt-1 inline-flex items-center gap-1.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                      <p className="mt-1.5 text-sm text-gray-500">Please start to speak when recording sign is showing.</p>
                    </span>

                    <span className="mt-1 inline-flex items-center gap-1.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                      <p className="mt-1.5 text-sm text-gray-500">The test will be automatically submitted after it finishes.</p>
                    </span>

                    <span className="mt-1 inline-flex items-center gap-1.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                      <p className="mt-1.5 text-sm text-gray-500">The result will be generated instantly after the test is finished.</p>
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </header>
          <ChatProvider>
            <section className="bg-white rounded-sm pt-14 flex min-h-[70vh] w-full justify-center mb-16 py-8 dark:bg-slate-800">
              <div className="flex flex-col bg-white  w-full max-w-screen-lg h-full shadow-xl rounded-md">
                <div className="w-full flex-col gap-8 p-4 items-center justify-left flex max-w-60">
                  {start && <Microphone />}
                  {!question && <Loading />}
                </div>
                <div className="w-full p-4 min-h-[50vh] h-full">
                  <div className="bg-slate-300 rounded-lg p-4 h-[40vh] pb-16 flex flex-1 flex-col overflow-y-auto w-full dark:bg-slate-500">
                    {start && chatHistory && chatHistory.map((step, idx) => {
                      if (step === "part1" || step === "part3") {
                        return <div key={idx}><DynamicChat question={question[step]} changeStep={setIndex} step={index} /></div>
                      };
                      if (step === "part2") {
                        return <div key={idx}><PartTwo question={question[step]} index={index} setIndex={setIndex} /></div>
                      }
                      return <div key={idx}><IntroChat index={index} setIndex={setIndex} question={question[step]} /></div>
                    })}
                    {finished && <SpeakingFeedback finished={finished}/>}
                  </div>

                </div>
                
              </div>
            </section>
          </ChatProvider>
        </div>
      </AuthStateChangeProvider>
    </UserProvider>
  );
}


export default FullSpeakingPage;