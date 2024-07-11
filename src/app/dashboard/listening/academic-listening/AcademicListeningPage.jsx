'use client'
import withUser from "@/hooks/withUser";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState, useCallback } from "react";
import { listening_questions as questions } from "./sample";


const ControlledInput = ({ value, onChange, ...props }) => {
    const [localValue, setLocalValue] = useState(value);

    const handleChange = (e) => {
        setLocalValue(e.target.value);
       // onChange(e.target.value);
    };

    const handleBlur = () => {
        console.log(localValue)
        onChange(localValue);
    }


    return <input {...props} value={localValue} onChange={handleChange} onBlur={handleBlur}/>;
};

const AcademicListeningPage = () => {
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const handleAnswerChange = useCallback((questionId, answer) => {
        setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
    }, []);

    const RenderQuestion = ({ question, index }) => {
        const QuestionWrapper = ({ children }) => (
            <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 mb-6 dark:bg-slate-800 dark:text-slate-400"
            >
                {question?.number && (<h3 className="text-md font-semibold mb-2">Question {question.number}</h3>)}
                <p className="text-sm text-gray-600 mb-4">{question.instruction}</p>
                <p className="font-medium mb-4">{question.question}</p>
                {children}
            </div>
        );

        switch (question.type) {
            case 'multiple-choice':
                return (
                    <QuestionWrapper>
                        <div className="space-y-2">
                            {question.options.map((option, index) => (
                                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={option}
                                        onChange={() => handleAnswerChange(question.id, option)}
                                        checked={selectedAnswers[question.id] === option}
                                        className="form-radio text-blue-600"
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    </QuestionWrapper>
                );
            case 'short-answer':
            case 'sentence-completion':
                return (
                    <QuestionWrapper>
                        <ControlledInput
                            type="text"
                            name={`question-${question.id}`}
                            value={selectedAnswers[question?.id]}
                            onChange={(value) => handleAnswerChange(question.id, value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Type your answer here"
                        />
                    </QuestionWrapper>
                );
            case 'table-completion':
                return (
                    <QuestionWrapper>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                {question.table.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex} className="border border-gray-300 p-2">
                                                {Array.isArray(cell) ? (
                                                    <div className="flex flex-col">
                                                        {cell.map((item, index) => (
                                                            <div key={index} className="py-1">
                                                                {item.includes('_') ? (
                                                                    <ControlledInput
                                                                        type="text"
                                                                        className="w-full p-1 border border-gray-300 rounded"
                                                                        name={`question-${question.id}-${rowIndex}-${cellIndex}`}
                                                                        value={selectedAnswers[question.id]?.[item] || ''}
                                                                        onChange={(value) => handleAnswerChange(question.id, {
                                                                            ...selectedAnswers[question.id],
                                                                            [item]: value
                                                                        })}
                                                                        placeholder={item}
                                                                    />
                                                                ) : item}
                                                            </div>
                                                    ))}
                                                  </div>
                                                ) : null }
                                                {!Array.isArray(cell) && (
                                                    <>
                                                    {cell.includes('_') ? (
                                                    <ControlledInput
                                                        type="text"
                                                        className="w-full p-1 border border-gray-300 rounded"
                                                        name={`question-${question.id}-${rowIndex}-${cellIndex}`}
                                                        value={selectedAnswers[question.id]?.[cell] || ''}
                                                        onChange={(value) => handleAnswerChange(question.id, {
                                                            ...selectedAnswers[question.id],
                                                            [cell]: value
                                                        })}
                                                        placeholder={cell}
                                                    />
                                                ) : cell}
                                                    </>
                                                )}
                                
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </QuestionWrapper>
                );
            case 'diagram-labelling':
                return (
                    <QuestionWrapper>
                        <div className="relative">
                            <img src={question.image} alt="Diagram" className="w-full" />
                            {question.labels.map((label) => (
                                <div key={label.id} className="mt-4 flex items-center space-x-2">
                                    <label htmlFor={`question-${question.id}`}>{label.id}.</label>
                                    <select
                                        className="p-1 border border-gray-300 rounded"
                                        name={`question-${question.id}`}
                                        onChange={(e) => handleAnswerChange(question.id, {
                                            ...selectedAnswers[question.id],
                                            [label.id]: e.target.value
                                        })}
                                        value={selectedAnswers[question.id]?.[label.id] || ''}
                                    >
                                        <option value="">Select</option>
                                        {question.options.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 p-2 bg-gray-100 rounded">
                            <p className="font-semibold">Word box:</p>
                            <p>{question.options.join(', ')}</p>
                        </div>
                    </QuestionWrapper>
                );
            case 'classification':
                return (
                    <QuestionWrapper>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {question.categories.map((category) => (
                                <div key={category} className="border border-gray-300 p-2 rounded">
                                    <h4 className="font-semibold mb-2">{category}</h4>
                                    {question.items.map((item) => (
                                        <label key={item} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                name={`question-${question.id}`}
                                                onChange={(e) => {
                                                    const newAnswer = { ...selectedAnswers[question.id] };
                                                    if (e.target.checked) {
                                                        newAnswer[category] = [...(newAnswer[category] || []), item];
                                                    } else {
                                                        newAnswer[category] = newAnswer[category].filter(i => i !== item);
                                                    }
                                                    handleAnswerChange(question.id, newAnswer);
                                                }}
                                                checked={selectedAnswers[question.id]?.[category]?.includes(item) || false}
                                                className="form-checkbox text-blue-600"
                                            />
                                            <span>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </QuestionWrapper>
                );
            case 'matching':
                return (
                    <QuestionWrapper>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold mb-2">Inventions:</h4>
                                <ul>
                                    {question.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Inventors:</h4>
                                <ul>
                                    {question.options.map((option) => (
                                        <li key={option}>{option}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            {question.items.map((item) => (
                                <div key={item} className="flex items-center space-x-4">
                                    <span className="w-1/3">{item}:</span>
                                    <select
                                        className="flex-grow p-2 border border-gray-300 rounded"
                                        name={`question-${question.id}`}
                                        onChange={(e) => handleAnswerChange(question.id, {
                                            ...selectedAnswers[question.id],
                                            [item]: e.target.value
                                        })}
                                        value={selectedAnswers[question.id]?.[item] || ''}
                                    >
                                        <option value="">Select an inventor</option>
                                        {question.options.map((option, index) => (
                                            <option key={index} value={option}>{option.split('.')[0]}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </QuestionWrapper>
                );
            default:
                return null;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedAnswers);
    };

    return (
        <>
            <Breadcrumb pageName="Listening" />
            <main className='bg-white rounded-sm w-full h-full py-14 dark:bg-slate-800 dark:text-slate-400 p-8' id="main" role="main">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        {questions.map((question, index) => (
                            <RenderQuestion question={question} index={index} key={index} />
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

export default withUser(AcademicListeningPage);