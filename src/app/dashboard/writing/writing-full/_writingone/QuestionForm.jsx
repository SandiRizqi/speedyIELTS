import React, { useEffect, useState } from 'react';
import { FirebaseStorge } from '@/service/firebase';
import { ref, getDownloadURL } from 'firebase/storage';



const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word).length;
};

export default function QuestionForm({ answer, setAnswer, feedback, question, loading}) {
    const drive = FirebaseStorge();
    const [questions, setQuestion] = useState(question);
    const [text, setText] = useState(answer['answer'] || '');
    const count = countWords(text);
    const [highlightedText, setHighlightedText] = useState("");
    


    const handleHighlisht = (value) => {
        const pattern = new RegExp(value.join("|"), "gi");
        let paragraph = text
        paragraph = paragraph.replace(pattern, match => `<span class="bg-danger text-white">${match}</span>`);
        paragraph = paragraph.replace(/\n/g, "<br />");
        setHighlightedText(paragraph);
    };



    const handleAnswerChange = (event) => {
        setAnswer(prev => ({...prev, task1 : { ...prev['task1'],  answer: event.target.value}}));
        setText(event.target.value);
    };




    useEffect(() => {
        if(feedback){
            const ListMistakes = feedback.corrections?.map(obj => obj.mistakes);
            if(ListMistakes) {
                handleHighlisht(ListMistakes);
            }
        }

    },[feedback])


    useEffect(() => {
        const getPicture = async (quest) => {
            try {
                const storageRef = ref(drive, quest.picture);
                const url = await getDownloadURL(storageRef);
                setQuestion({...quest, pictureURL: url})
                setAnswer(prev => ({...prev, task1: { pictureURL: url, ...prev['task1']}}))
              } catch (error) {
                console.error("Error fetching image URL:", error);
              }
        };


        if (questions) {
            getPicture(question);
        };




    }, [question]);





    return (
        <div className={`border border-gray-200 rounded-md p-4 md:mt-0 ${!feedback ? 'grid grid-cols-2 gap-4' : ''}`}>
            {/* Left side: question and image */}
            <div className={`${!feedback ? 'col-span-1' : ''}`}>
                <div className="text-left bg-gray-100 rounded-md p-4">
                    <p className="max-w-full mb-4 text-xs font-bold text-gray-500">
                        {questions.questions}
                    </p>
                </div>
                <div className='w-full items-center justify-center flex mt-4'>
                    <img src={questions.pictureURL} alt="img" className='max-h-[400px] object-contain' />
                </div>
            </div>

            {/* Right side: textarea and submit button */}
            <div className={`${!feedback ? 'col-span-1 flex flex-col justify-between' : ''}`}>
                <div className="overflow-hidden rounded-lg border border-gray-200 mt-4 shadow-sm">
                    {!feedback && (
                        <textarea
                            id="OrderNotes"
                            className="w-full bg-gray-100 p-4 border-none align-top focus:ring-0 sm:text-sm"
                            rows="13"
                            onChange={handleAnswerChange}
                            value={text}
                            disabled={feedback ? true: false}
                            placeholder="Enter your answer here..."
                        ></textarea>
                    )}

                    {feedback && (
                        <div
                            className="mt-2 p-2 rounded"
                            dangerouslySetInnerHTML={{ __html: `<span>${highlightedText}</span>` }}
                        />
                    )}
                </div>

                {!feedback && (
                    <div className="flex items-center justify-end gap-2 bg-white p-3">
                        <p className='text-sm text-gray-500'>
                            Words: {count}
                        </p>
                        
                    </div>
                )}
            </div>
        </div>

    );
}
