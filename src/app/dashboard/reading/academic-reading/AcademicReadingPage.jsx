'use client'
import withUser from "@/hooks/withUser";
import { useRef } from "react";
import { useState, useCallback, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useUser } from "@/service/user";
import { FirebaseFunction } from "@/service/firebase";
import { httpsCallable } from "firebase/functions";
import { useSearchParams } from 'next/navigation';
import parse, { attributesToProps } from 'html-react-parser';
import Loader from "@/components/common/Loader";
import StartInstruction from "./StartInstruction";
import { SuccessMessage, ErrorMessage } from "@/app/dashboard/_components/Alert";
import ScoreComponent from "./ScoreComponent";
//import { sample2  } from "./TXx9UIizmorxstpgYcz0";





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

    return (
        <div className='block text-center bg-slate-800 rounded-md p-1'>
            <p className='text-2xl font-medium text-gray-900 text-white'>{timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</p>
        </div>
    );
};


const PassageWrapper = ({ children }) => {

    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseUp = (event) => {
            // Only handle mouseup events within the container and not on input elements
            if (containerRef.current && containerRef.current.contains(event.target) && event.target.tagName !== 'INPUT') {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);

                    // Extract the selected contents
                    const selectedContents = range.extractContents();

                    // Create a new document fragment to manipulate the selected content
                    const fragment = document.createDocumentFragment();

                    // Loop through each child node in the selected contents
                    Array.from(selectedContents.childNodes).forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // If it's an element node with the highlight, remove it
                            if (node.classList.contains('bg-yellow-300')) {
                                node.classList.remove('bg-yellow-300');
                                fragment.appendChild(node); // Add the node back without highlight
                            } else {
                                // If not highlighted, wrap in a new span with highlight
                                const wrapper = document.createElement('span');
                                wrapper.className = 'bg-yellow-300';
                                wrapper.appendChild(node);
                                fragment.appendChild(wrapper);
                            }
                        } else if (node.nodeType === Node.TEXT_NODE) {
                            // For text nodes, wrap in a span with highlight
                            const wrapper = document.createElement('span');
                            wrapper.className = 'bg-yellow-300';
                            wrapper.textContent = node.textContent;
                            fragment.appendChild(wrapper);
                        }
                    });

                    // Insert the modified fragment back into the document
                    range.insertNode(fragment);
                }
            }
        };

        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);


    return <div ref={containerRef}>
        {children}
    </div>
}


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


    return <input {...props} value={localValue} onChange={handleChange} onBlur={handleBlur} />;
};

const AcademicReadingPage = () => {
    const user = useUser();
    const [answer, setAnswer] = useState({});
    const [activeTab, setActiveTab] = useState(1);
    const [questions, setQuestion] = useState(null);
    const [testResult, setTestResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(false);
    const functions = FirebaseFunction();
    const params = useSearchParams();



    const handleAnswer = (questionId, value) => {
        setAnswer(prev => ({ ...prev, [questionId]: value }));
    }


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
                            className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === tab
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

    const options = {
        replace(domNode) {
            if (domNode.attribs && domNode.name === 'input') {
                const props = attributesToProps(domNode.attribs);
                return <ControlledInput
                    type="text"
                    name={`question-${props.name}`}
                    value={answer[props.name] || ""}
                    disable={testResult}
                    onChange={(value) => handleAnswer(props.name, value)}
                    className="w-md my-1 px-2 border border-gray-300 rounded"
                    placeholder={props.name}
                />;
            }
        },
    };


    const RenderQuestion = ({ part }) => {
        const QuestionWrapper = ({ children }) => (
            <div
                className="flex flex-col max-w-screen justify-center bg-white shadow-md rounded-lg p-6 mb-6 dark:bg-slate-800 dark:text-slate-400 space-y-6"
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
                        {part.html && (parse(part.html, options))}
                        {part.questions?.map((obj, idx) => (
                            <div key={idx} >
                                <p className="font-medium">{obj?.number}. {obj?.question}</p>
                                <ControlledInput
                                    type="text"
                                    name={`question-${obj.number}`}
                                    value={answer[obj.number] || ""}
                                    onChange={(value) => handleAnswer(obj.number, value)}
                                    className="w-md my-1 px-2 border border-gray-300 rounded overflow-x-auto max-w-md"
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
                        {part.questions?.map((obj, idx) => (
                            <div key={idx} className="space-x-4">
                                <span className="font-medium">{obj.number}.{obj.question}</span>
                                <select
                                    className="flex-grow my-1 px-2 border border-gray-300 rounded overflow-x-auto max-w-md"
                                    name={`question-${obj.number}`}
                                    onChange={(e) => handleAnswer(obj.number, e.target.value)}
                                    value={answer[obj.number]}
                                >
                                    <option value="" >Select</option>
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

    }

    const getAnswers = async (userAnswer) => {
        try {
            let data;
            let score;
            setLoading(true);
            const getData = httpsCallable(functions, 'getQuestionAnswers');
            await getData({ type: "reading-questions", id: questions["questionId"], userAnswer: userAnswer, userId: user.uid }).then((result) => {
                data = result.data;
                score = data['result']
                SuccessMessage({ score: score["overall"] })
                setLoading(false);
            });
            return [data, score];
        } catch {
            ErrorMessage("Error calculating your score.")
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const [answerData, score] = await getAnswers(answer);
        const result = { ...answerData, result: score }
        setTestResult(result);
    };


    const getQuestionID = async () => {
        const getData = httpsCallable(functions, 'getQuestion');
        getData({ type: "reading-questions", id: params.get("id") }).then((result) => {
            setQuestion(result.data)
        });
    };


    useEffect(() => {
        //getQuestions();
        getQuestionID();
    }, []);


    if (!questions) {
        return <Loader />
    };

    if (questions && !start) {
        return <StartInstruction setStart={setStart} />
    }

    return (
        <>
            <Breadcrumb pageName="Academic Reading" />
            <div className="flex flex-1 justify-center">
                <div className='fixed w-full flex justify-center bg-white bg-opacity-0 items-center py-1  top-20 inline-block gap-4 z-50'>
                    {start && (<Timer minutes={60} seconds={0} />)}
                </div>
                <main className='bg-white rounded-sm w-full text-black h-full py-14 dark:bg-slate-800 dark:text-slate-400 p-8' id="main" role="main">
                    {testResult && (<ScoreComponent score={testResult['result']} />)}
                    {questions && (
                        <form onSubmit={handleSubmit} className="min-h-screen" >
                            <div className="min-h-screen space-y-6">
                                {questions["questions"].map((question, index) => {
                                    if (question.section === activeTab) {
                                        return (
                                            <div className="flex flex-col md:flex-row min-h-screen" key={index}>
                                                <div className="flex flex-col w-full md:w-1/2 relative overflow-y-auto max-h-screen">
                                                    {question.html && (<PassageWrapper>{parse(question.html, options)}</PassageWrapper>)}
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
                                {!testResult && (
                                    <button
                                        className="bg-blue-600 hover:bg-orange-400 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                                        type="submit"
                                    >
                                        {!loading ? 'Submit' : 'Loading...'}
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                </main>
            </div>

        </>
    )
};

export default withUser(AcademicReadingPage);