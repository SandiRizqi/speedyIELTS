import React from "react";


function roundScore(score) {
    const integerPart = Math.floor(score);
    const fractionalPart = score - integerPart;
  
    if (fractionalPart < 0.25) {
        return integerPart;
    } else if (fractionalPart >= 0.25 && fractionalPart < 0.75) {
        return integerPart + 0.5;
    } else {
        return integerPart + 1;
    }
  };
  
  function calculateAverage(numbers) {
    // Ensure the array is not empty
    if (numbers.length === 0) return 0;
  
    // Sum all numbers in the array
    const sum= numbers.reduce((acc, curr) => acc + curr, 0);
  
    // Calculate the average
    const average= sum / numbers.length;
  
    return average;
  }
    
  
  
  const CircularScore = ({ score, size = 'small' }) => {
    const radius = size === 'large' ? 40 : size === 'medium' ? 20 : 16;
    const strokeWidth = size === 'large' ? 8 : size === 'medium' ? 6 : 3;
    const viewBox = size === 'large' ? '0 0 100 100' : '0 0 50 50';
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 9) * circumference;
  
    // Determine the color based on the score
    const getColor = () => {
      if (score < 4) return 'text-danger';
      if (score >= 4 && score <= 6) return 'text-yellow-500';
      return 'text-green-500';
    };
  
    const centerPoint = size === 'large' ? 50 : 25;
  
    return (
      <div className={`relative ${size === 'large' ? 'w-24 h-24' : 'w-12 h-12'}`}>
        <svg className="w-full h-full" viewBox={viewBox}>
          <circle
            className="text-gray-300"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={centerPoint}
            cy={centerPoint}
          />
          <circle
            className={getColor()}
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={centerPoint}
            cy={centerPoint}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${centerPoint} ${centerPoint})`}
          />
        </svg>
        <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${size === 'large' ? 'text-2xl' : 'text-base'} font-bold`}>
          {score}
        </span>
      </div>
    )
  }
  
  const ScoreDisplay = ({ title, score, size }) => {
    const data = score.map(obj => obj.overall)
    const finalscore = roundScore(calculateAverage(data));
    return (
      <div className="rounded-lg p-2 sm:p-3 flex-1 min-w-0">
        <div className="flex flex-col justify-between items-center">
          <CircularScore score={finalscore} size={size}/>
          <h3 className="text-xs sm:text-sm mt-1">{title}</h3>
        </div>
      </div>
    );
  };

  export default ScoreDisplay;