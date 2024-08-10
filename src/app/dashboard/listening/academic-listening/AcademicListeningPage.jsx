'use client'
import withUser from "@/hooks/withUser";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState, useCallback, useEffect } from "react";
import parse, { attributesToProps } from 'html-react-parser';
import { useRef } from "react";
import { useUser } from "@/service/user";
import { useSearchParams } from "next/navigation";
import AudioPlayer from "./AudioPlayer";
import ScoreComponent from "./ScoreComponent";
import { FirebaseFunction } from "@/service/firebase";
import { httpsCallable } from "firebase/functions";
import Loader from "@/components/common/Loader";
import StartInstruction from "./StartInstruction";
//import { sample1 as questions } from "./sample1";


const Timer = ({ minutes, seconds }) => {
    const [timeLeft, setTimeLeft] = useState({ minutes, seconds });

    useEffect(() => {
      const interval = setInterval(() => {
        if (timeLeft.seconds > 0) {
          setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
        } else if (timeLeft.minutes > 0) {
          setTimeLeft({ minutes: timeLeft.minutes - 1, seconds: 59 });
        } else {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [timeLeft]);

    useEffect(() => {
      if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        setFinish(true);
      }
    }, [timeLeft]);

    return (
      <div className='block text-center bg-slate-800 rounded-md p-1'>
        <p className='text-2xl font-medium text-gray-900 text-white'>{timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</p>
      </div>
    );
  };


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
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState({});
    const [activeTab, setActiveTab] = useState(1);
    const [testResult, setTestResult] = useState(null);
    const [questions, setQuestion] = useState(null);
    const [audioPath, setAudioPath ] = useState(null);
    const [start, setStart] = useState(false);
    const functions = FirebaseFunction();
    const formRef = useRef(null);
    const params = useSearchParams();

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
                className="w-md my-1 px-2 border border-gray-300 rounded"
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
                                    className="w-md my-1 px-2 border border-gray-300 rounded"
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
                                    className="w-md my-1 px-2 border border-gray-300 rounded"
                                    placeholder="Type your answer here"
                                />
                            </div>
                        ))}
                    </QuestionWrapper>
                )
            default:
                return null;
        }

    };

    const calculateScore = (userData, keyAnswers) => {
        let score = 0;
        const totalQuestions = Object.keys(keyAnswers).length;
      
        // Iterate over the key answers
        for (const [questionId, correctAnswers] of Object.entries(keyAnswers)) {
          const userAnswer = userData[questionId];
          if (correctAnswers.includes(userAnswer?.toUpperCase())) {
            score += 1; // Increase score if the user's answer is correct
          }
        }
        const totalScore = {
            correct: score,
            totalQuestion: totalQuestions
        }
        return totalScore;
    };
      

    

    const getQuestionID = async () => {
        const getData = httpsCallable(functions, 'getQuestion');
        getData({ type: "listening-questions", id: params.get("id") }).then((result) => {
            const quest = result.data;
            const paths = quest["questions"].map(obj => obj.audio);
            setAudioPath(paths);
            setQuestion(quest);
        });
    };

    const getAnswers = async (userAnswer) => {
        let data;
        let score;
        setLoading(true);
        const getData = httpsCallable(functions, 'getQuestionAnswers');
        await getData({ type: "listening-questions", id: questions["questionId"], userAnswer: userAnswer }).then((result) => {
            data = result.data;  
            score = data['result']
            setLoading(false);
        });
        return [data, score];   
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const [answerData, score] = await getAnswers(answer);
        const result = {...answerData, result: score}
        setTestResult(result);
    };




    useEffect(() => {
        getQuestionID();
    },[])

    if (!questions) {
        return <Loader />
    };

    if (questions && !start) {
        return <StartInstruction setStart={setStart}/>
    }

    

    return (
        <>
            <Breadcrumb pageName="Academic Listening" />
            <main className='bg-white text-black rounded-sm w-full h-full py-14 dark:bg-slate-800 dark:text-slate-400 p-8' id="main" role="main">
                {audioPath && !testResult && (<AudioPlayer audioUrls={audioPath}/>)}
                {testResult && (<ScoreComponent score={testResult['result']}/>)}
                {questions && (
                    <form onSubmit={handleSubmit} className="min-h-screen" ref={formRef} id="answerform">
                    
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
                    <div className="mt-8 flex justify-end gap-4">
                        <TabNavigation />
                        <button
                            className="bg-blue-600 hover:bg-orange-400 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                            type="submit"
                        >
                            {!loading ? 'Submit' : 'Loading...'}
                        </button>
                    </div>
                </form>
                )}
            </main>
        </>
    )
};

export default withUser(AcademicListeningPage);