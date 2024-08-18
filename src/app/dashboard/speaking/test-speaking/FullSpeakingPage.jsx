'use client'
import 'regenerator-runtime/runtime';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { UserProvider } from '@/service/user';
import AuthStateChangeProvider from '@/service/auth';
import { FirebaseFunction } from '@/service/firebase';
import { httpsCallable } from 'firebase/functions';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import VoiceAssistant from './VoiceAssistant';
import StartInstruction from './StartInstruction';
import { useSpeechRecognition } from 'react-speech-recognition';




const FullSpeakingPage = () => {
  const functions = FirebaseFunction();
  const [question, setQuestion] = useState(null);
  const [start, setStart] = useState(false);
  const [statusTest, setStatusTest] = useState(true);
  const order = ["intro1", "part1", "intro2", "part2", "intro3", "part3", "closing"];
  const [indexStep, setIndexStep] = useState(0)
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const {
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();



  const getQuestion = async () => {
    const getData = httpsCallable(functions, 'get_speaking_questions');
    await getData({ type: "speaking" }).then((result) => {
      setQuestion(result.data);
    });
  };
  
  function handleNext() {
    if (indexStep < order.length) {
      setIndexStep(prev => prev + 1);
      console.log(order[indexStep])
    } else {
      console.log("Test Finished")
    }
  }


  useEffect(() => {
    if (!question) {
      getQuestion();
    }
  }, []);

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Use effect to trigger the scroll when messages change
  useEffect(() => {
    scrollToBottom();
    console.log(messages)
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
    <UserProvider>
      <AuthStateChangeProvider>
        <Breadcrumb pageName='Full Speaking'/>
        <div className='bg-white rounded-sm w-full h-full  p-4 py-30 dark:bg-slate-800 dark:text-slate-400'>
          
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl border overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Assistant Column */}
          <div className="md:w-1/3 bg-slate-600 p-6 text-white flex flex-col justify-between">
            {(order[indexStep] === 'intro1' || order[indexStep] === 'intro2' || order[indexStep] === 'intro3') && (<VoiceAssistant intro={question[order[indexStep]]} setMessages={setMessages} handleNextPart={handleNext}/>)}
            {(order[indexStep] === 'part1' || order[indexStep] === 'part3') && (<VoiceAssistant questions={question[order[indexStep]]}  setMessages={setMessages} handleNextPart={handleNext} />) }
          </div>

          {/* Chat Column */}
          <div className="md:w-2/3 flex flex-col justify-between max-h-[34rem] dark:bg-slate-700">
            <div className="overflow-y-auto p-4 space-y-4 ">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-gray-800'}`}>
                    {message.text}
                    {message.audioUrl && (
                  <div className="mt-2">
                    <audio controls className='w-full'>
                      <source src={message.audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}

                  </div>
                </div>
              ))}
               <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t mt-auto">
              <div className="flex space-x-2">

              </div>
            </div>
          </div>
        </div>
      </div>


        </div>
      </AuthStateChangeProvider>
    </UserProvider>
  );
}


export default FullSpeakingPage;