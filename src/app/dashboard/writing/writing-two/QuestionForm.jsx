import React, { useState, useEffect } from 'react';
import { useUser } from '@/service/user';


const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word).length;
};


export default function QuestionForm({ start, quest, answer, setAnswer, handleSubmit, loading, finish,  feedback }) {
    const user = useUser();
    const [question, setQuestion] = useState({...quest, userId: user.uid});
    const [text, setText] = useState('');
    const [highlightedText, setHighlightedText] = useState(null);
    const count = countWords(text);
    


    const handleHighlisht = (value) => {
        const pattern = new RegExp(value.join("|"), "gi");
        let paragraph = text;
        paragraph = paragraph.replace(pattern, match => `<span class="bg-danger text-white">${match}</span>`);
        setHighlightedText(paragraph);
    };



    const handleAnswerChange = (event) => {
        setAnswer({ ...answer, answer: event.target.value });
        setText(event.target.value);
    };



    


    useEffect(() => {
        if(feedback?.corrections){
            const ListMistakes = feedback.corrections?.map(obj => obj.mistakes);
            handleHighlisht(ListMistakes);
        }

    },[feedback]);


    useEffect(() => {

        if (quest) {
            setQuestion({...quest, userId: user.uid});
            setAnswer({...answer, ...quest, userId: user.uid});
        };


    }, [quest]);


    return (
        <div className='mt-4 border border-gray-200 rounded-md p-4 md:mt-0'>
            <div className="text-left bg-gray-100 rounded-md p-4">
                <p className="max-w-full mb-4 text-md font-bold text-gray-500">
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
                        dangerouslySetInnerHTML={{ __html: `<span >${highlightedText ? highlightedText: text}</span>` }}
                    />
                )}

                <div className="flex items-center justify-end gap-2 bg-white p-3">
                    <p className='text-sm text-gray-500'>
                        Words: {count}
                    </p>
                    {!feedback && count > 50 && (
                        <button
                            type="button"
                            className="bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-400"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading && (
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                            )}
                            {!loading ? 'Submit': 'Loading'}
                        </button>
                    )}
                </div>
            </div>
        </div>

    );
}
