import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, Pause } from 'lucide-react';

const VoiceAssistant = ({questions}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0);
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const audioContext = useRef(null);
  const analyser = useRef(null);
  const microphone = useRef(null);
  const mediaRecorder = useRef(null);
  const animationFrame = useRef(null);
  const audioRef = useRef(null);
  const synth = useRef(window.speechSynthesis);
  const audioChunks = useRef([]);

  const VOLUME_THRESHOLD = 15;
  const SILENCE_DURATION = 5000;


  const startConversation = () => {
    setCurrentQuestionIndex(0);
    askQuestion(0);
  };

  const askQuestion = (index) => {
    setAssistantSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(questions[index]);
    utterance.onend = () => {
      setAssistantSpeaking(false);
      startRecording();
    };
    synth.current.speak(utterance);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      analyser.current = audioContext.current.createAnalyser();
      microphone.current = audioContext.current.createMediaStreamSource(stream);
      microphone.current.connect(analyser.current);
      analyser.current.fftSize = 256;

      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioRef.current.src = audioUrl;
      };

      setIsRecording(true);
      setRecordingStatus('listening');
      animateWaveform();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (microphone.current) {
      microphone.current.disconnect();
      cancelAnimationFrame(animationFrame.current);
      if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
        mediaRecorder.current.stop();
      }
      setIsRecording(false);
      setRecordingStatus('inactive');
      setVolume(0);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setTimeout(() => askQuestion(currentQuestionIndex + 1), 1000);
      } else {
        console.log("Conversation ended");
      }
    }
  };

  let silenceStart = null;

const resetSilenceDetection = () => {
  silenceStart = null;
};

const checkSilence = (currentTime, avgVolume) => {
  if (avgVolume <= VOLUME_THRESHOLD) {
    if (silenceStart === null) {
      silenceStart = currentTime;
    } else if (currentTime - silenceStart >= SILENCE_DURATION) {
      return true;
    }
  } else {
    resetSilenceDetection();
  }
  return false;
};

const animateWaveform = () => {
  const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
  analyser.current.getByteTimeDomainData(dataArray);
  
  const sum = dataArray.reduce((acc, val) => acc + Math.abs(val - 128), 0);
  const avgVolume = sum / dataArray.length;
  setVolume(avgVolume);

  const currentTime = Date.now();

  if (avgVolume > VOLUME_THRESHOLD) {
    if (recordingStatus !== 'recording') {
      setRecordingStatus('recording');
      if (mediaRecorder.current.state !== 'recording') {
        mediaRecorder.current.start();
        audioChunks.current = [];
      }
      resetSilenceDetection();
    }
  } else if (recordingStatus === 'recording') {
    if (checkSilence(currentTime, avgVolume)) {
      if (mediaRecorder.current.state === 'recording') {
        mediaRecorder.current.stop();
      }
      setRecordingStatus('listening');
      setTimeout(stopRecording, 1000);  // Stop recording after a brief pause
      resetSilenceDetection();
    }
  }

  animationFrame.current = requestAnimationFrame(animateWaveform);
};

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center bg-white p-4 m-4 rounded-md">
      <div className="bg-blue-600 bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Examiner</h2>
        <div className="flex flex-col items-center justify-center mb-8">
          {/* Avatar */}
          <div className="relative mb-6">
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-300 to-purple-400 shadow-lg flex items-center justify-center overflow-hidden">
              <svg width="120" height="120" viewBox="0 0 120 120" className="transform translate-y-4">
                <circle cx="60" cy="60" r="50" fill="#4B5563" />
                <circle cx="45" cy="50" r="5" fill="white" />
                <circle cx="75" cy="50" r="5" fill="white" />
                <path d={assistantSpeaking ? "M40 80 Q60 100 80 80" : "M40 80 Q60 95 80 80"} stroke="white" strokeWidth="3" fill="none" />
              </svg>
            </div>
            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
              assistantSpeaking ? 'bg-blue-400' :
              recordingStatus === 'recording' ? 'bg-green-400' : 
              recordingStatus === 'listening' ? 'bg-yellow-400' : 
              'bg-gray-300'
            }`}>
              <div className={`w-4 h-4 rounded-full ${
                assistantSpeaking ? 'bg-blue-600 animate-pulse' :
                recordingStatus === 'recording' ? 'bg-green-600 animate-pulse' : 
                recordingStatus === 'listening' ? 'bg-yellow-600 animate-pulse' : 
                'bg-gray-400'
              }`}></div>
            </div>
          </div>
          
          {/* Waveform */}
          <div className="w-full h-24 bg-white bg-opacity-30 rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-around">
              {[...Array(20)].map((_, index) => (
                <div
                  key={index}
                  className={`w-1 rounded-full transition-all duration-300 ${assistantSpeaking || recordingStatus !== 'inactive' ? 'bg-blue-400 animate-wave' : 'bg-gray-300'}`}
                  style={{
                    height: `${assistantSpeaking || recordingStatus !== 'inactive' ? Math.min(volume * 2, 100) : 20}%`,
                    animationDelay: `${index * 0.05}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={startConversation}
            disabled={isRecording || assistantSpeaking}
            className={`flex items-center justify-center py-3 px-6 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-300 ${
              isRecording || assistantSpeaking ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-orange-400  focus:ring-blue-500'
            }`}
          >
            Start Conversation
          </button>
          <button
            onClick={togglePlayback}
            disabled={!audioRef.current?.src}
            className={`flex items-center justify-center py-3 px-6 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-300 ${
              !audioRef.current?.src ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-orange-400 focus:ring-orange-500'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Play
              </>
            )}
          </button>
        </div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default VoiceAssistant;
