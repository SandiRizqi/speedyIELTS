'use client'
import 'regenerator-runtime/runtime';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { FirebaseFunction } from '@/service/firebase';
import { httpsCallable } from 'firebase/functions';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import VoiceAssistant from './VoiceAssistant';
import StartInstruction from './StartInstruction';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import PartTwo from './PartTwo';
import LoadingScore from '../LoadingScore';
import ScoreDisplay from '../ScoreDisplay';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@/service/user';
import withSubscription from '@/hooks/withSubscribtion';
import TestLayout from '@/components/Layouts/TestLayout';
import { ErrorMessage } from '../../_components/Alert';
import { SuccessMessageText } from '../../_components/Alert';
import { useSpeaking } from './hook/useSpeaking';
// import VoiceAssistantComponent from './VoiceAssistantComponent';



const FullSpeakingPage = ({ isFullTest, setCollectAnswer, setNextTest, questionId, savedAnswer, Feedback }) => {
  const functions = FirebaseFunction();
  const user = useUser();
  const { userState } = user;
  const [question, setQuestion] = useState(null);
  const [start, setStart] = useState(questionId ? true : false);
  const { handleNext, currentSection, statusTest, setStatusTest, finished, setFinished } = useSpeaking();
  const [messages, setMessages] = useState(savedAnswer || []);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(Feedback || null);
  const messagesEndRef = useRef(null);
  const params = useSearchParams()
  const {
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const checkSpeechRecognitionSupport = () => {
      if (browserSupportsSpeechRecognition) {
        setIsSupported(true);
      } else {
        // Fallback check for browsers that might not be detected by the library
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        setIsSupported(!!SpeechRecognition);
      }
    };

    checkSpeechRecognitionSupport();
  }, [browserSupportsSpeechRecognition]);



  const getQuestion = async () => {
    try {
      const getData = httpsCallable(functions, 'getQuestion');
      
      // Await the result of the getQuestion call
      const result = await getData({
        type: "speaking-questions",
        id: params.get("id") || questionId,
        userId: userState.uid,
      });
  
      // Set the question data
      setQuestion({
        questions: result.data['questions'], 
        questionId: result.data['questionId']
      });
  
      // If it's a full test, update the collected answers
      if (isFullTest) {
        setCollectAnswer(prev => ({
          ...prev, 
          speaking: {
            ...prev['speaking'], 
            question: {
              questions: result.data['questions'], 
              questionId: result.data['questionId']
            }
          }
        }));
      }
    } catch (error) {
      // Handle errors with an appropriate message
      ErrorMessage(error.message || "Error fetching speaking questions.");
    }
  };
  

  const getSpeakingScore = async (values) => {
    if (!finished) {
      return SuccessMessageText("Please finish the test.")
    };

    setLoading(true)
    const getData = httpsCallable(functions, 'getSpeakingScore');
    try {
      const res = await getData(values);
      const respon = res.data;
      setFeedback(respon["result"]);
      setLoading(false)
    } catch (error) {
      ErrorMessage(error);
      setFinished(false);
    } finally {
      setLoading(false);
    }

  };

  const handleSubmitAnswer = async () => {
    if (isFullTest) {
      setCollectAnswer(prev => ({ ...prev, speaking: { ...prev['speaking'], dialogue: messages, userId: userState.uid, testType: "SpeakingFullAcademic", questionId: question.questionId, done: true } }));
      return setNextTest('navigation')
    };
    await getSpeakingScore({ dialogue: messages, userId: userState.uid, testType: "SpeakingFullAcademic", questionId: question.questionId })
  }

  // function handleNext() {
  //   console.log("Next")
  //   if (indexStep < order.length - 1) {
  //     setIndexStep(prev => prev + 1);
  //   } else {
  //     setStatusTest(false);
  //     setFinished(true);
  //   }
  // }


  useEffect(() => {
    if (finished) {
      handleSubmitAnswer();
    }
  },[finished])



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
  }, [messages, currentSection]);

  if (!question) {
    return <Loader />;
  }



  if (!start && question && !Feedback) {
    return <StartInstruction setStart={setStart} />;
  }

  if (!isSupported) {
    return (
      <div className="text-center p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p>Sorry, your browser doesn't support speech recognition.</p>
        <p>Please try using a modern browser like Chrome, Edge, or Safari.</p>
      </div>
    );
  }

  return (
    <>
      <TestLayout onSubmit={() => setFinished(true)} time={15} loading={loading} finish={finished} onCancel={setNextTest ? () => setNextTest('navigation') : null}>
      <div className='bg-white rounded-sm w-full flex flex-col p-4 py-30 dark:bg-slate-800 dark:text-slate-400'>
        <header className="w-full">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="sm:flex sm:items-center sm:justify-between mb-4">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Full-Speaking</h1>
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


        <div className='w-full mt-2 h-full pb-30'>
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl border overflow-hidden">
            <div className="flex flex-col md:flex-row h-full">
                {/* Assistant Column */}
                
                <div className="md:w-1/3 bg-slate-600 p-6 text-white flex flex-col justify-between">
                      <VoiceAssistant
                        intro={['intro1', 'intro2', 'intro3', 'closing'].includes(currentSection) ? question?.questions[currentSection] : null}
                        questions={['part1', 'part3'].includes(currentSection) ? question?.questions[currentSection] : null}
                        setMessages={setMessages}
                        start={statusTest}
                        isVisible={currentSection !== 'part2'}
                      />
                      {/* <VoiceAssistantComponent  intro={question?.questions[order[indexStep]]} questions={question?.questions[order[indexStep]]} setMessages={setMessages} handleNextPart={handleNext} currectSection={order[indexStep]} start={statusTest} /> */}
                </div>
                

              {/* Chat Column */}
              <div className={`${currentSection === 'part2' ? "w-full": "md:w-2/3"} flex flex-col justify-between max-h-[34rem] dark:bg-slate-700`}>
                <div className="overflow-y-auto p-4 space-y-4 flex-grow">
                  {currentSection !== 'part2' ? messages.map((message, index) => (
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
                  )) : null}
                  <PartTwo question={question?.questions[currentSection]} setMessages={setMessages} isVisible={currentSection === 'part2'}/>
                  
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t mt-auto">
                  <div className="flex space-x-2 justify-center">

                    <button
                      onClick={() => setStatusTest(!statusTest)}
                      disabled={finished || feedback || statusTest}
                      className={`flex items-center justify-center py-2 px-6 text-white font-semibold transition-all duration-300 transform hover:scale-105  ${finished || feedback || statusTest? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-orange-400'
                        }`}
                    >
                      Start Conversation
                    </button>

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


export default withSubscription(FullSpeakingPage);