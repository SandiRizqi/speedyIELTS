import React, { useState, useEffect } from 'react';



export default function QuestionForm({ answer, setAnswer, feedback, question, loading }) {
    const [text, setText] = useState('');
    const [highlightedText, setHighlightedText] = useState("");
    


    const handleHighlisht = (value) => {
        const pattern = new RegExp(value.join("|"), "gi");
        let paragraph = answer['answer'];
        paragraph = paragraph.replace(pattern, match => `<span class="bg-red-400">${match}</span>`);
        setHighlightedText(paragraph);
    };



    const handleAnswerChange = (event) => {
        setAnswer(prev => ({ ...prev, task2 : { ...prev['task2'], answer: event.target.value }}));
        setText(event.target.value);
    };



    const countWords = (text) => {
        return text.trim().split(/\s+/).filter(word => word).length;
    };


    useEffect(() => {
        if(feedback){
            const ListMistakes = feedback.corrections?.map(obj => obj.mistakes);
            handleHighlisht(ListMistakes);
        }

    },[feedback]);




    return (
        <div className='mt-4 border border-gray-200 rounded-md p-4'>
            <div className="text-left bg-gray-100 rounded-md p-4">
                <p className="max-w-full mb-4 text-md font-bold text-gray-500">
                    {question.questions}
                </p>
            </div>
            


            <div
                className="overflow-hidden rounded-lg border border-gray-200 mt-4 shadow-sm"
            >

            {!feedback && (
                                <textarea
                                    id="OrderNotes"
                                    className="w-full resize-none border-none p-4 align-top focus:ring-0 sm:text-sm"
                                    rows="13"
                                    onChange={handleAnswerChange}
                                    value={answer['answer']}
                                    disabled={loading}
                                    placeholder="Enter your answer here... ."
                                ></textarea>
                            )}

                {feedback && (
                    <div
                        className="mt-2 p-2 rounded"
                        dangerouslySetInnerHTML={{ __html: `<span >${highlightedText}</span>` }}
                    />
                )}

                <div className="flex items-center justify-end gap-2 bg-white p-3">
                    <p className='text-sm text-gray-500'>
                        Words: {countWords(answer['answer'])}
                    </p>
                   
                </div>
            </div>
        </div>

    );
}
