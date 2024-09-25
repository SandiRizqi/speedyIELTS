'use client'
import 'regenerator-runtime/runtime';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { FirebaseFunction } from '@/service/firebase';
import { httpsCallable } from 'firebase/functions';
// import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import VoiceAssistant from './VoiceAssistant';
import StartInstruction from './StartInstruction';
import { useSpeechRecognition } from 'react-speech-recognition';
import LoadingScore from '../LoadingScore';
import ScoreDisplay from '../ScoreDisplay';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@/service/user';
import { ErrorMessage } from '../../_components/Alert';
import { SuccessMessageText } from '../../_components/Alert';
import TestLayout from '@/components/Layouts/TestLayout';



const FullSpeakingPage = () => {
  const functions = FirebaseFunction();
  const user = useUser();
  const {userState} = user;
  const [question, setQuestion] = useState(null);
  const [questionId, setQuestionId] = useState('')
  const [start, setStart] = useState(false);
  const [finished, setFinished] = useState(false);
  const [statusTest, setStatusTest] = useState(false);
  const order = ["intro1", "part1", "closing"];
  const [indexStep, setIndexStep] = useState(0)
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const messagesEndRef = useRef(null);
  const params = useSearchParams()
  const {
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();



  const getQuestion = async () => {
    const getData = httpsCallable(functions, 'getQuestion');
    await getData({ type: "speaking-questions", id: params.get("id"), userId: userState.uid }).then((result) => {
      setQuestion(result.data['questions']);
      setQuestionId(result.data['questionId'])
    });
  };

  const getSpeakingScore = async (values) => {
    setLoading(true)
    const getData = httpsCallable(functions, 'getSpeakingScore');
    try {
      const res = await getData(values);
      const respon = res.data;
      setFeedback(respon["result"]);
      // setLoading(false)
    } catch (error) {
      ErrorMessage(error)
      // setLoading(false);
      setFinished(false)
    } finally {
      setLoading(false);
    }

  };

  const handleSubmitAnswer = async () => {
    if (!finished) {
      return SuccessMessageText("Please finish the test.")
    }
    await getSpeakingScore({ dialogue: messages, userId: userState.uid, testType: "SpeakingMiniAcademic", questionId: questionId })
  };


  useEffect(() => {
    if (finished) {
      handleSubmitAnswer();
    }
  },[finished])

  function handleNext() {
    if (indexStep < order.length - 1) {
      setIndexStep(prev => prev + 1);
    } else {
      setStatusTest(false);
      setFinished(true);
    }
  }

  useEffect(() => {
    let isMounted = true;

    if (!question && isMounted) {
      getQuestion();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Use effect to trigger the scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!question) {
    return <Loader />;
  }



  if (!start && question) {
    return <StartInstruction setStart={setStart} />
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      <TestLayout onSubmit={() => setFinished(true)}  time={7} loading={loading} finish={!finished} >
        {/* <Breadcrumb pageName='Mini Speaking' /> */}
      <div className='bg-white flex flex-col rounded-sm w-full  min-h-screen p-4 py-20 dark:bg-slate-800 dark:text-slate-400'>
        <header className="w-full">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="sm:flex sm:items-center sm:justify-between mb-4">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Mini-Speaking</h1>
                <div className='flex flex-col mt-4'>
                  <span className="mt-1 inline-flex items-center">
                    <p className="mt-1.5 text-sm text-gray-500"><span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mx-1"></span>Please start to speak when recording sign is showing.</p>
                  </span>

                  <span className="mt-1 inline-flex items-center">

                    <p className="mt-1.5 text-sm text-gray-500 gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mx-1"></span>The test will be automatically submitted after it finishes.</p>
                  </span>

                  <span className="mt-1 inline-flex items-center">

                    <p className="mt-1.5 text-sm text-gray-500 gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mx-1"></span>The result will be generated instantly after the test is finished.</p>
                  </span>
                </div>

              </div>
            </div>
            {feedback && !loading && (<ScoreDisplay result={feedback} />)}
            {loading && (<LoadingScore />)}
          </div>
        </header>


        <div className='w-full mt-4 h-full'>
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl border overflow-hidden">
            <div className="flex flex-col md:flex-row h-full">
              {/* Assistant Column */}
              <div className="md:w-1/3 bg-slate-600 p-6 text-white flex flex-col justify-between">
                {(order[indexStep] === 'intro1' || order[indexStep] === 'intro2' || order[indexStep] === 'intro3' || order[indexStep] === 'closing') && (<VoiceAssistant intro={question[order[indexStep]]} setMessages={setMessages} handleNextPart={handleNext} currectSection={order[indexStep]} start={statusTest} />)}
                {(order[indexStep] === 'part1' || order[indexStep] === 'part2' || order[indexStep] === 'part3') && (<VoiceAssistant questions={question[order[indexStep]]} setMessages={setMessages} handleNextPart={handleNext} currectSection={order[indexStep]} start={statusTest} />)}

              </div>

              {/* Chat Column */}
              <div className="md:w-2/3 flex flex-col justify-between max-h-[34rem] dark:bg-slate-700">
                <div className="overflow-y-auto p-4 space-y-4 flex-grow">
                  {order[indexStep] !== 'part2' ? messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-gray-800'}`}>
                        {message.text}
                        {message.audioUrl && (
                          <div className="mt-2">
                            <audio controls={!statusTest} className='w-full'>
                              <source src={message.audioUrl} type="audio/mpeg" />
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                        )}

                      </div>
                    </div>
                  )) : (<></>)}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t mt-auto">
                  <div className="flex space-x-2 justify-center">

                    <button
                      onClick={() => setStatusTest(!statusTest)}
                      disabled={statusTest}
                      className={`flex items-center justify-center py-2 px-6 text-white font-semibold transition-all duration-300 transform hover:scale-105  ${statusTest ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-orange-400'
                        }`}
                    >
                      Start Conversation
                    </button>

                    {/* <button
                      onClick={() => handleSubmitAnswer()}
                      disabled={!finished || feedback}
                      className={`flex items-center justify-center py-2 px-6  text-white font-semibold transition-all duration-300 transform hover:scale-105  ${!finished || feedback? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-orange-400'
                        }`}
                    >
                      {!loading ? 'Submit' : 'Loading'}
                    </button> */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </TestLayout>
    </>
  );
}


export default FullSpeakingPage;