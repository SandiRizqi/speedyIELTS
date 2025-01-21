import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Loader from '@/components/common/Loader';
import { FirestoreDB } from '@/service/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { ErrorMessage } from '../_components/Alert';
import ExercisesLayout from '@/components/Layouts/ExercisesLayout';
import AudioPlayerExercise from './AudioPlayer';

const DisplayMaterial = ({ onClose, id }) => {
    const [showResult, setShowResult] = useState(false);
    const db = FirestoreDB();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState({});

    const handleShowResult = () => {
        // Collect all answers when showing results
        const answers = {};
        const questions = document.querySelectorAll('[name^="question"]');
        
        questions.forEach(question => {
            const questionNum = question.name.replace('question', '');
            const value = question.type === 'radio' ? 
                document.querySelector(`[name="${question.name}"]:checked`)?.value :
                question.value;
                
            answers[questionNum] = value ? value.toUpperCase() : value;
        });

        // Check if all questions are answered
        const unansweredQuestions = Object.values(answers).some(value => !value);
        if (unansweredQuestions) {
            return window.alert("Please complete all the answers.");
        }

        setUserAnswers(answers);
        setShowResult(true);
    };

    function handleClose() {
        setData(null);
        onClose();
    }

    useEffect(() => {
        const fetchData = async (docId) => {
            setLoading(true);
            try {
                const docRef = doc(db, "mini-exercises", docId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const resp = docSnap.data();
                    setData(resp);
                } else {
                    ErrorMessage("No such document!");
                }
            } catch (err) {
                ErrorMessage(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData(id);
        }
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    return (
        <ExercisesLayout onCancel={handleClose}>
            {data ? (
                <div className="flex flex-col bg-opacity-50 backdrop-blur-sm justify-center items-center dark:z-50 bg-white">
                    <div className="bg-white w-full h-full relative">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                            <h1 className="text-4xl font-extrabold text-slate-900 mb-8 text-center">
                                {data.title}
                            </h1>

                            {data.audio && (
                                <div className="mb-8">
                                    <AudioPlayerExercise 
                                        audioUrls={Array.isArray(data.audio) ? data.audio : [data.audio]}
                                    />
                                </div>
                            )}

                            <div 
                                className="prose prose-lg max-w-none mb-10" 
                                dangerouslySetInnerHTML={{ __html: data.html }} 
                            />

                            <div className="mt-12">
                                <button
                                    onClick={handleShowResult}
                                    className="mt-10 w-full bg-blue-600 text-white px-6 py-3 text-lg font-semibold hover:bg-orange-400 transition duration-150 ease-in-out"
                                >
                                    Show Result
                                </button>

                                {showResult && (
                                    <div className="mt-8 space-y-6">
                                        {/* User's Answers */}
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                            <h2 className="text-2xl font-bold text-blue-800 mb-4">
                                                Your Answers:
                                            </h2>
                                            {Object.entries(userAnswers).map(([key, value], index) => (
                                                <p className="text-blue-700 mb-2" key={`user-${key}`}>
                                                    <strong>{index + 1}.</strong> {value}
                                                </p>
                                            ))}
                                        </div>

                                        {/* Correct Answers */}
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                            <h2 className="text-2xl font-bold text-green-800 mb-4">
                                                Correct Answers:
                                            </h2>
                                            {Object.entries(data.answer).map(([key, value], index) => (
                                                <p className="text-green-700 mb-2" key={`correct-${key}`}>
                                                    <strong>{index + 1}.</strong> {value?.toUpperCase()}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : <Loader />}
        </ExercisesLayout>
    );
};

export default DisplayMaterial;