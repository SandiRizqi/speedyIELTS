'use client'
import React from "react";
import { useEffect, useState, useCallback } from "react";
import AcademicListeningPage from "../../listening/academic-listening/AcademicListeningPage";
import AcademicReadingPage from "../../reading/academic-reading/AcademicReadingPage";
import WritingFullPage from "../../writing/writing-full/WritingFullPage";
import FullSpeakingPage from "../../speaking/full-speaking/FullSpeakingPage";
import StartInstruction from "./StartInstruction";
import { useAnswer } from "../hook/useAnswerCollection";


const FullTestPage = () => {
  const tabs = ['listening', 'reading', 'writing', 'speaking'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [start, setStart] = useState(false);
  const { globalState, addAnswer } = useAnswer();

  function TabNavigation() {
    const handleKeyDown = useCallback((e) => {
      if (e.key === 'ArrowRight') {
        setActiveTab((prev) => tabs[(tabs.indexOf(prev) + 1) % tabs.length]);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveTab((prev) => tabs[(tabs.indexOf(prev) - 1 + tabs.length) % tabs.length]);
      }
    }, [tabs]);


    const handleClick = (tab) => {
      setActiveTab(tab);
    };

    return (
      <div className="flex w-full justify-center mb-4 overflow-x-auto">
        <div className="flex border-b w-full justiry-center border-gray-200" role="tablist" onKeyDown={handleKeyDown}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => handleClick(tab)}
              tabIndex={activeTab === tab ? 0 : -1}
              className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
                }`}

            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    );
  }


  if (!start) {
    return <StartInstruction setStart={setStart} />
  }



  return (
    <>
      <TabNavigation />
      <div className={activeTab !== 'reading' ? "mx-auto max-w-screen-2xl" : "mx-auto max-w-full"}>
        {activeTab === 'listening' && (<div className="max-w-screen-2xl"><AcademicListeningPage isFullTest={true} setNextTest={setActiveTab} setCollectAnswer={addAnswer} savedQuestion={globalState['listening']?.question} savedAudio={globalState['listening']?.audio} savedAnswer={globalState['listening']?.answer} /></div>)}
        {activeTab === 'reading' && (<AcademicReadingPage isFullTest={true} setNextTest={setActiveTab} setCollectAnswer={addAnswer} savedQuestion={globalState['reading']?.question} savedAnswer={globalState['reading']?.answer} />)}
        {activeTab === 'writing' && (<WritingFullPage isFullTest={true} setNextTest={setActiveTab} setCollectAnswer={addAnswer} savedQuestion={globalState['writing']?.question} savedAnswer={globalState['writing']?.answer} />)}
        {activeTab === 'speaking' && (<FullSpeakingPage isFullTest={true} setNextTest={setActiveTab} setCollectAnswer={addAnswer} savedQuestion={globalState['speaking']?.question} savedAnswer={globalState['speaking']?.answer} />)}
      </div>
    </>
  )
}

export default FullTestPage;