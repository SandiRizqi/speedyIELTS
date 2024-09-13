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




const WritingFullPage = ({ isFullTest, setCollectAnswer, setNextTest, questionId, savedAnswer, Feedback }) => {
  const user = useUser();
  const [start, setStart] = useState(questionId ? true : false);
  const [finish, setFinish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState(savedAnswer || {
    task1: {
      createdAt: Date.now(),
      questionId: '',
      testType: 'WritingTask1',
      answer: '',
      userId: user.uid,
    },
    task2:
    {
      createdAt: Date.now(),
      questionId: '',
      testType: 'WritingTask2',
      answer: '',
      userId: user.uid,
    }
  });
  const [feedback, setFeedback] = useState(Feedback || null);
  const [question, setQuestion] = useState(null);
  const functions = FirebaseFunction();
  const [activeTab, setActiveTab] = useState(1);





  const handleSubmit = async () => {

    if (isFullTest) {
      setCollectAnswer(prev => ({ ...prev, writing: { ...prev['writing'], ...answer, done: true, userId: user.uid, testType: "WritingFullAcademic" } }));
      return setNextTest('navigation')
    }

    setIsLoading(true);
    try {
      const getData = httpsCallable(functions, 'getWritingFullScore');
      const res = await getData({ ...answer, userId: user.uid, testType: "WritingFullAcademic" });
      const data = res["data"]["result"];
      setFeedback({ feedback1: data["task1"]["result"], feedback2: data["task2"]["result"] });
      setIsLoading(false);
      SuccessMessage({ score: data["overall"] })

    } catch (error) {
      ErrorMessage(error);

    } finally {
      setIsLoading(false);
    }
  };





  const getQuestion = async (typequest, id) => {
    const getData = httpsCallable(functions, 'getQuestion');
    let quest;
    try {
      await getData({ type: typequest, id: id }).then((result) => {
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