'use client'
import React from "react";
import { useEffect, useState, useCallback } from "react";
import AcademicListeningPage from "../../listening/academic-listening/AcademicListeningPage";
import AcademicReadingPage from "../../reading/academic-reading/AcademicReadingPage";
import WritingFullPage from "../../writing/writing-full/WritingFullPage";
import FullSpeakingPage from "../../speaking/full-speaking/FullSpeakingPage";
import StartInstruction from "./StartInstruction";
import { useAnswer } from "../hook/useAnswerCollection";
import { FaHeadphones, FaBook, FaPen, FaMicrophone } from "react-icons/fa"; // Importing icons from react-icons
import { FirebaseFunction } from "@/service/firebase";
import { useUser } from "@/service/user";
import withUser from "@/hooks/withUser";
import { httpsCallable } from "firebase/functions";


const TestSubmissionPage = ({globalAnswer, addFeedback}) => {
  const user = useUser();
  const functions = FirebaseFunction()
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const getFullScore = httpsCallable(functions, 'getFullSkillScore');
    
    try {
      const respons = await getFullScore({...globalAnswer, userId: user.uid});
      addFeedback(respons.data["data"]);
     
    } catch (error) {
      console.error("Submission error: ", error);
    } finally {
      setLoading(false); // Set loading to false when submission completes
    }

  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Submit Your Test Answers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Listening Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaHeadphones className="text-blue-500 text-4xl mb-4" />
          <h2 className="text-lg font-bold mb-2">Listening</h2>
          
        </div>

        {/* Reading Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaBook className="text-green-500 text-4xl mb-4" />
          <h2 className="text-lg font-bold mb-2">Reading</h2>
        
        </div>

        {/* Writing Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaPen className="text-red-500 text-4xl mb-4" />
          <h2 className="text-lg font-bold mb-2">Writing</h2>
          
        </div>

        {/* Speaking Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaMicrophone className="text-yellow-500 text-4xl mb-4" />
          <h2 className="text-lg font-bold mb-2">Speaking</h2>
          
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading} // Disable the button while loading
        className={`mt-6 ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
        } text-white font-bold py-2 px-4 rounded`}
      >
        {loading ? "Submitting..." : "Submit Answers"}
      </button>
    </div>
  );
};




const FullTestPage = () => {
  const tabs = ['listening', 'reading', 'writing', 'speaking', 'submit'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [start, setStart] = useState(false);
  const { globalState,  globalFeedback, addAnswer, addFeedback } = useAnswer();


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
        {activeTab === 'writing' && (<WritingFullPage isFullTest={true} setNextTest={setActiveTab} setCollectAnswer={addAnswer} savedQuestion={globalState['writing']?.question} savedAnswer={globalState['writing']?.answer} Feedback={globalFeedback.writing}/>)}
        {activeTab === 'speaking' && (<FullSpeakingPage isFullTest={true} setNextTest={setActiveTab} setCollectAnswer={addAnswer} savedQuestion={globalState['speaking']?.question} savedAnswer={globalState['speaking']?.dialogue} Feedback={globalFeedback.speaking}/>)}
        {activeTab === 'submit' && (<TestSubmissionPage globalAnswer={globalState} addFeedback={addFeedback}/>)}
      </div>
    </>
  )
}

export default withUser(FullTestPage);