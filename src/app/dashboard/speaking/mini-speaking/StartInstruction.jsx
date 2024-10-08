import React, { useEffect, useState } from 'react';

const useMicrophonePermission = () => {
  const [microphonePermission, setMicrophonePermission] = useState(null); // null = not checked, true = allowed, false = denied

  useEffect(() => {
    const checkMicrophonePermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately after permission is granted
        setMicrophonePermission(true);
      } catch (err) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setMicrophonePermission(false);
        } else {
          setMicrophonePermission(null); // Other errors (like NotFoundError) or initial state
        }
      }
    };

    checkMicrophonePermission();
  }, []);

  return microphonePermission;
};


const StartInstruction = ({ setStart }) => {
  const isRecorderAvailable = useMicrophonePermission();

  const refreshPage = () => {
    window.location.reload();
  };



  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full bg-white dark:bg-slate-700 shadow-lg  overflow-hidden m-4">
        <div className="bg-slate-800  py-6 px-8 text-white text-2xl font-bold">
          Test Instructions
        </div>
        <div className="p-8 space-y-6">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Welcome to the Speaking test! Please read the following instructions
            carefully:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-sm">
            <li>Makesure your audio recorder is available.</li>
            <li>You have approximately 6 minutes to complete the test.</li>
            <li>
              The test consists of 1 part. you should answer after the examiner finish the question.
            </li>
            <li>
              Your score will be displayed at the end of the exam just after you submit your answer. Good luck!
            </li>
          </ul>
          <div className="flex justify-center">
            {isRecorderAvailable ? (
              <button className="bg-blue-600 hover:bg-orange-400 text-white font-bold py-3 px-8 transition-colors duration-300" onClick={() => setStart(true)}>
                Start test
              </button>
            ) : (
              <div className="bg-[#F87171] border text-white px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Microphone access is not allowed!</strong>
                <span className="block sm:inline"> Please enable microphone permissions and try again.</span>
                <button
                  onClick={refreshPage}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-orange-400 flex w-full justify-center"
                >
                  Refresh Page
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartInstruction;