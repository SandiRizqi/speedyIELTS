'use client'
import withUser from "@/hooks/withUser";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState, useCallback, useEffect, useRef } from "react";
import parse, { attributesToProps } from 'html-react-parser';
import { useUser } from "@/service/user";
import { useSearchParams } from "next/navigation";
import AudioPlayer from "./AudioPlayer";
import ScoreComponent from "./ScoreComponent";
import { FirebaseFunction } from "@/service/firebase";
import { httpsCallable } from "firebase/functions";
import Loader from "@/components/common/Loader";
import StartInstruction from "./StartInstruction";
import { SuccessMessage } from "@/app/dashboard/_components/Alert";
import TestLayout from "@/components/Layouts/TestLayout";






const AcademicListeningPage = ({ isFullTest, setCollectAnswer, setNextTest, questionId, savedAnswer, Feedback, Result }) => {
    const user = useUser();
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState(savedAnswer || {});
    const [activeTab, setActiveTab] = useState(1);
    const [finish, setFinish] = useState(false);
    const [testResult, setTestResult] = useState(Result || null);
    const [questions, setQuestion] = useState(null);
    const [audioPath, setAudioPath] = useState(null);
    const [start, setStart] = useState(questionId ? true : false);
    const [feedback, setFeedback] = useState(Feedback || null)
    const functions = FirebaseFunction();
    const formRef = useRef(null);
    const params = useSearchParams();



    const ControlledInput = ({ value, onChange, ...props }) => {
        const [localValue, setLocalValue] = useState(value);

        const handleChange = (e) => {
            setLocalValue(e.target.value);
            // onChange(e.target.value);
        };

        const handleBlur = () => {
            //console.log(localValue)
            onChange(localValue);
        }
        return (
            <div>
                {/* Input Field */}
                <input
                    {...props}
                    value={localValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {/* Feedback Text Below the Input */}
                <div className="mt-1 text-sm text-black-600">
                    {props.feedback?.map((item, index) => (
                        <span
                            key={index}
                            className={`inline-block px-2 py-1 text-xs font-semibold text-white mr-1 ${feedback[props.number].includes(answer[props.number]?.toUpperCase()) ? "bg-green-600" : "bg-danger"}`}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        );
    };






    const handleAnswer = (questionId, answer) => {
        setAnswer(prev => ({ ...prev, [questionId]: answer }));
    }


    const RenderQuestion = ({ part }) => {
        const QuestionWrapper = ({ children }) => (
            <div
                className="bg-white shadow-md rounded-lg p-6 mb-6 dark:bg-slate-800 dark:text-slate-400 space-y-6"
            >
                <h3 className="text-lg text-gray-700 mb-4">{part?.instruction}</h3>
                {part?.image && (<img src={part.image} alt="image" className="" />)}
                {children}
            </div>
        );

        const options = {
            replace(domNode) {
                if (domNode.attribs && domNode.name === 'input') {
                    const props = attributesToProps(domNode.attribs);

                    return <>
                        <ControlledInput
                            type="text"
                            number={props.name}
                            name={`question-${props.name}`}
                            value={answer[props.name] || ""}
                            onChange={(value) => handleAnswer(props.name, value)}
                            className="w-md my-1 px-2 border border-gray-300 rounded"
                            placeholder={props.name}
                            feedback={feedback ? feedback[props.name] : null}
                        />
                    </>
                }
            },
        };

        switch (part.type) {

            case "gap_filling":
                return (
                    <QuestionWrapper>
                        {part.html && (parse(part.html, options))}
                        {part.questions?.map((obj, idx) => (
                            <div key={idx} >
                                <p className="font-medium">{obj?.number}. {obj?.question}</p>
                                <ControlledInput
                                    type="text"
                                    name={`question-${obj.number}`}
                                    value={answer[obj.number] || ""}
                                    onChange={(value) => handleAnswer(obj.number, value)}
                                    className="w-md my-1 px-2 border border-gray-300 rounded"
                                    placeholder="Type your answer here"
                                    feedback={feedback ? feedback[obj.name] : null}
                                    number={obj.number}
                                />
                            </div>
                        ))}

                    </QuestionWrapper>
                )
            case "matching":
            case "matching_headings":
                return (
                    <QuestionWrapper>
                        {part.html && (parse(part.html, options))}
                        {part.questions?.map((obj, idx) => (
                            <div key={idx} className="space-x-4">
                                <span className="font-medium">{obj.number}.{obj.question}</span>
                                <select
                                    className="flex-grow my-1 px-2 border border-gray-300 rounded"
                                    name={`question-${obj.number}`}
                                    onChange={(e) => handleAnswer(obj.number, e.target.value)}
                                    value={answer[obj.number]}
                                >
                                    <option value="">Select</option>
                                    {Object.keys(part.options).map((key, index) => (
                                        <option key={index} value={key}>{key}. {part.options[key]}</option>
                                    ))}
                                </select>
                                <div className="mt-1 text-sm text-black-600">
                                    {feedback ? feedback[obj.number].map((item, index) => (
                                        <span
                                            key={index}
                                            className={`inline-block px-2 py-1 text-xs font-semibold text-white mr-1 ${feedback[obj.number].includes(answer[obj.number]?.toUpperCase()) ? "bg-green-600" : "bg-danger"}`}
                                        >
                                            {item}
                                        </span>
                                    )) : null}
                                </div>
                            </div>
                        ))}
                    </QuestionWrapper>
                )
            case "multiple_choice":
                return (
                    <QuestionWrapper>
                        {part.html && (parse(part.html, options))}
                        {part.questions?.map((question, idx) => (
                            <div className="space-y-2" key={idx}>
                                <p className="font-medium">{question.number}.{question.question}</p>
                                {question.options.map((option, index) => (

                                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`question-${question.number}`}
                                            value={option.split(".")[0] || ""}
                                            onChange={(e) => handleAnswer(question.number, e.target.value)}
                                            checked={answer[question.number] === option.split(".")[0]}
                                            className="form-radio text-blue-600"
                                        />
                                        <span>{option}</span>
                                    </label>

                                ))}
                                {feedback && (
                                    <div className="mt-1 text-sm text-black-600">
                                        <span
                                            className={`inline-block px-2 py-1 text-xs font-semibold text-white mr-1 ${feedback[question.number].includes(answer[question.number]?.toUpperCase()) ? "bg-green-600" : "bg-danger"}`}
                                        >
                                            {feedback[question.number]}
                                        </span>
                                    </div>
                                )}
                            </div>

                        ))}
                    </QuestionWrapper>
                )
            case "diagram_labelling":
            case "true_false_not_given":
            case "yes_no_not_given":
                return (
                    <QuestionWrapper>
                        {part.questions.map((obj, idx) => (
                            <div key={idx} >
                                <p className="font-medium">{obj.number}. {obj.question}</p>
                                <ControlledInput
                                    type="text"
                                    name={`question-${obj.number}`}
                                    value={answer[obj.number] || ""}
                                    onChange={(value) => handleAnswer(obj.number, value)}
                                    className="w-md my-1 px-2 border border-gray-300 rounded"
                                    placeholder="Type your answer here"
                                />
                                {feedback && (
                                    <div className="mt-1 text-sm text-black-600">
                                        <span
                                            className={`inline-block px-2 py-1 text-xs font-semibold text-white mr-1 ${feedback[obj.number].includes(answer[obj.number]?.toUpperCase()) ? "bg-green-600" : "bg-danger"}`}
                                        >
                                            {feedback[obj.number]}
                                        </span>
                                    </div>

                                )}

                            </div>
                        ))}
                    </QuestionWrapper>
                )
            default:
                return null;
        }

    };







    const getAnswers = async (userAnswer) => {
        let data;
        let score;
        setLoading(true);
        const getData = httpsCallable(functions, 'getQuestionAnswers');
        await getData({ type: "listening-questions", id: questions["questionId"], userAnswer: userAnswer, userId: user.uid, testType: "ListeningAcademic" }).then((result) => {
            data = result.data;
            score = data['result']
            setFeedback(data['corrections'])
            setLoading(false);
            SuccessMessage({ score: score['overall'] });
        });
        return [data, score];
    };

    const handleSubmit = async () => {
        // e.preventDefault();
        const [answerData, score] = await getAnswers(answer);
        const result = { ...answerData, result: score }
        setTestResult(result);
    };


    const handleCollect = () => {
        // e.preventDefault();
        setCollectAnswer(prev => ({ ...prev, listening: { ...prev['listening'], userAnswer: answer, done: true, type: "listening-questions", id: questions["questionId"], userId: user.uid, testType: "ListeningAcademic" } }));
        setNextTest('navigation');
    };



    useEffect(() => {
        if (finish) {
            if (isFullTest) {
                handleCollect();
            } else {
                handleSubmit();
            }
        }

    }, [finish])



    useEffect(() => {
        const getQuestionID = async () => {
            const getData = httpsCallable(functions, 'getQuestion');
            getData({ type: "listening-questions", id: params.get("id") || questionId }).then((result) => {
                const quest = result.data;
                const paths = quest["questions"].map(obj => obj.audio);
                setAudioPath(paths);
                setQuestion(quest);
                if (isFullTest) {
                    setCollectAnswer(prev => ({ ...prev, listening: { ...prev['listening'], questions: result.data['questions'], questionId: result.data['questionId'], audio: paths } }));
                }
            });
        };

        if (!questions) {
            getQuestionID();
        };

    }, [])

    if (!questions) {
        return <Loader />
    };

    if (questions && !start) {
        return <StartInstruction setStart={setStart} />
    }






    return (
        <TestLayout onSubmit={() => setFinish(true)} activePart={activeTab} setActivePart={setActiveTab} tabs={[1, 2, 3, 4]} time={35} loading={loading} finish={finish} onCancel={setNextTest ? () => setNextTest('navigation') : null}>
            <>

                <main className='bg-white text-black rounded-sm py-14 dark:bg-slate-800 dark:text-slate-400 p-8' id="main" role="main" >
                    {audioPath && !testResult && (<AudioPlayer audioUrls={audioPath} />)}
                    {testResult && (<ScoreComponent score={testResult['result']} />)}
                    {questions && (
                        <form className="min-h-screen" ref={formRef} >
                            <div className="min-h-screen space-y-6">
                                {questions["questions"].map((question, index) => {
                                    if (question.section === activeTab) {
                                        return (
                                            <div className="flex flex-col md:flex-row min-h-screen" key={index}>
                                                <div className="w-full p-4 flex flex-col ">
                                                    {question.parts.map((obj, idx) => (
                                                        <div key={idx}>
                                                            <RenderQuestion part={obj} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>

                        </form>
                    )}
                    {/* <div className="mt-8 flex justify-end gap-4">
                     <TabNavigation setActiveTab={setActiveTab} activeTab={activeTab}/>
                     {!testResult && (
                         <button
                         className="bg-blue-600 hover:bg-orange-400 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                         onClick={!isFullTest ? handleSubmit: handleCollect}
                     >
                         {!loading ? 'Submit' : 'Loading...'}
                     </button>
                     )}
                 </div> */}
                </main>
            </>
        </TestLayout>
    )
};

export default withUser(AcademicListeningPage);