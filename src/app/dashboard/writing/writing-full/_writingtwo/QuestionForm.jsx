import React, { useState, useEffect } from 'react';
import { FirestoreDB, } from '@/service/firebase';
import { collection, getDocs } from "firebase/firestore";
import LoadingQuestion from '../LoadingQuestion';


export default function QuestionForm({ start, answer, setAnswer, handleSubmit, loading, finish,  feedback }) {
    const db = FirestoreDB();
    const questionsRef = collection(db, "writing2-questions");
    const [loadquestion, setLoadQuestion] = useState(true);
    const [question, setQuestion] = useState(null);
    const [text, setText] = useState('');
    const [highlightedText, setHighlightedText] = useState("");
    


    const handleHighlisht = (value) => {
        const pattern = new RegExp(value.join("|"), "gi");
        let paragraph = text;
        paragraph = paragraph.replace(pattern, match => `<span class="bg-red-400">${match}</span>`);
        setHighlightedText(paragraph);
    };



    const handleAnswerChange = (event) => {
        setAnswer({ ...answer, answer: event.target.value });
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


    useEffect(() => {

        const getQuestions = async () => {
            try {
                const querySnapshot = await getDocs(questionsRef);
                const questions = querySnapshot.docs.map(doc => doc.data());
                const randomIndex = Math.floor(Math.random() * questions.length);
                const selectedQuestion = questions[randomIndex]
                setQuestion(selectedQuestion);
                setAnswer({...answer, question: selectedQuestion.question})
                setLoadQuestion(false);
                     
            } catch (error) {
                console.error("Error fetching questions:", error);
            } 
        };

        if (!question) {
            getQuestions();
        };

     

    }, [question]);



    if (loadquestion && question === null) {
        return <LoadingQuestion />
    }



    return (
        <div className='mt-4 border border-gray-200 rounded-md p-4'>
            <div className="text-left bg-gray-100 rounded-md p-4">
                <p className="max-w-full mb-4 text-md font-bold text-gray-500">
                    {question.question}
                </p>
            </div>
            


            <div
                className="overflow-hidden rounded-lg border border-gray-200 mt-4 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >

            {!feedback && (
                                <textarea
                                    id="OrderNotes"
                                    className="w-full resize-none border-none p-4 align-top focus:ring-0 sm:text-sm"
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
                        dangerouslySetInnerHTML={{ __html: `<span >${highlightedText}</span>` }}
                    />
                )}

                <div className="flex items-center justify-end gap-2 bg-white p-3">
                    <p className='text-sm text-gray-500'>
                        Words: {countWords(text)}
                    </p>
                   
                </div>
            </div>
        </div>

    );
}
