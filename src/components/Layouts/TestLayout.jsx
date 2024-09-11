"use client";
import React, { useState, ReactNode, useEffect} from "react";
import withProtected from "@/hooks/withProtected";
import withUser from "@/hooks/withUser";
import { Clock,  Maximize, Notebook } from 'lucide-react';



const TestLayout = ({children}) => {
    const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
    const [activePart, setActivePart] = useState(1);



  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes remaining`;
  };

  const generateNumberButtons = (start, end, activePart) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start).map((num) => (
      <button
        key={num}
        className={`w-6 h-6 text-xs rounded-full ${num === start && activePart ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'} flex items-center justify-center`}
      >
        {num}
      </button>
    ));
  };


  const renderPartButton = (part, questions) => (
    <button
      className={`flex-1 py-2 px-4 ${activePart === part ? 'bg-blue-100 text-blue-700' : 'bg-white text-slate-700'} rounded-t-lg font-medium text-sm`}
      onClick={() => setActivePart(part)}
    >
      Part {part}: {activePart === part ? `1 of ${questions} questions` : `0 of ${questions} questions`}
    </button>
  );


  return (
    <><div className="flex flex-col h-screen bg-slate-100">
    {/* Header */}
    <header className="bg-white shadow-lg p-4 flex justify-between items-center">
      <img src="/images/logo/type/logo_round.png" alt="Logo" className="h-10" />
      <div className="flex items-center space-x-2">
        <Clock size={20} className="text-slate-500" />
        <span className="text-slate-700">{formatTime(timeLeft)}</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-slate-500 hover:text-slate-700">
          <Notebook size={24}/>
        </button>
        <button className="p-2 text-slate-500 hover:text-slate-700">
          <Maximize size={24} />
        </button>
        <button className="px-4 py-2 bg-yellow-600 text-white  hover:bg-yellow-700 transition-colors">
          Cancel
        </button>
        <button className="px-4 py-2 bg-green-600 text-white  hover:bg-green-700 transition-colors">
          Submit
        </button>
      </div>
    </header>

    <div className="flex flex-col overflow-scroll p-6">
      {children}
    </div>

    <footer className="bg-white shadow-md">
        <div className="flex border-b">
          {renderPartButton(1, 13)}
          {renderPartButton(2, 13)}
          {renderPartButton(3, 14)}
          {renderPartButton(4, 14)}
        </div>
        <div className="p-4">
          <div className="flex justify-center space-x-2 mb-4">
            {activePart === 1 && generateNumberButtons(1, 13)}
            {activePart === 2 && generateNumberButtons(1, 13)}
            {activePart === 3 && generateNumberButtons(1, 14)}
            {activePart === 4 && generateNumberButtons(1, 14)}
          </div>
          
        </div>
      </footer>
  </div>
    </>
  );
}


export default withProtected(withUser(TestLayout));