'use client'
import React from 'react';
import WritingOne from './_writingone/page';
import WritingTwo from './_writingtwo/page';
import { useState, useEffect, useCallback } from 'react';
import StartInstruction from './StartInstruction';
import Loader from '@/components/common/Loader';
import { httpsCallable } from 'firebase/functions';
import { FirebaseFunction } from '@/service/firebase';
import { SuccessMessage, ErrorMessage } from '../../_components/Alert';
import { useUser } from '@/service/user';
import withSubscription from '@/hooks/withSubscribtion';
import TestLayout from '@/components/Layouts/TestLayout';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';



const WritingFullPage = ({ isFullTest, setCollectAnswer, setNextTest, questionId, savedAnswer, Feedback }) => {
  const searchParams = useSearchParams();
  const user = useUser();
  const {userState} = user;
  const [start, setStart] = useState(questionId ? true : false);
  const [finish, setFinish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState(savedAnswer || {
    task1: {
      createdAt: Date.now(),
      questionId: '',
      testType: 'WritingTask1',
      answer: '',
      userId: userState.uid,
    },
    task2:
    {
      createdAt: Date.now(),
      questionId: '',
      testType: 'WritingTask2',
      answer: '',
      userId: userState.uid,
    }
  });
  const [feedback, setFeedback] = useState(Feedback || null);
  const [question, setQuestion] = useState(null);
  const functions = FirebaseFunction();
  const [activeTab, setActiveTab] = useState(1);
  const [testResult, setTestResult] = useState(null);
  const db = getFirestore();
  
  // Update the getResult function to handle the answer state more safely
const getResult = async (selectedId) => {
  try {
    const testTakenRef = doc(db, 'test-taken', selectedId);
    const testTakenDoc = await getDoc(testTakenRef);

    if (testTakenDoc.exists()) {
      const firestoreData = testTakenDoc.data();
      
      // Only process if it's a Writing Full Test
      if (firestoreData.testType === 'WritingFullAcademic') {
        setStart(true);
        setTestResult(firestoreData);
        
        // Check if result exists before accessing nested properties
        if (firestoreData.result?.task1?.result && firestoreData.result?.task2?.result) {
          setFeedback({
            feedback1: firestoreData.result.task1.result,
            feedback2: firestoreData.result.task2.result
          });
        }

        // Safely update answer state
        setAnswer(prevAnswer => ({
          task1: {
            ...(prevAnswer?.task1 || {}),
            createdAt: Date.now(),
            questionId: firestoreData.questionIds?.[0] || '',
            testType: 'WritingTask1',
            answer: firestoreData.result.task1.answer,
            userId: userState.uid,
          },
          task2: {
            ...(prevAnswer?.task2 || {}),
            createdAt: Date.now(),
            questionId: firestoreData.questionIds?.[1] || '',
            testType: 'WritingTask2',
            answer: firestoreData.result.task2.answer,
            userId: userState.uid,
          }
        }));
        
        // Only fetch questions if we have questionIds
        if (firestoreData.questionIds?.length >= 2) {
          const questions = await Promise.all([
            getQuestion("writing1-questions", firestoreData.questionIds[0]),
            getQuestion("writing2-questions", firestoreData.questionIds[1])
          ]);
          
          if (questions[0] && questions[1]) {
            setQuestion({
              question1: questions[0],
              question2: questions[1]
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching Firestore data:', error);
    ErrorMessage(error);
  }
};

  useEffect(() => {
    const resultParam = searchParams.get('result');
    if (resultParam) {
      getResult(resultParam);
    }
  }, [searchParams]);



  const handleSubmit = async () => {

    if (isFullTest) {
      setCollectAnswer(prev => ({ ...prev, writing: { ...prev['writing'], ...answer, done: true, userId: userState.uid, testType: "WritingFullAcademic" } }));
      return setNextTest('navigation')
    }

    setIsLoading(true);
    try {
      const getData = httpsCallable(functions, 'getWritingFullScore');
      const res = await getData({ ...answer, userId: userState.uid, testType: "WritingFullAcademic" });
      const data = res["data"]["result"];
      setFeedback({ feedback1: data["task1"]["result"], feedback2: data["task2"]["result"] });
      setIsLoading(false);
      SuccessMessage({ score: data["overall"] })

    } catch (error) {
      ErrorMessage(error);
      setFinish(false);

    } finally {
      setIsLoading(false);
    }
  };





  const getQuestion = async (typequest, id) => {
    const getData = httpsCallable(functions, 'getQuestion');
    let quest;
    try {
      await getData({ type: typequest, id: id, userId: userState.uid, }).then((result) => {
        quest = result.data;

      });
      return quest;

    } catch (error) {
      ErrorMessage(error)
    }

  };


  useEffect(() => {
    const fetchData = async () => {

      try {
        const [question1, question2] = await Promise.all([
          getQuestion("writing1-questions", questionId ? questionId[0] : null),
          getQuestion("writing2-questions", questionId ? questionId[1] : null),
        ]);

        if (!question1 || !question2) {
          ErrorMessage("Failed to get questions.");
          throw new Error('Failed to fetch data');
        };
        setAnswer(prev => ({ ...prev, task1: { ...prev['task1'], ...question1 }, task2: { ...prev['task2'], ...question2 } }))
        setQuestion({ question1: question1, question2: question2 });
        if (isFullTest) {
          setCollectAnswer(prev => ({ ...prev, writing: { ...prev['writing'], question: { question1: question1, question2: question2 } } }));
        }

      } catch (error) {
        ErrorMessage(error);
      };
    };

    if (!question) {
      fetchData();
    };




  }, [question])


  useEffect(() => {
    if (finish) {
      handleSubmit();
    }

  }, [finish])



  if (!question) {
    return <Loader />
  }

  if (!start && question) {
    return <StartInstruction setStart={setStart} />
  };


  return (
    <>
      <TestLayout onSubmit={() => setFinish(true)} activePart={activeTab} setActivePart={setActiveTab} tabs={[1, 2]} time={60} loading={isLoading} finish={finish} onCancel={setNextTest ? () => setNextTest('navigation') : null} labels={"Task"}>
        <div className='flex flex-1 justify-center'>
          <div className='dark:bg-slate-800 dark:text-slate-400 dark:border-slate-800 bg-white'>
            {activeTab === 1 ? <WritingOne question={question} answer={answer['task1']} setAnswer={setAnswer} feedback={feedback?.feedback1} isLoading={isLoading} /> : <WritingTwo question={question} answer={answer['task2']} setAnswer={setAnswer} feedback={feedback?.feedback2} isLoading={isLoading} />}
          </div>
        </div>

      </TestLayout>

    </>
  );
}


export default withSubscription(WritingFullPage); 