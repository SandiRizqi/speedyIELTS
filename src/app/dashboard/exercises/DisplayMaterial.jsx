import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Loader from '@/components/common/Loader';
import { FirestoreDB } from '@/service/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { ErrorMessage } from '../_components/Alert';
import ExercisesLayout from '@/components/Layouts/ExercisesLayout';


const DisplayMaterial = ({ onClose, id }) => {
    const [showResult, setShowResult] = useState(false);
    const db = FirestoreDB();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [answers, setAnswers] = useState({
    //     1: '',
    //     2: '',
    //     3: '',
    // });



    // const handleAnswerChange = (question, value) => {
    //     setAnswers(prev => ({ ...prev, [question]: value }));
    // };

    const handleShowResult = () => {
        const q1Value = document.querySelector('[name="question1"]')?.value || document.querySelector('[name="question1"]:checked')?.value;
        const q2Value = document.querySelector('[name="question2"]')?.value || document.querySelector('[name="question2"]:checked')?.value;
        const q3Value = document.querySelector('[name="question3"]')?.value || document.querySelector('[name="question3"]:checked')?.value;
    
        if (!q1Value || !q2Value || !q3Value) {
            return window.alert("Please complete all the answer.");
        }
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
                const docRef = doc(db, "mini-exercises", docId); // Replace with your collection name
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const resp = docSnap.data();
                    // console.log(resp);
                    setData(resp);
                } else {
                    ErrorMessage("No such document!");
                }
                setLoading(false)
            } catch (err) {
                ErrorMessage(err.message);
            } finally {
                setLoading(false);
            }
        };


        if (id) {
            fetchData(id)
        }

    }, [id])

    if (loading) {
        return <Loader />
    }

    return (
        <><ExercisesLayout onCancel={handleClose}>

            {data ? (
                <div className="flex flex-col bg-opacity-50 backdrop-blur-sm justify-center items-center  dark:z-50 bg-white">
                    <div className="bg-white w-full h-full relative">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                            {/* <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 transition-colors duration-200 z-9999"
                                aria-label="Close"
                            >
                                <X size={24} />
                            </button> */}

                            <h1 className="text-4xl font-extrabold text-slate-900 mb-8 text-center">{data.title}</h1>

                            <div className="prose prose-lg max-w-none mb-10" dangerouslySetInnerHTML={{ __html: data.html }} />

                            <div className="mt-12">
                                {/* <h2 className="text-2xl font-bold text-slate-900 mb-6">Questions</h2> */}

                                {/* <div className="space-y-8">
                {[1].map((questionNum) => (
                  <div key={questionNum} className="bg-slate-50 rounded-lg p-6 shadow-sm">
                    <label className="text-lg font-semibold text-slate-900 block mb-4">
                      {questionNum}. {questionNum === 1 ? "What is the main focus of the passage?" : "Which regions are most affected by climate change, according to the passage?"}
                    </label>
                    {['a', 'b', 'c', 'd'].map((option) => (
                      <div key={option} className="flex items-center mb-3">
                        <input
                          type="radio"
                          id={`q${questionNum}${option}`}
                          name={`question${questionNum}`}
                          value={option}
                          onChange={(e) => handleAnswerChange(`${questionNum}`, e.target.value)}
                          className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <label htmlFor={`q${questionNum}${option}`} className="ml-3 text-slate-700">
                          {questionNum === 1 ? (
                            option === 'a' ? "The economic importance of agriculture" :
                            option === 'b' ? "The effect of climate change on global agriculture" :
                            option === 'c' ? "The history of agricultural practices" :
                            "The role of governments in agriculture"
                          ) : (
                            option === 'a' ? "North America" :
                            option === 'b' ? "Europe" :
                            option === 'c' ? "Sub-Saharan Africa" :
                            "Southeast Asia"
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              
                <div className="bg-slate-50 rounded-lg p-6 shadow-sm">
                  <label className="text-lg font-semibold text-slate-900 block mb-4">
                    3. How is climate change affecting pest control?
                  </label>
                  <input
                    type="text"
                    placeholder="Type your answer here"
                    onChange={(e) => handleAnswerChange('3', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                  />
                </div>
              </div> */}

                                <button
                                    onClick={handleShowResult}
                                    className="mt-10 w-full bg-blue-600 text-white px-6 py-3  text-lg font-semibold hover:bg-orange-400  transition duration-150 ease-in-out"
                                >
                                    Show Result
                                </button>

                                {showResult && (
                                    <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 animate-fade-in-down">
                                        <h2 className="text-2xl font-bold text-green-800 mb-4">Correct Answers:</h2>
                                        {Object.entries(data.answer).map(([key, value], index) => ( 
                                            <p className="text-green-700 mb-2" key={key}>
                                                <strong>{index + 1}.</strong> {value}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : <Loader />}
        </ExercisesLayout>
        </>
    );
};

export default DisplayMaterial;