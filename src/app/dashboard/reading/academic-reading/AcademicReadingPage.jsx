'use client'
import withUser from "@/hooks/withUser";
import { useState, useCallback, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FirestoreDB } from "@/service/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useUser } from "@/service/user";
import { FirebaseFunction } from "@/service/firebase";
import { httpsCallable } from "firebase/functions";
//import { sample2  } from "./TXx9UIizmorxstpgYcz0";


const ControlledInput = ({ value, onChange, ...props }) => {
    const [localValue, setLocalValue] = useState(value);

    const handleChange = (e) => {
        setLocalValue(e.target.value);
    };

    const handleBlur = () => {
        onChange(localValue);
    }


    return <input {...props} value={value} onChange={handleChange} onBlur={handleBlur}/>;
};






const AcademicReadingPage = () => {
    const user = useUser();
    const [answer, setAnswer] = useState({});
    const [activeTab, setActiveTab] = useState(1);
    const [questions, setQuestion] = useState(null);
    const functions = FirebaseFunction();
   

    function TabNavigation() {
        const tabs = [1, 2, 3];
      
        const handleKeyDown = useCallback((e) => {
          if (e.key === 'ArrowRight') {
            setActiveTab((prev) => (prev + 1) % tabs.length);
          } else if (e.key === 'ArrowLeft') {
            setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
          }
        }, [tabs.length]);
      
        return (
          <div className="flex w-full justify-end">
            <div className="flex border-b border-gray-200" role="tablist" onKeyDown={handleKeyDown}>
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={activeTab === tab}
                  tabIndex={activeTab === tab ? 0 : -1}
                  className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 text-blue-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  SECTION-{tab}
                </button>
              ))}
            </div>
          </div>
        );
      }

    const handleAnswer = (number, value) => {
        setAnswer(prev => ({ ...prev, [number]: value }))
        console.log(answer)
    }

    const RenderQuestion = ({part}) => {
        const QuestionWrapper = ({ children }) => (
            <div
                className="bg-white shadow-md rounded-lg p-6 mb-6 dark:bg-slate-800 dark:text-slate-400 space-y-6"
            >
                <h3 className="text-lg text-gray-700 mb-4">{part?.instruction}</h3>
                {part?.image && (<img src={part.image} alt="image" className="" />)}
                {children}
            </div>
        );

        switch (part.type) {
            
            case "gap_filling":
                return (
                    <QuestionWrapper>
                        {part.questions.map((obj, idx) => (
                            <div key={idx} >
                                <p className="font-medium">{obj?.number}. {obj?.question}</p>
                                <ControlledInput
                                    type="text"
                                    name={`question-${obj.number}`}
                                    value={answer[obj.number]}
                                    onChange={(value) => handleAnswer(obj.number, value)}
                                    className="w-md p-2 border border-gray-300 rounded"
                                    placeholder="Type your answer here"
                                />
                            </div>
                        ))}
                    </QuestionWrapper>
                )
            case "matching":
            case "matching_headings":
                return (
                    <QuestionWrapper>
                        {part.questions.map((obj, idx) => (
                            <div key={idx} className="space-x-4">
                                <span className="font-medium">{obj.number}.{obj.question}</span>
                                <select
                                    className="flex-grow p-2 border border-gray-300 rounded"
                                    name={`question-${obj.number}`}
                                    onChange={(e) => handleAnswer(obj.number, e.target.value)}
                                    value={answer[obj.number]}
                                >
                                    <option value="">Select</option>
                                    {Object.keys(part.options).map((key, index) => (
                                        <option key={index} value={key}>{key}. {part.options[key]}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </QuestionWrapper>
                )
            case "multiple_choice":
                return (
                    <QuestionWrapper>
                        {part.questions.map((question, idx) => (
                            <div className="space-y-2" key={idx}>
                                <p className="font-medium">{question.number}.{question.question}</p>
                                {question.options.map((option, index) => (
                                    
                                        <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name={`question-${question.number}`}
                                                value={option.split(".")[0]}
                                                onChange={(e) => handleAnswer(question.number, e.target.value)}
                                                checked={answer[question.number] === option.split(".")[0]}
                                                className="form-radio text-blue-600"
                                            />
                                            <span>{option}</span>
                                        </label>
                                
                                ))}
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
                                    value={answer[obj.number]}
                                    onChange={(value) => handleAnswer(obj.number, value)}
                                    className="w-md p-2 border border-gray-300 rounded"
                                    placeholder="Type your answer here"
                                />
                            </div>
                        ))}
                    </QuestionWrapper>
                )
            default:
                return null;
        }

    }

    async function handleSubmit() {
        console.log("submit")
    };



    const getQuestionID = async () => {
        const getData = httpsCallable(functions, 'getQuestion');
        getData({ type: "reading-questions", id: null }).then((result) => {
          setQuestion(result.data['question'])
        });
      };


    useEffect(() => {
        //getQuestions();
        getQuestionID();
    },[])

    return (
        <>
            <Breadcrumb pageName="Academic Reading" />
            <main className='bg-white rounded-sm w-full h-full py-14 dark:bg-slate-800 dark:text-slate-400 p-8' id="main" role="main">
                {questions && (
                    <form onSubmit={handleSubmit} className="min-h-screen">
                    <div className="min-h-screen space-y-6">
                        {questions.map((question, index) => {
                            if (question.section === activeTab) {
                                return (
                                    <div className="flex flex-col md:flex-row min-h-screen" key={index}>
                                        <div className="flex flex-col w-full md:w-1/2 relative overflow-y-auto max-h-screen">
                                            {question.image.map((url, idx) => (
                                                <img src={url} alt="image" className="" key={idx} />
                                            ))}
                                        </div>
                                        <div className="w-full md:w-1/2 p-4 flex flex-col overflow-y-auto max-h-screen">
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
                    <div className="mt-8 flex justify-end gap-4">
                        <TabNavigation />
                        <button
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                )}
            </main>
        </>
    )
};

export default withUser(AcademicReadingPage);