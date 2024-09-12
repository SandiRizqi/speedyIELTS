import React, { useState } from 'react';
import { Clock, Award } from 'lucide-react';

const getScoreColor = (score) => {
  if (score < 4) return 'text-red-500';
  if (score < 7) return 'text-yellow-500';
  return 'text-green-500';
};

const CircularProgress = ({ percentage, children, scoreColor }) => (
  <div className="relative inline-flex items-center justify-center">
    <svg className="w-20 h-20">
      <circle
        className="text-slate-300"
        strokeWidth="5"
        stroke="currentColor"
        fill="transparent"
        r="30"
        cx="40"
        cy="40"
      />
      <circle
        className={scoreColor}
        strokeWidth="5"
        strokeDasharray={30 * 2 * Math.PI}
        strokeDashoffset={30 * 2 * Math.PI * (1 - percentage / 100)}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r="30"
        cx="40"
        cy="40"
      />
    </svg>
    <span className={`absolute text-xl ${scoreColor}`}>{children}</span>
  </div>
);

const ScoreModal = ({ skill, score }) => {
  const bandDescriptors = [
    "Non User", "Intermittent User", "Extremely Limited User", "Limited User",
    "Modest User", "Competent User", "Good User", "Very Good User", "Expert User"
  ];

  const bandScore = Math.floor(score);
  const percentage = ((score - bandScore) * 100).toFixed(0);
  const scoreColor = getScoreColor(score);

  return (
    <div>
      <button className="mt-2 w-full border border-slate-300 p-2 text-slate-700 rounded-lg hover:bg-slate-100">View Detailed Score</button>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-4">{skill} Score Breakdown</h2>
          <div className="flex justify-center mb-4">
            <CircularProgress percentage={(score / 9) * 100} scoreColor={scoreColor}>
              {score}
            </CircularProgress>
          </div>
          <div className="mb-4">
            <div className="font-semibold">Band Score: {bandScore}</div>
            <div>{bandDescriptors[bandScore - 1]}</div>
          </div>
          <div className="mb-4">
            <div className="font-semibold">Progress to Next Band</div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div className={`${scoreColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="text-sm text-right mt-1">{percentage}%</div>
          </div>
          <div className="text-sm text-slate-500">
            This score is indicative of your performance in the {skill.toLowerCase()} section of the IELTS test.
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillIcon = ({ name, size = 24, className = "" }) => {
  const icons = {
    Listening: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M12 1a9 9 0 0 1 9 9v7a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3h4v-2a6 6 0 1 0-12 0v2h4a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-7a9 9 0 0 1 9-9z" fill="currentColor" />
      </svg>
    ),
    Reading: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M6.012 18h12.976c-.018 1.677-1.38 3-3.064 3H9.076c-1.684 0-3.046-1.323-3.064-3zM3 4v10a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V4a1 1 0 0 0-1-1h-3a5 5 0 0 0-10 0H4a1 1 0 0 0-1 1zm9-3a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3z" fill="currentColor" />
      </svg>
    ),
    Writing: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M17.457 3L21 6.543V21H3V3h14.457zM12 13H8v2h4v-2zm4-4H8v2h8V9z" fill="currentColor" />
      </svg>
    ),
    Speaking: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M12 3c.825 0 1.5.675 1.5 1.5v9c0 .825-.675 1.5-1.5 1.5s-1.5-.675-1.5-1.5v-9c0-.825.675-1.5 1.5-1.5zm5 7.5c0 2.823-2.022 5.188-4.7 5.688v2.362c4.095-.692 7.2-4.268 7.2-8.55 0-4.282-3.105-7.858-7.2-8.55v2.362c2.678.5 4.7 2.865 4.7 5.688zm-10 0c0-2.823 2.022-5.188 4.7-5.688V2.45c-4.095.692-7.2 4.268-7.2 8.55 0 4.282 3.105 7.858 7.2 8.55v-2.362C9.022 16.688 7 14.323 7 11.5z" fill="currentColor" />
      </svg>
    ),
  };

  const Icon = icons[name] || (() => null);

  return <Icon width={size} height={size} className={className} />;
};

const IELTSSkillsTestOptions = () => {
  const [completedSkills, setCompletedSkills] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState({});
  const [overallScore, setOverallScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 hours in minutes

  const skills = [
    { name: 'Listening', time: 30 },
    { name: 'Reading', time: 60 },
    { name: 'Writing', time: 60 },
    { name: 'Speaking', time: 11 },
  ];

  const handleSkillClick = (skill) => {
    if (!submitted) {
      if (!completedSkills.includes(skill)) {
        setCompletedSkills([...completedSkills, skill]);
      }
    }
  };

  const handleSubmit = () => {
    const newScores = {};
    skills.forEach(skill => {
      newScores[skill.name] = completedSkills.includes(skill.name)
        ? (Math.random() * 3 + 6).toFixed(1) // Random score between 6.0 and 9.0
        : 'N/A';
    });
    setScores(newScores);
    setSubmitted(true);

    // Calculate overall score
    const validScores = Object.values(newScores).filter(score => score !== 'N/A');
    const overall = validScores.reduce((sum, score) => sum + parseFloat(score), 0) / validScores.length;
    setOverallScore(overall.toFixed(1));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold text-center">IELTS Full Skills Test</h1>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <Clock className="mr-2" />
              <span>Time Remaining: {Math.floor(timeLeft / 60)}h {timeLeft % 60}m</span>
            </div>
            <div>
              Candidate ID: <span className="font-semibold">IELTS2024001</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={`border-2 p-4 rounded-lg transition-all duration-300 cursor-pointer
                  ${
                    completedSkills.includes(skill.name)
                      ? 'bg-green-50 border-green-500'
                      : 'bg-white border-slate-200 hover:border-blue-500'
                  }
                `}
                onClick={() => handleSkillClick(skill.name)}
              >
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-xl font-semibold">{skill.name}</h2>
                  <SkillIcon name={skill.name} size={24} className="text-blue-600" />
                </div>
                <div className="mt-4">
                  {submitted ? (
                    <div>
                      <div className="flex justify-center mb-2">
                        <CircularProgress
                          percentage={(parseFloat(scores[skill.name]) / 9) * 100}
                          scoreColor={getScoreColor(parseFloat(scores[skill.name]))}
                        >
                          {scores[skill.name]}
                        </CircularProgress>
                      </div>
                      {scores[skill.name] !== 'N/A' && (
                        <ScoreModal skill={skill.name} score={parseFloat(scores[skill.name])} />
                      )}
                    </div>
                  ) : completedSkills.includes(skill.name) ? (
                    <div className="flex items-center justify-center text-green-600">
                      <Award className="mr-2" />
                      Completed
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                        Start
                      </button>
                      <span className="text-slate-600">Time: {skill.time} min</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {submitted && (
            <div className="mb-6 border-2 p-4 rounded-lg">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold">Overall Score</h2>
                <Award size={24} className="text-yellow-500" />
              </div>
              <div className="p-4">
                <div className="flex justify-center">
                  <CircularProgress
                    percentage={(parseFloat(overallScore) / 9) * 100}
                    scoreColor={getScoreColor(parseFloat(overallScore))}
                  >
                    {overallScore}
                  </CircularProgress>
                </div>
              </div>
            </div>
          )}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={submitted || completedSkills.length === 0}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IELTSSkillsTestOptions;
