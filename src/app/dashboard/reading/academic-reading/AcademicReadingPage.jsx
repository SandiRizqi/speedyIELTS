'use client'
import withUser from "@/hooks/withUser";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { structured_questions as questions } from "./sample";

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
    const [answer, setAnswer] = useState({});

    const handleAnswer = (number, value) => {
        setAnswer(prev => ({ ...prev, [number]: value }))
        console.log(answer)
    }

    const RenderQuestion = ({part}) => {
        const QuestionWrapper = ({ children }) => (
            <div
                className="bg-white shadow-md rounded-lg p-6 mb-6 dark:bg-slate-800 dark:text-slate-400 space-y-6"
            >
                <h3 className="text-lg text-gray-700 mb-4">{part.instruction}</h3>
                {children}
            </div>
        );

        switch (part.type) {
            case "gap_filling":
                return (
                    <QuestionWrapper>
                        {part.questions.map((obj, idx) => (
                            <div key={idx} >
                                <p className="font-medium">{obj.question}</p>
                                <ControlledInput
                                    type="text"
                                    name={`question-${obj.number}`}
                                    value={answer[obj.number]}
                                    onChange={(value) => handleAnswer(obj.number, value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Type your answer here"
                                />
                            </div>
                        ))}
                    </QuestionWrapper>
                )
            case "matching":
                return (
                    <QuestionWrapper>
                        {part.questions.map((obj, idx) => (
                            <div key={idx} className="space-x-4">
                                <span className="font-medium">{obj.question}</span>
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
            default:
                return null;
        }

    }

    async function handleSubmit() {
        console.log("submit")
    }

    return (
        <>
            <Breadcrumb pageName="Academic Reading" />
            <main className='bg-white rounded-sm w-full h-full py-14 dark:bg-slate-800 dark:text-slate-400 p-8' id="main" role="main">
                <form onSubmit={handleSubmit} className="min-h-screen">
                    <div className="min-h-screen space-y-6">
                        {questions.map((question, index) => (
                            <div className="flex flex-col md:flex-row max-h-screen" key={index}>
                                <div className="w-full md:w-1/2 relative">
                                    <img src={question.image} alt="image" className="absolute inset-0 w-full h-full object-fit" />
                                </div>
                                <div className="w-full md:w-1/2 p-4 flex flex-col overflow-y-auto">
                                    {question.parts.map((obj, idx) => (
                                        <div key={idx}>
                                            <RenderQuestion part={obj} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                            type="submit"
                        >
                            Submit Answers
                        </button>
                    </div>
                </form>
            </main>
        </>
    )
};

export default withUser(AcademicReadingPage);