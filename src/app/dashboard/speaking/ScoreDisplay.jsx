import React from 'react';

const CircularScore = ({ score, size = 'small' }) => {
  const radius = size === 'large' ? 40 : 16;
  const strokeWidth = size === 'large' ? 8 : 3;
  const viewBox = size === 'large' ? '0 0 100 100' : '0 0 40 40';
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 9) * circumference;

  // Determine the color based on the score
  const getColor = () => {
    if (score < 4) return 'text-danger';
    if (score >= 4 && score <= 6) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className={`relative ${size === 'large' ? 'w-24 h-24' : 'w-8 h-8'}`}>
      <svg className="w-full h-full" viewBox={viewBox}>
        <circle
          className="text-gray-300"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size === 'large' ? 50 : 20}
          cy={size === 'large' ? 50 : 20}
        />
        <circle
          className={getColor()}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size === 'large' ? 50 : 20}
          cy={size === 'large' ? 50 : 20}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size === 'large' ? 50 : 20} ${size === 'large' ? 50 : 20})`}
        />
      </svg>
      <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${size === 'large' ? 'text-2xl' : 'text-xs'} font-bold`}>
        {score}
      </span>
    </div>
  );
};

const ScoreCategory = ({ title, score, items }) => {
  // Determine the color based on the score for item
  const getItemColor = (itemScore) => {
    if (itemScore < 4) return 'bg-danger';
    if (itemScore >= 4 && itemScore <= 6) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="border rounded-lg p-2 sm:p-3 flex-1 min-w-0">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-xs sm:text-sm">{title}</h3>
        <CircularScore score={score} />
      </div>
      <ul className="text-xs">
        {items.map((item, index) => (
          <li key={index} className="flex items-start mb-1">
            <div className={`w-4 h-4 rounded-full ${getItemColor(item.score)} flex items-center p-2 justify-center mr-1`}>
              <span className="text-white text-[10px] font-bold">{item.score}</span>
            </div>
            <span className="whitespace-normal break-words">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ScoreDisplay = ({result}) => {
  return (
    <div className="bg-gray-100 p-3 sm:p-4 rounded-xl shadow-lg max-w-full mx-auto">

      
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 overflow-x-auto pb-3">
        <div className="flex-shrink-0 flex justify-center items-center">
          <CircularScore score={result?.overall} size="large" />
        </div>
        <ScoreCategory 
          title="GRAMMATICAL RANGE" 
          score={result?.grammar.score}
          items={result?.grammar.details.map((obj) => {return { score: obj.score, text: obj.text }})}
        />
        <ScoreCategory 
          title="LEXICAL RESOURCE" 
          score={result?.lexical.score}
          items={result?.lexical.details.map((obj) => {return { score: obj.score, text: obj.text }})}
        />
        <ScoreCategory 
          title="FLUENCY AND COHERENCE" 
          score={result?.fluenc.score}
          items={result?.fluenc.details.map((obj) => {return { score: obj.score, text: obj.text }})}
        />
        <ScoreCategory 
          title="PRONUNCIATION" 
          score={result?.pronun.score}
          items={result?.pronun.details.map((obj) => {return { score: obj.score, text: obj.text }})}
        />
      </div>
      

    </div>
  );
};

export default ScoreDisplay;