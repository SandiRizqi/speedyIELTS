'use client'
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



const FullSpeakingPage = () => {
  const functions = FirebaseFunction();
  const [question, setQuestion] = useState(null);
  const [start, setStart] = useState(false);
  const order = ["intro1", "part1", "intro2", "part2", "intro3", "part3", "closing"];
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);



  const getQuestion = async () => {
    const getData = httpsCallable(functions, 'get_speaking_questions');
    getData({ type: "speaking" }).then((result) => {
      setQuestion(result.data);
    });
  };


  useEffect(() => {
    getQuestion();
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



  return (
    <UserProvider>
      <AuthStateChangeProvider>
        <Breadcrumb pageName='Full Speaking'/>
        <div className='bg-white rounded-sm w-full h-full  p-4 py-30 dark:bg-slate-800 dark:text-slate-400'>
          
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl border overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Assistant Column */}
          <div className="md:w-1/3 bg-slate-600 p-6 text-white flex flex-col justify-between">
            <VoiceAssistant questions={question['part1']} setMessages={setMessages}/>
          </div>

          {/* Chat Column */}
          <div className="md:w-2/3 flex flex-col justify-between max-h-[34rem] dark:bg-slate-700">
            <div className="overflow-y-auto p-4 space-y-4 ">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-gray-800'}`}>
                    {message.text}
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