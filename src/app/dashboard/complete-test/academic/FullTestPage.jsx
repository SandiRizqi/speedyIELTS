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
import Loader from "@/components/common/Loader";
import { httpsCallable } from "firebase/functions";
import { useSearchParams } from "next/navigation";
import IELTSScoreDisplay from "./IELTSScoreDisplay";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import IELTSSkillsTestOptions from "./IELTSSkillsTestOptions";

const NavTab = ({activeTab, setActiveTab, globalState}) => {
  return <DefaultLayout>
    <IELTSSkillsTestOptions activeTab={activeTab} setActiveTab={setActiveTab} globalState={globalState}/>
  </DefaultLayout>
}

// const TestSubmissionPage = ({globalAnswer, addFeedback, globalFeedback}) => {
//   const user = useUser();
//   const functions = FirebaseFunction();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async(event) => {
//     event.preventDefault();
//     const getFullScore = httpsCallable(functions, 'getFullSkillScore');
    
//     try {
//       const respons = await getFullScore({...globalAnswer, userId: user.uid});
//       addFeedback(respons.data["data"]["result"]);
     
//     } catch (error) {
//       console.error("Submission error: ", error);
//     } finally {
//       setLoading(false); // Set loading to false when submission completes
//     }

//   };

//   if (globalFeedback?.overall) {
//     return <IELTSScoreDisplay 
//     overallScore={globalFeedback.overall}
//       listeningScore={globalFeedback.listening.result.overall}
//       readingScore={globalFeedback.reading.result.overall}
//       writingScore={globalFeedback.writing.result.overall}
//       speakingScore={globalFeedback.speaking.result.overall}
//       timestamp={globalFeedback.speaking.createdAt} 
    
//     />
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <h1 className="text-2xl font-bold mb-6">Submit Your Test Answers</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
//         {/* Listening Card */}
//         <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
//           <FaHeadphones className="text-blue-500 text-4xl mb-4" />
//           <h2 className="text-lg font-bold mb-2">Listening</h2>
          
//         </div>

//         {/* Reading Card */}
//         <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
//           <FaBook className="text-green-500 text-4xl mb-4" />
//           <h2 className="text-lg font-bold mb-2">Reading</h2>
        
//         </div>

//         {/* Writing Card */}
//         <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
//           <FaPen className="text-red-500 text-4xl mb-4" />
//           <h2 className="text-lg font-bold mb-2">Writing</h2>
          
//         </div>

//         {/* Speaking Card */}
//         <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
//           <FaMicrophone className="text-yellow-500 text-4xl mb-4" />
//           <h2 className="text-lg font-bold mb-2">Speaking</h2>
          
//         </div>
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={loading} // Disable the button while loading
//         className={`mt-6 ${
//           loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
//         } text-white font-bold py-2 px-4 rounded`}
//       >
//         {loading ? "Submitting..." : "Submit Answers"}
//       </button>
//     </div>
//   );
// };




const FullTestPage = () => {
  // const tabs = ['listening', 'reading', 'writing', 'speaking'];
  // const [start, setStart] = useState(false);
  const { globalState,  globalFeedback, addAnswer, addFeedback } = useAnswer();
  const [activeTab, setActiveTab] = useState('navigation');
  const [loading, setLoading] = useState(true); 
  const functions = FirebaseFunction()

  const params = useSearchParams();

  useEffect(() => {
    const getResultID = async () => {
      const getData = httpsCallable(functions, 'getResultByID');
      try {
        const result = await getData({ type: "test-taken", id: params.get("result") });
        addFeedback(result.data["result"]);
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    if (params.get("result")) {
      getResultID();
    } else {
      setLoading(false); // If there's no result parameter, we stop loading
    }
  }, [params]);


  if (loading) {
    return <Loader />
  }


  // if (!start && !params.get("result")) {
  //   return <StartInstruction setStart={setStart} />
  // }

 

  return (
    <>
    {activeTab === 'navigation' && (<NavTab activeTab={activeTab} setActiveTab={setActiveTab} globalState={globalState} addFeedback={addFeedback} globalFeedback={globalFeedback}/>)}
      <div className="mx-auto">
        {activeTab === 'listening' && (<><AcademicListeningPage isFullTest={true} setNextTest={setActiveTab} setCollectAnswer={addAnswer} questionId={globalFeedback.listening?.questionId} savedAnswer={globalFeedback.listening?.answer} Feedback={globalFeedback.listening?.corrections} Result={globalFeedback.listening}/></>)}
        {activeTab === 'reading' && (<AcademicReadingPage isFullTest={true} setNextTest={setActiveTab} setCollectAnswer={addAnswer} questionId={globalFeedback.reading?.questionId} savedAnswer={globalFeedback.reading?.answer} Feedback={globalFeedback.reading?.corrections} Result={globalFeedback.reading} />)}
        {activeTab === 'writing' && (<WritingFullPage isFullTest={true} setNextTest={setActiveTab} setCollectAnswer={addAnswer} questionId={[globalFeedback.writing?.result["task1"]["questionId"], globalFeedback.writing?.result["task2"]["questionId"]]} savedAnswer={globalFeedback.writing?.result} Feedback={{feedback1: globalFeedback.writing?.result.task1.result, feedback2:globalFeedback.writing?.result.task2.result }}/>)}
        {activeTab === 'speaking' && (<FullSpeakingPage isFullTest={true} setNextTest={setActiveTab} setCollectAnswer={addAnswer} questionId={globalFeedback.speaking?.questionId} savedAnswer={globalFeedback.speaking?.answer} Feedback={globalFeedback.speaking?.result}/>)}
      </div>
    </>
  )
}

export default withUser(FullTestPage);