'use client'
import React from "react";

const ScoreComponent = ({ score }) => {
    return (
      <div className="flex flex-1 w-full p-4 items-center justify-center  bg-gray-100">
        <div className="bg-white p-8 px-16 rounded-lg shadow-md flex justify-between w-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Score</h2>
          <div className="text-2xl font-extrabold text-green-500">
            {score['correct']} / {score['totalQuestion']}
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Band</h2>
          <div className="text-6xl font-extrabold text-green-500">
            {score['correct']}
          </div>
        </div>
        </div>
      </div>
    );
};

export default ScoreComponent;