import React from 'react';

const IELTSScoreDisplay = ({ overallScore, listeningScore, readingScore, writingScore, speakingScore, timestamp }) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' });
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-slate-500 font-semibold">Overall score</div>
        <div className="mt-2 text-7xl font-bold text-danger">{overallScore.toFixed(1)}</div>
        <p className="mt-2 text-gray-500 text-sm">{formattedDate} IELTS on Computer Academic</p>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <ScoreCard title="Listening" score={listeningScore} />
          <ScoreCard title="Reading" score={readingScore} />
          <ScoreCard title="Writing" score={writingScore} />
          <ScoreCard title="Speaking" score={speakingScore} />
        </div>
      </div>
    </div>
  );
};

const ScoreCard = ({ title, score }) => (
  <div className="bg-gray-50 p-4 rounded-xl shadow-md">
    <h3 className="text-base font-medium text-slate-500">{title}</h3>
    <p className="text-3xl font-bold text-danger mt-1">{score.toFixed(1)}</p>
  </div>
);

export default IELTSScoreDisplay;