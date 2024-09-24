import React from 'react';

const StartInstruction = ({setStart}) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full bg-white dark:bg-slate-700 shadow-lg  overflow-hidden m-4">
        <div className="bg-slate-800  py-6 px-8 text-white text-2xl font-bold">
          Test Instructions
        </div>
        <div className="p-8 space-y-6">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Welcome to the Listening test! Please read the following instructions
            carefully:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-sm">
            <li>You have 30 minutes to complete the test.</li>
            <li>
              The test consists of 40 questions. you should write or select the best answer.
            </li>
            <li>
              You can go back to a previous question before you submit
              your answer.
            </li>
            <li>
              Your score will be displayed at the end of the exam just after you submit your answer. Good luck!
            </li>
          </ul>
          <div className="flex justify-center">
            <button className="bg-blue-600 hover:bg-orange-400 text-white font-bold py-3 px-8  transition-colors duration-300" onClick={() => setStart(true)}>
              Start test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartInstruction;