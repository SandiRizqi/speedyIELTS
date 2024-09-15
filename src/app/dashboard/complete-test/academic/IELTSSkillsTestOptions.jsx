import React, { useState } from 'react';
import { Clock, Award } from 'lucide-react';
import { useUser } from '@/service/user';
import { usePathname, useRouter } from 'next/navigation';

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


const SkillIcon = ({ name, size = 24, className = "" }) => {
  const icons = {
    Listening: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" width="24px" height="24px" {...props}>
        <path d="M12 3C7.03 3 3 7.03 3 12v7c0 1.1.9 2 2 2h1v-9H5v-1c0-3.86 3.14-7 7-7s7 3.14 7 7v1h-1v9h1c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9zm-3 11v7H8v-7h1zm8 7v-7h1v7h-1z" fill="currentColor" />
      </svg>
    ),
    Reading: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path
          d="M19 2H9C7.897 2 7 2.897 7 4V18C7 19.103 7.897 20 9 20H19C20.103 20 21 19.103 21 18V4C21 2.897 20.103 2 19 2ZM19 18H9V4H19V18Z"
          fill="currentColor"
        />
        <path
          d="M5 4H4C2.897 4 2 4.897 2 6V20C2 21.103 2.897 22 4 22H14C15.103 22 16 21.103 16 20V19H6C4.897 19 4 18.103 4 17V6C4 4.897 4.897 4 6 4H5V4Z"
          fill="currentColor"
        />
      </svg>
    ),
    Writing: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path
          d="M21 4.85l-1.17-1.17a2.5 2.5 0 00-3.54 0L3.5 16.5V20h3.5L20.85 7.35a2.5 2.5 0 000-3.54L21 4.85zM9 18H6v-3L17.85 3.15l3 3L9 18z"
          fill="currentColor"
        />
      </svg>
    ),
    Speaking: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" width="24px" height="24px" {...props}>
        <path d="M12 2C10.35 2 9 3.35 9 5v6c0 1.65 1.35 3 3 3s3-1.35 3-3V5c0-1.65-1.35-3-3-3zm0 12c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2s2 .9 2 2v7c0 1.1-.9 2-2 2zm-7-5v2c0 3.87 3.13 7 7 7s7-3.13 7-7v-2h2v2c0 4.41-3.59 8-8 8s-8-3.59-8-8v-2h2zm7 10h-2v-2h2v2z" fill="currentColor" />
      </svg>
    ),
  };

  const Icon = icons[name] || (() => null);

  return <Icon width={size} height={size} className={className} />;
};

const ScoreModal = ({ skill, score }) => {
  const [isOpen, setIsOpen] = useState(false);

  const bandDescriptors = [
    "Non User", "Intermittent User", "Extremely Limited User", "Limited User",
    "Modest User", "Competent User", "Good User", "Very Good User", "Expert User"
  ];

  const bandScore = Math.floor(score);
  const percentage = ((score - bandScore) * 100).toFixed(0);
  const scoreColor = getScoreColor(score);

  return (
    <div>
      <button
        className="mt-2 w-full border border-slate-300 p-2 text-slate-700 rounded-lg hover:bg-slate-100"
        onClick={() => setIsOpen(true)}
      >
        View Detailed Score
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              &times; {/* Close button */}
            </button>
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
      )}
    </div>
  );
};

const IELTSSkillsTestOptions = ({activeTab, setActiveTab, globalState}) => {
  const [completedSkills, setCompletedSkills] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState({});
  const [overallScore, setOverallScore] = useState(0);
  const user = useUser();
  const [timeLeft, setTimeLeft] = useState(180); // 3 hours in minutes
  const path = usePathname();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancelClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmCancel = () => {
    setShowConfirm(false);
    handleGoBack();
  };

  const handleClosePopup = () => {
    setShowConfirm(false);
  };





  const handleGoBack = () => {
    const currentPath = path; // Get the current path
    const pathSegments = currentPath.split('/').filter(Boolean); // Split and remove empty segments
    pathSegments.pop(); // Remove the last segment
    const newPath = '/' + pathSegments.join('/'); // Join the remaining segments to form the new path

    router.replace(newPath); // Navigate to the new path
  };

  const skills = [
    { name: 'Listening', time: 35 },
    { name: 'Reading', time: 60 },
    { name: 'Writing', time: 60 },
    { name: 'Speaking', time: 15 },
  ];

  const handleSkillClick = (skill) => {
    if (!submitted) {
      if (!completedSkills.includes(skill)) {
        setActiveTab(skill.toLowerCase());
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
    <div className="min-h-screen  text-slate-800 p-8 flex justify-center items-center ">
      <div className="absolute inset-0 overflow-hidden -z-1">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-blue-600 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-4000"></div>
      </div> 
      <div className="w-full max-w-screen-lg mx-auto bg-white shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center">IELTS Full Skills</h1>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
            <div className="flex items-center">
              <Clock className="mr-2 w-5 h-5 md:w-6 md:h-6" />
              <span className="text-sm md:text-lg">
                Time Remaining: {Math.floor(timeLeft / 60)}h {timeLeft % 60}m
              </span>
            </div>
            <div className="text-sm md:text-md">
              Candidate ID: <span className="font-semibold">{user.email?.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
            {skills.map((skill) => (
              <button
                key={skill.name}
                disabled={globalState[skill.name.toLowerCase()]?.done}
                className={`border-2 p-4  transition-all duration-300 cursor-pointer
                  ${globalState[skill.name.toLowerCase()]?.done === true
                    ? 'bg-green-50 border-green-500'
                    : 'bg-white border-slate-200 hover:border-blue-500'
                  }
                `}
                onClick={() => handleSkillClick(skill.name)}
              >
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-lg md:text-xl font-semibold">{skill.name}</h2>
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
                  ) : globalState[skill.name.toLowerCase()]?.done === true ? (
                    <div className="flex items-center justify-center text-green-600">
                      <Award className="mr-2" />
                      Completed
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                    <div className="bg-blue-500 text-white px-4 py-2 cursor-pointer hover:bg-blue-600 transition-colors duration-300">
                      Start
                    </div>
                    <span className="text-slate-600 text-sm md:text-base">Time: {skill.time} min</span>
                  </div>
                  )}
                </div>
              </button>
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
          <div className="text-center flex space-x-4 justify-center">
          <button
              onClick={handleCancelClick}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 transition-colors duration-300"
            >
              Cencel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitted || completedSkills.length === 0}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 transition-colors duration-300"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-xl max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Cancellation</h2>
            <p>Are you sure you want to cancel?</p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                className="px-4 py-2 bg-slate-300 text-black hover:bg-slate-400"
                onClick={handleClosePopup}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-danger text-white hover:bg-danger"
                onClick={handleConfirmCancel}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IELTSSkillsTestOptions;
