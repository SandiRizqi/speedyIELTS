'use client'
import React from "react";
import { useEffect, useState, useCallback } from "react";
import AcademicListeningPage from "../../listening/academic-listening/AcademicListeningPage";
import AcademicReadingPage from "../../reading/academic-reading/AcademicReadingPage";
import WritingFullPage from "../../writing/writing-full/WritingFullPage";
import FullSpeakingPage from "../../speaking/full-speaking/FullSpeakingPage";
// import StartInstruction from "./StartInstruction";
import { useAnswer } from "../hook/useAnswerCollection";
// import { FaHeadphones, FaBook, FaPen, FaMicrophone } from "react-icons/fa"; // Importing icons from react-icons
import { FirebaseFunction } from "@/service/firebase";
import { useUser } from "@/service/user";
import withUser from "@/hooks/withUser";
import Loader from "@/components/common/Loader";
import { httpsCallable } from "firebase/functions";
import { useSearchParams } from "next/navigation";
import { ErrorMessage } from "../../_components/Alert";
// import IELTSScoreDisplay from "./IELTSScoreDisplay";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SpeakingProvider } from "../../speaking/full-speaking/hook/useSpeaking";
import IELTSSkillsTestOptions from "./IELTSSkillsTestOptions";

const NavTab = ({activeTab, setActiveTab, globalState}) => {
  // return <DefaultLayout>
    return <IELTSSkillsTestOptions activeTab={activeTab} setActiveTab={setActiveTab} globalState={globalState}/>
  // </DefaultLayout>
}





const FullTestPage = () => {
  const { globalState,  globalFeedback, addAnswer, addFeedback, setGlobalState } = useAnswer();
  const {userState} = useUser();
  // const [testData, setTestData] = useState(null);
  const [activeTab, setActiveTab] = useState('navigation');
  const [loading, setLoading] = useState(true); 
  const functions = FirebaseFunction()
  const params = useSearchParams();


  async function getFullTestID () {
    const getTest = httpsCallable(functions, "makeFullTestSkill");
    try {
      const result = await getTest({ userId: userState.uid });
      setGlobalState(prev => ({...prev, ...result.data}))
    } catch (error) {
      ErrorMessage(error)
    } finally {
      setLoading(false); // Set loading to false after the data is fetched
    }
  }

  useEffect(() => {
    const getResultID = async () => {
      const getData = httpsCallable(functions, 'getResultByID');
      try {
        const result = await getData({ type: "test-taken", id: params.get("result") });
        addFeedback(result.data["result"]);
        setGlobalState(result.data);
      } catch (error) {
        ErrorMessage(error)
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    if (params.get("result")) {
      getResultID();
    } else {
      getFullTestID();
    }
  }, [params]);


  if (loading) {
    return <Loader />
  }

 

  return (
    <>
    {activeTab === 'navigation' && (<NavTab activeTab={activeTab} setActiveTab={setActiveTab} globalState={globalState} addFeedback={addFeedback} globalFeedback={globalFeedback}/>)}
      <div className="mx-auto">
        {activeTab === 'listening' && (<><AcademicListeningPage isFullTest={true} setNextTest={setActiveTab} setCollectAnswer={addAnswer} questionId={globalFeedback.listening?.questionId} savedAnswer={globalFeedback.listening?.answer} Feedback={globalFeedback.listening?.corrections} Result={globalFeedback.listening}/></>)}
        {activeTab === 'reading' && (<AcademicReadingPage isFullTest={true} setNextTest={setActiveTab} setCollectAnswer={addAnswer} questionId={globalFeedback.reading?.questionId} savedAnswer={globalFeedback.reading?.answer} Feedback={globalFeedback.reading?.corrections} Result={globalFeedback.reading} />)}
        {activeTab === 'writing' && (<WritingFullPage isFullTest={true} setNextTest={setActiveTab} setCollectAnswer={addAnswer} questionId={[globalFeedback.writing?.result["task1"]["questionId"], globalFeedback.writing?.result["task2"]["questionId"]]} savedAnswer={globalFeedback.writing?.result} Feedback={{feedback1: globalFeedback.writing?.result.task1.result, feedback2:globalFeedback.writing?.result.task2.result }}/>)}
        {activeTab === 'speaking' && (<SpeakingProvider><FullSpeakingPage isFullTest={true} setNextTest={setActiveTab} setCollectAnswer={addAnswer} questionId={globalFeedback.speaking?.questionId} savedAnswer={globalFeedback.speaking?.answer} Feedback={globalFeedback.speaking?.result}/></SpeakingProvider>)}
      </div>
    </>
  )
}

export default withUser(FullTestPage);