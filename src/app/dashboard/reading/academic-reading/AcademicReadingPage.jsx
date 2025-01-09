'use client'
import withUser from "@/hooks/withUser";
import { useRef } from "react";
import { useState, useEffect } from "react";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TestLayout from "@/components/Layouts/TestLayout";
import { useUser } from "@/service/user";
import { FirebaseFunction } from "@/service/firebase";
import { httpsCallable } from "firebase/functions";
import { useSearchParams } from 'next/navigation';
import parse, { attributesToProps } from 'html-react-parser';
import Loader from "@/components/common/Loader";
import StartInstruction from "./StartInstruction";
import { SuccessMessage, ErrorMessage } from "@/app/dashboard/_components/Alert";
import ScoreComponent from "./ScoreComponent";
import { motion } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


const InteractiveResizeHandle = ({ onMouseDown }) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <motion.div
        className="w-3 bg-slate-100 cursor-col-resize flex items-center justify-center"
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onMouseDown={(e) => {
          setIsActive(true);
          onMouseDown(e);
        }}
        animate={{
          backgroundColor: isActive ? "#94a3b8" : "#cbd5e1",
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="h-8 flex items-center justify-center"
          animate={{
            scale: isActive ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <ChevronsLeftRight
            className="text-slate-900 z-1 dark:text-orange-400" 
            size={30}
          />
        </motion.div>
      </motion.div>
    )
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





const AcademicReadingPage = ({ isFullTest, setCollectAnswer, setNextTest, questionId, savedAnswer, Feedback, Result, Tab }) => {
    const user = useUser();
    const {userState} = user;
    const [answer, setAnswer] = useState(savedAnswer || {});
    const [finish, setFinish] = useState(false);
    const [activeTab, setActiveTab] = useState(Tab || 1);
    const [questions, setQuestion] = useState(null);
    const [testResult, setTestResult] = useState(Result || null);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(questionId ? true : false);
    const [feedback, setFeedback] = useState(Feedback || null)
    const functions = FirebaseFunction();
    const params = useSearchParams();
    const [leftWidth, setLeftWidth] = useState(50); // Initial width of left column (percentage)
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const db = getFirestore();

    const getResult = async (selectedId) => {
        try {
            const testTakenRef = doc(db, 'test-taken', selectedId);
            const testTakenDoc = await getDoc(testTakenRef);
    
            if (testTakenDoc.exists()) {
                setStart(true);
                const firestoreData = testTakenDoc.data();
                console.log(firestoreData);
                getQuestionID(firestoreData['questionId'])
                setTestResult(firestoreData);
                setFeedback(firestoreData['corrections']);
                setAnswer(firestoreData['answers'])
                return;
            }
    
            return null;
        } catch (error) {
            console.error('Error fetching Firestore data:', error);
        }
    };

    useEffect(() => {
        if (params.get("result") || null) {
            getResult(params.get("result"));
        }
    }, [params])

    useEffect(() => {
        const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth < 780); // MD breakpoint in Tailwind
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleDrag = (e) => {
        const newWidth = (e.clientX / window.innerWidth) * 100;
        if (newWidth > 20 && newWidth < 100) { // Set limits to prevent too much resizing
            setLeftWidth(newWidth);
        }
    };


    const handleMouseDown = (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', handleDrag);
        }, { once: true });
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


        return <div>
            {/* Input Field */}
            <input
                {...props}
                value={localValue}
                onChange={handleChange}
                onBlur={handleBlur}
                className="dark:bg-slate-700 dark:text-slate-400 px-2 border"
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
        </div>;
    };



    const handleAnswer = (questionId, value) => {
        setAnswer(prev => ({ ...prev, [questionId]: value }));
    }



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
                        className="w-md my-1 px-2 border border-slate-300 rounded"
                        placeholder={props.name}
                        feedback={feedback ? feedback[props.name] : null}
                    />
                </>
            }
        },
    };


    const RenderQuestion = ({ part }) => {
        const QuestionWrapper = ({ children }) => (
            <div
                className="bg-white shadow-md rounded-lg p-6 mb-6 dark:bg-slate-800 dark:text-slate-400 space-y-6"
            >
                <h3 className="text-lg font-bold text-slate-700 mb-4 dark:text-slate-300">{part?.instruction}</h3>
                {part?.image && (<img src={part.image} alt="image" className="max-h-[400px]" />)}
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
                                    feedback={feedback ? feedback[obj.number] : null}
                                    number={obj.number}
                                    name={`question-${obj.number}`}
                                    value={answer[obj.number] || ""}
                                    onChange={(value) => handleAnswer(obj.number, value)}
                                    className="w-md my-1 px-2 border border-slate-300 rounded"
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
                                    className="flex-grow my-1 px-2 border border-slate-300 rounded"
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
                        {part.html && (parse(part.html, options))}
                        {part.questions.map((obj, idx) => (
                            <div key={idx} >
                                <p className="font-medium">{obj.number}. {obj.question}</p>
                                <ControlledInput
                                    type="text"
                                    name={`question-${obj.number}`}
                                    value={answer[obj.number] || ""}
                                    onChange={(value) => handleAnswer(obj.number, value)}
                                    className="w-md my-1 px-2 border border-slate-300 rounded"
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
        try {
            setLoading(true); // Set loading to true at the start
            const getData = httpsCallable(functions, 'getQuestionAnswers');

            const result = await getData({
                type: "reading-questions",
                id: questions["questionId"],
                userAnswer: userAnswer,
                userId: userState.uid,
                testType: "ReadingAcademic"
            });

            // Process the result data
            data = result.data;
            score = data['result'];
            setTestResult(data);
            

            // Set feedback and show success message
            setFeedback(data['corrections']);
            SuccessMessage({ score: score["overall"] });
            
        } catch (error) {
            // In case of any error, display the error message
            ErrorMessage(error);
        } finally {
            // Ensure that loading is set to false regardless of success or error
            setLoading(false);
        }

        return [data, score];
        
    };


    const handleSubmit = async () => {
        //e.preventDefault();
        const [answerData, score] = await getAnswers(answer);
        const result = { ...answerData, result: score }
        setTestResult(result);
    };




    const handleCollect = () => {
        //e.preventDefault();
        setCollectAnswer(prev => ({ ...prev, reading: { ...prev['reading'], userAnswer: answer, done: true, type: "reading-questions", id: questions["questionId"], userId: userState.uid, testType: "ReadingAcademic" } }));
        setNextTest('navigation')
    };

    const getQuestionID = async (questID) => {
        try {
            const getData = httpsCallable(functions, 'getQuestion');
    
            const result = await getData({ 
                type: "reading-questions", 
                id: questID,
                userId: userState.uid, 
            });
    
            // Set the question data
            setQuestion(result.data);
    
            // If it's a full test, update the answer collection
            if (isFullTest) {
                setCollectAnswer(prev => ({
                    ...prev,
                    reading: {
                        ...prev['reading'],
                        questions: result.data['questions'],
                        questionId: result.data['questionId']
                    }
                }));
            }
        } catch (error) {
            // Handle any errors
            ErrorMessage(error);
        }
    };


    useEffect(() => {
        if (!questions && !params.get("result")) {
            getQuestionID(params.get("id") || questionId);
        }
    }, []);


    useEffect(() => {
        if (finish) {
            if (isFullTest) {
                handleCollect();
            } else {
                handleSubmit();
            }
        }

    }, [finish])



    if (!questions) {
        return <Loader />
    };

    if (questions && !start) {
        return <StartInstruction setStart={setStart} />
    }

    return (
        <TestLayout onSubmit={() => setFinish(true)} activePart={activeTab} setActivePart={setActiveTab} tabs={[1, 2, 3]} time={60} loading={loading} finish={finish} onCancel={setNextTest ? () => setNextTest('navigation') : null} Answers={answer} Corrections={feedback}>

            <>
                <div className="flex flex-1 justify-center">
                    {/* <div className='fixed w-full flex justify-center bg-white bg-opacity-0 items-center py-1 top-16 inline-block gap-4 z-50'>
                        {start && !finish && !testResult && (<Timer minutes={60} seconds={0} setFinish={setFinish} />)}
                    </div> */}
                    <main className='bg-white rounded-sm w-full text-black h-full py-8 dark:bg-slate-800 dark:text-slate-400 p-4' id="main" role="main">
                        {testResult && (<ScoreComponent score={testResult['result']} />)}
                        {questions && (
                            <form className="min-h-screen" >
                                <div className="min-h-screen space-y-6">
                                    {questions["questions"].map((question, index) => {
                                        if (question.section === activeTab) {
                                            return (
                                                <div className={`flex ${isSmallScreen ? 'flex-col' : 'flex-row'} min-h-screen`} key={index}>
                                                {/* Left column / Top section on small screens */}
                                                <div
                                                    className={`overflow-y-auto left-scrollbar mx-2 ${
                                                    isSmallScreen ? 'h-1/2' : 'max-h-screen'
                                                    }`}
                                                    style={{ width: isSmallScreen ? '100%' : `${leftWidth}%` }}
                                                >
                                                    {question.html && <PassageWrapper>{parse(question.html)}</PassageWrapper>}
                                                </div>

                                                {/* Resizable handle - only show on larger screens */}
                                                {!isSmallScreen && <InteractiveResizeHandle onMouseDown={handleMouseDown} />}

                                                {/* Right column / Bottom section on small screens */}
                                                <div
                                                    className={`p-4 flex flex-col overflow-y-auto right-scrollbar ${
                                                    isSmallScreen ? 'h-1/2' : 'max-h-screen'
                                                    }`}
                                                    style={{ width: isSmallScreen ? '100%' : `${100 - leftWidth}%` }}
                                                >
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
                            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                            {!testResult && (
                                <button
                                    className="bg-blue-600 hover:bg-orange-400 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                                    type="button"
                                    onClick={!isFullTest ? () => setFinish(true) : handleCollect}
                                >
                                    {!loading ? 'Submit' : 'Loading...'}
                                </button>
                            )}
                        </div> */}
                    </main>
                </div>

            </>
        </TestLayout>
    )
};

export default withUser(AcademicReadingPage);