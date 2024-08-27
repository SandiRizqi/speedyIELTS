import React from 'react';


const TestOption = ({ title, options, isPremium, isSoon, Url }) => (
  <div className="bg-white p-4 shadow-lg dark:bg-slate-600 dark:text-white">
    <div className='flex flex-row justify-between'>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {isSoon && (
      <span className="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded mb-2 inline-block">
      COMMING SOON
      </span>
    )}
    {isPremium && (
      <span className="bg-green-400 text-white text-xs font-bold py-1 px-2 rounded mb-2 inline-block">
        PREMIUM FEATURE
      </span>
    )}
    </div>
    <ul className="space-y-2 mb-4">
      {options.map((option, index) => (
        <li key={index} className="flex items-start">
          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span className="text-sm">{option}</span>
        </li>
      ))}
    </ul>
    {!isSoon && (<a href={Url}><button className="w-full bg-blue-600 hover:bg-orange-400 text-white font-bold py-3 px-8  transition-colors duration-300 mb-4">START TEST</button></a>)}
    {isPremium && (<a href="/dashboard/payment" className="text-xs text-center text-blue-600 block">CHECK PREMIUM PRICING</a>)}
  </div>
);

const IELTSTestOptionsGrid = ({ testType }) => {
  const testOptions = {
    writing: [
      {
        title: "GENERAL TASK 1",
        isSoon: true,
        options: [
          "General IELTS part 1 letter writing",
          "Instant result",
          "Comprehensive feedback",
          "33% of your total IELTS writing score",
          "The latest writing topics and questions",
          "Graded on all four IELTS parameters: Grammar, Coherence & Cohesion, Lexical Resource, and Task Response"
        ],
      },
      {
        title: "ACADEMIC TASK 1",
        Url: "/dashboard/writing/writing-one",
        options: [
          "Academic IELTS part 1 writing",
          "Instant result",
          "Comprehensive feedback",
          "33% of your total IELTS writing score",
          "The latest writing topics and questions",
          "Graded on all four IELTS parameters: Grammar, Coherence & Cohesion, Lexical Resource, and Task Response"
        ],
      },
      {
        title: "ESSAY WRITING",
        isPremium: true,
        Url: "/dashboard/writing/writing-two",
        options: [
          "IELTS Task 2 essay writing",
          "Instant result",
          "Comprehensive feedback",
          "66% of your total IELTS writing score",
          "The latest writing topics and questions",
          "Graded on all four IELTS parameters: Grammar, Coherence & Cohesion, Lexical Resource, and Task Response"
        ],
      },
      {
        title: "ACADEMIC WRITING",
        isPremium: true,
        Url: "/dashboard/writing/writing-full",
        options: [
          "IELTS Writing Academic full test",
          "Instant result",
          "Comprehensive feedback",
          "100% of your total IELTS writing score",
          "The latest writing topics and questions",
          "Graded on all four IELTS parameters: Grammar, Coherence & Cohesion, Lexical Resource, and Task Response"
        ],
      },
    ],
    // Add similar structures for speaking and reading if needed
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Choose a {testType} Test to begin.</h2>
      <p className="text-gray-600 mb-6">The only resource you will ever need for your IELTS {testType} preparation.</p>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {testOptions[testType].map((option, index) => (
          <TestOption key={index} {...option} />
        ))}
      </div>
    </div>
  );
};

export default IELTSTestOptionsGrid;