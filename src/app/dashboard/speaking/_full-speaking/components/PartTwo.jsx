'use client'
import { useState, useEffect } from "react";
import { useRecordVoice } from "../hook/useRecordVoice";
import { useChat } from "../hook/chat";


const RecordingIcon = () => {
  return (
      <div className="relative flex items-center justify-center">
          <span className="absolute inline-flex h-8 w-8 rounded-full bg-red opacity-75 animate-ping">
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="relative w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              Recording...
          </svg>
      </div>
  )
};


const PartTwo = ({question, index, setIndex}) => {
  const [isClient, setIsClient] = useState(false);
  const chat = useChat();
  const {addChat} = chat;
  const { recording, processing, mediaRecorder, startRecording, stopRecording, text } = useRecordVoice();


  useEffect(() => {
    if (!processing) {
      const timer = setTimeout(() => {
        addChat({ examiner: question, user: text });
        setIndex(index + 1);
      }, 3000); // Adjust the delay as needed
      return () => clearTimeout(timer);

    };
  }, [processing]);



  useEffect(() => {
    if (mediaRecorder && isClient) {
        startRecording();
        const timer = setTimeout(() => {
            stopRecording();
        }, 60000); // Adjust the delay as needed
        return () => clearTimeout(timer);
    };

}, [mediaRecorder, isClient]);


    const Timer = ({ minutes, seconds }) => {
        const [timeLeft, setTimeLeft] = useState({ minutes, seconds });

        useEffect(() => {
            if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
                setIsClient(true);
            }
        }, [timeLeft]);
    
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
          <div className='block text-center'>
            <p className='text-2xl font-medium text-gray-900'>{timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</p>
          </div>
        );
      };

    return (
        <div className="flex flex-col w-full">
            {!isClient && <Timer minutes={1} seconds={0}/>}
            <div
            className="mt-2 p-2 w-full h-full rounded"
            dangerouslySetInnerHTML={{ __html: `<span >${question}</span>` }}/>
        {isClient && 
          (
              <div className="flex w-full justify-end py-2">
                  <div className="flex items-start gap-2.5">
                      <div className="flex flex-col gap-1 w-full max-w-[320px]">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">Client</span>
                              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">recording...</span>
                          </div>
                          <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-l-xl rounded-b-xl dark:bg-gray-700 bg-white shadow-md">
                              {recording && <RecordingIcon />}
                              <p className="text-sm font-normal text-gray-900 dark:text-white">
                                  {text}
                              </p>
                          </div>
                      </div>
                      <img className="w-10 h-10 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3276/3276535.png" alt="Jese image" />
                  </div>
              </div>
          )
      }
        </div>
    )
};

export default PartTwo;