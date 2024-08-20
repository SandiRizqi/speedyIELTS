import React from 'react';

const LoadingScore = () => {
  const categories = ['GRAMMATICAL RANGE', 'LEXICAL RESOURCE', 'FLUENCY AND COHERENCE', 'PRONUNCIATION'];

  const CategoryCard = ({ title }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 bg-slate-200 rounded w-3/4"></div>
        <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
      </div>
      <div className="space-y-3">
        <div className="flex items-start">
          <div className="h-4 w-4 mt-1 mr-2 bg-slate-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 rounded w-4/6"></div>
          </div>
        </div>
        <div className="flex items-start">
          <div className="h-4 w-4 mt-1 mr-2 bg-slate-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <CategoryCard key={index} title={category} />
        ))}
      </div>
    </div>
  );
};

export default LoadingScore;