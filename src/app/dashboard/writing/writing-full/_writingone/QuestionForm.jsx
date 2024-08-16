import React, { useEffect, useState } from 'react';
import { FirebaseStorge } from '@/service/firebase';
import { ref, getDownloadURL } from 'firebase/storage';




export default function QuestionForm({ answer, setAnswer, feedback, question, loading}) {
    const drive = FirebaseStorge();
    const [questions, setQuestion] = useState(question);
    const [text, setText] = useState(answer['answer'] || '');
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



    const countWords = (text) => {
        return text.trim().split(/\s+/).filter(word => word).length;
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




    }, []);





    return (
        <div className='mt-4 border border-gray-200 rounded-md p-4'>

            <div className="text-left bg-gray-100 rounded-md p-4">
                <p className="max-w-full mb-4 text-md font-bold text-gray-500">
                    {questions.questions}
                </p>
            </div>
            <div className='w-full items-center justify-center flex mt-4'>
                <img src={questions.pictureURL} alt="img"  className='max-h-400 object-contain'/>
            </div>


            <div
                className="overflow-hidden rounded-lg border border-gray-200 mt-4 shadow-sm"
            >

                
                {!feedback && (
                    <textarea
                        id="OrderNotes"
                        className="w-full resize-none p-4 border-none align-top  sm:text-sm"
                        rows="8"
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
