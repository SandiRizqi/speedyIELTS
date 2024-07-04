'use client'
import React from 'react';
import LoadingContent from '@/app/dashboard/_components/LoadingContent';

export default function Feedback({feedback, loading}) {
   

    return (
        <section className='mt-4 overflow-y-auto scrollbar p-4 w-full max-h-screen'>
            {!feedback && loading && <LoadingContent />}
            {feedback && (
            <div className="flow-root  dark:text-slate-400">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900 dark:text-slate-400">Grammar & Accuracy</dt>
                        <dd className="text-gray-700 sm:col-span-2 dark:text-slate-400">{feedback.grammar?.score}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900 dark:text-slate-400">Lexical Resource</dt>
                        <dd className="text-gray-700 sm:col-span-2 dark:text-slate-400">{feedback.lexical?.score}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900 dark:text-slate-400">Vocabulary Range</dt>
                        <dd className="text-gray-700 sm:col-span-2 dark:text-slate-400">{feedback.vocabulary?.score}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900 dark:text-slate-400">Coherence & Cohesion</dt>
                        <dd className="text-gray-700 sm:col-span-2 dark:text-slate-400">{feedback.cohen?.score}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900 dark:text-slate-400">Task Achivement</dt>
                        <dd className="text-gray-700 sm:col-span-2 dark:text-slate-400">{feedback.task?.score}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-bold text-gray-900 dark:text-slate-400">Overall</dt>
                        <dd className="font-bold text-gray-900 sm:col-span-2 dark:text-slate-400">{feedback?.overall}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900 dark:text-slate-400">Suggestion</dt>
                        <dd className="text-gray-700 sm:col-span-2 dark:text-slate-400">
                           {feedback?.suggestion}
                        </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900 dark:text-slate-400">Advanced Words</dt>
                            <dd className="text-gray-700 sm:col-span-2 gap-2 flex flex-wrap">
                                {feedback?.advancedwords?.map((item, idx) => (
                                    <span class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700" key={idx}>
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
                        <p className="whitespace-wrap text-sm">{item.mistakes}</p>
                    </span>
                        <span
                        className="inline-flex items-center justify-start rounded-md bg-emerald-100 px-2.5 py-0.5 text-emerald-700"
                    >
                    
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
