import React, { useState, useEffect } from 'react';
import { useUser } from '@/service/user';


const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word).length;
};


export default function QuestionForm({ start, quest, answer, setAnswer, feedback }) {
    const user = useUser();
    const { userState } = user;
    const [question, setQuestion] = useState({ ...quest, userId: userState.uid });
    const [text, setText] = useState(answer['answer'] || '');
    const [highlightedText, setHighlightedText] = useState(null);
    const count = countWords(text);



    const handleHighlisht = (value) => {
        const pattern = new RegExp(value.join("|"), "gi");
        let paragraph = text;
        paragraph = paragraph.replace(pattern, match => `<span class="bg-danger text-white">${match}</span>`);
        paragraph = paragraph.replace(/\n/g, "<br />");
        setHighlightedText(paragraph);
    };



    const handleAnswerChange = (event) => {
        setAnswer({ ...answer, answer: event.target.value });
        setText(event.target.value);
    };






    useEffect(() => {
        if (feedback?.corrections) {
            const ListMistakes = feedback.corrections?.map(obj => obj.mistakes);
            handleHighlisht(ListMistakes);
        }

    }, [feedback]);


    useEffect(() => {

        if (quest) {
            setQuestion({ ...quest, userId: userState.uid });
            setAnswer({ ...answer, ...quest, userId: userState.uid });
        };


    }, [quest]);


    return (
        <div className='mt-4 border border-gray-200 rounded-md p-4 md:mt-0'>
            <div className="text-left bg-gray-100 rounded-md p-4">
                <p className="max-w-full mb-4 text-sm font-bold text-gray-500">
                    {question.questions}
                </p>
            </div>



            <div
                className="overflow-hidden rounded-lg border border-gray-200 mt-4 shadow-sm  focus-within:ring-0"
            >

                {!feedback && (
                    <textarea
                        id="OrderNotes"
                        className="w-full border-none bg-gray-100 p-2 text-black align-top focus:ring-0 sm:text-sm"
                        rows="13"
                        onChange={handleAnswerChange}
                        value={text}
                        disabled={!start}
                        placeholder="Enter your answer here... ."
                    ></textarea>
                )}

                {feedback && (
                    <div
                        className="mt-2 p-2 rounded"
                        dangerouslySetInnerHTML={{ __html: `<span >${highlightedText ? highlightedText : text}</span>` }}
                    />
                )}

                <div className="flex items-center justify-end gap-2 bg-white p-3">
                    <p className='text-sm text-gray-500'>
                        Words: {count}
                    </p>

                </div>
            </div>
        </div>

    );
}
