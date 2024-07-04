'use client'
import React from 'react';
import LoadingContent from '../LoadingContent';

export default function Feedback({feedback, loading}) {
   

    return (
        <section className='mt-4 overflow-y-auto scrollbar w-full max-h-screen py-4'>
            {!feedback &&  loading && <LoadingContent />}
            {feedback && (
            <div className="flow-root">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Grammar & Accuracy</dt>
                        <dd className="text-gray-700 sm:col-span-2">{feedback.grammar}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Lexical Resource</dt>
                        <dd className="text-gray-700 sm:col-span-2">{feedback.lexical}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Vocabulary Range</dt>
                        <dd className="text-gray-700 sm:col-span-2">{feedback.vocabulary}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Coherence & Cohetion</dt>
                        <dd className="text-gray-700 sm:col-span-2">{feedback.cohen}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Task Achivement</dt>
                        <dd className="text-gray-700 sm:col-span-2">{feedback.task}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-bold text-gray-900">Overall</dt>
                        <dd className="font-bold text-gray-900 sm:col-span-2">{feedback.overall}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Suggestion</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                           {feedback.suggestion}
                        </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Advanced Words</dt>
                            <dd className="text-gray-700 sm:col-span-2 gap-2 flex flex-wrap">
                                {feedback.advancedwords?.map((item, idx) => (
                                    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700" key={idx}>
                                        {item}
                                    </span>
                                ))}
                            </dd>
                    </div>

                    
                </dl>
                <div>
                <span><p className='font-bold text-gray-700'>Corrections: </p></span>
                <div className='mt-4'>
                {feedback.corrections?.map((item, idx) => (
                    <div className='flex flex-col flex-1 gap-1 mt-4' key={idx}>
                        <span
                        className="inline-flex items-center justify-start rounded-md bg-red-100 px-2.5 py-0.5 text-red-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="-ms-1 me-1.5 h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="whitespace-wrap text-sm">{item.mistakes}</p>
                    </span>
                        <span
                        className="inline-flex items-center justify-start rounded-md bg-emerald-100 px-2.5 py-0.5 text-emerald-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="-ms-1 me-1.5 h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="whitespace-wrap text-sm">{item.revision}</p>
                    </span>
                    </div>
                ))}       
                </div>
                </div>
            </div>
            )}

        </section>

    );
}
