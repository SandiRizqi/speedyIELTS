'use client'
import withUser from "@/hooks/withUser";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState, useCallback, useEffect } from "react";
import parse, { attributesToProps } from 'html-react-parser';
import { useRef } from "react";
import { useUser } from "@/service/user";
import { FirestoreDB } from "@/service/firebase";
import { collection, getDocs } from "firebase/firestore";
import AudioPlayer from "./AudioPlayer";
//import { sample1 as questions } from "./sample1";


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


    return <input {...props} value={localValue} onChange={handleChange} onBlur={handleBlur}/>;
};

const AcademicListeningPage = () => {
    const user = useUser();
    const [answer, setAnswer] = useState({});
    const [activeTab, setActiveTab] = useState(1);
    const [questions, setQuestion] = useState(null);
    const [audioPath, setAudioPath ] = useState(null);
    const db = FirestoreDB();
    const questionsRef = collection(db, "listening-questions");
    const formRef = useRef(null);

    const handleAnswer = (questionId, answer) => {
        setAnswer(prev => ({ ...prev, [questionId]: answer }));
    }

    function TabNavigation() {
        const tabs = [1, 2, 3, 4];
      
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

        const options = {
            replace(domNode) {
              if (domNode.attribs && domNode.name === 'input') {
                const props = attributesToProps(domNode.attribs);
                return<ControlledInput
                type="text"
                name={`question-${props.name}`}
                value={answer[props.name] || "" }
                onChange={(value) => handleAnswer(props.name, value)}
                className="w-md p-2 border border-gray-300 rounded"
                placeholder={props.name}
            />;
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
                        {part.html && (parse(part.html, options))}
                        {part.questions?.map((obj, idx) => (
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', answer);
        
    };


    const getQuestions = async () => {
        try {
            const querySnapshot = await getDocs(questionsRef);
            const questions = querySnapshot.docs.map(doc => {return { ...doc.data(),questionId: doc.id, userId: user.uid}});
            const randomIndex = Math.floor(Math.random() * questions.length);
            const selectedQuestion = questions[randomIndex]
            const quest = selectedQuestion['question']
            const paths = quest.map(obj => obj.audio);
            setAudioPath(paths);
            setQuestion(quest);
                 
        } catch (error) {
            console.error("Error fetching questions:", error);
        } 
    };


    useEffect(() => {
        getQuestions();
    },[])

    

    return (
        <>
            <Breadcrumb pageName="Academic Listening" />
            
            <main className='bg-white rounded-sm w-full h-full py-14 dark:bg-slate-800 dark:text-slate-400 p-8' id="main" role="main">
                
                {questions && (
                    <form onSubmit={handleSubmit} className="min-h-screen" ref={formRef} id="answerform">
                    {audioPath && (<AudioPlayer audioUrls={audioPath}/>)}
                    <div className="min-h-screen space-y-6">
                        {questions.map((question, index) => {
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

export default withUser(AcademicListeningPage);