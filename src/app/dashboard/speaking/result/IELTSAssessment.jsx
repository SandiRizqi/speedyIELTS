"use client"
import React from 'react';
import { ArrowLeft, MessageSquare, Activity, Book } from 'lucide-react';
import { useRouter } from 'next/navigation';

const IELTSAssessment = () => {
  const router = useRouter();

  function handleStart() {
    router.replace("/dashboard/speaking");
  }


  return (
    <div className="bg-slate-100 p-6 font-sans">
      <div className="mb-6">
        <button className="text-blue-600 flex items-center" onClick={handleStart}>
          <ArrowLeft className="mr-2" size={16} />
          Go back
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-3">
        <div className="flex items-center mb-6 bg-slate-100 p-4 rounded-md">
          <div className="bg-blue-600 text-white text-4xl font-bold w-24 h-24 rounded-lg flex items-center justify-center">
            7.0
          </div>
          <div className="ml-6">
            <div className="bg-white  bg-opacity-20 border text-blue-900 text-3xl font-semibold py-2 px-4 rounded-md max-w-xs justify-center flex">
              Advanced
            </div>
            <p className="mt-2 text-sm text-slate-600">
              You are clearly understood in all conversations. Time for you to focus on advanced pronunciation skills such as Linkage, the Flap sound and Dropped consonants. Mastering these skills will get you closer to the pronunciation level of a native speaker.
            </p>
          </div>
        </div>
        
       
        
        <div className="flex gap-6">
          <div className='w-1/4'>
            <h2 className="text-xl font-semibold mb-4">Score Breakdown</h2>
            <p className="text-sm text-slate-600 mb-4">Focus on your intonation to sound more natural when you speak.</p>
            
            {[
              { name: 'Pronunciation', score: '81%', icon: MessageSquare, level: 'Advanced' },
              { name: 'Intonation', score: '63%', icon: Activity, level: 'Intermediate' },
              { name: 'Fluency', score: '72%', icon: Activity, level: 'Upper Intermediate' },
              { name: 'Grammar', score: '81%', icon: Book, level: 'Advanced' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-100 p-3 rounded-lg mb-2">
                <div className="flex items-center">
                  <item.icon className="mr-3" size={20} />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-slate-600">{item.level}</div>
                  </div>
                </div>
                <div className="text-rose-400 font-semibold">{item.score}</div>
              </div>
            ))}
          </div>
          
          <div className='w-3/4 gap-2 flex flex-col'>
          <div className="flex justify-between mb-8">
          {['Introduction and Interview', 'Topic', 'Topic Discussion'].map((part, index) => (
            <div key={index} className="flex items-center">
              <MessageSquare className="mr-2" size={20} />
              <div>
                <div className="font-semibold">Part {index + 1}</div>
                <div className="text-sm text-slate-600">{part}</div>
              </div>
              <div className="ml-2 bg-rose-400 text-white rounded-full w-8 h-8 flex items-center justify-center">
                7.0
              </div>
            </div>
          ))}
        </div>

            <div className='p-2 bg-slate-100 rounded-lg'>
              <h2 className="text-xl font-semibold mb-4">Pronunciation Score</h2>
              <p className="text-sm text-slate-600 mb-4">
                Your pronunciation level is Advanced. Great work!
                To reach a Native level, turn your attention to advanced pronunciation skills such as Linkage, Dropped Consonants and the Flap Sound. You should aim to consistently score above 90% for each of these skills.
              </p>
            </div>

            <div className='p-2 bg-slate-100 rounded-lg'>
              <h2 className="text-xl font-semibold mb-4">Your Top Errors and Suggestions for Improvement</h2>
              <div className="grid grid-cols-3 gap-4">
                {['/əʊ/', '/t/', '/d/'].map((sound, index) => (
                  <div key={index} className="bg-slate-100 p-4 rounded-lg">
                    <div className="flex justify-center items-center w-12 h-12 bg-white rounded-full mb-2 mx-auto">
                      <span className="font-semibold">{sound}</span>
                    </div>
                    <h3 className="text-center font-semibold mb-2">Words with Mistakes</h3>
                    <ul className="text-sm text-slate-600 list-disc list-inside">
                      <li>Example word 1</li>
                      <li>Example word 2</li>
                      <li>Example word 3</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IELTSAssessment;