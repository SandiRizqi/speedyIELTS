'use client'
import { useState, useEffect } from "react";



const PartTwo = ({question, setMessages, handleNextPart}) => {

    const Timer = ({ minutes, seconds }) => {
        const [timeLeft, setTimeLeft] = useState({ minutes, seconds });

        useEffect(() => {
            if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
                handleNextPart();
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
            {<Timer minutes={1} seconds={0}/>}
            <div
            className="mt-2 p-2 w-full h-full rounded"
            dangerouslySetInnerHTML={{ __html: `<span >${question}</span>` }}/>
        </div>
    )
};

export default PartTwo;