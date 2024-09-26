'use client'
import 'regenerator-runtime/runtime';
import React, { useState, useEffect, useRef } from 'react';
import { Mic, Play, Pause } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const VoiceAssistant = ({ intro, questions, setMessages, handleNextPart, currectSection, start }) => {
  const [isRecording, setIsRecording] = useState(false);
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
  const silenceTimer = useRef(null);
  const [isStart, setIsStart] = useState(false);
  const silenceStart = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();



  const VOLUME_THRESHOLD = 5;
  const SILENCE_DURATION = 5000;
  const QUESTION_WAIT_TIME = 60000; // 1 minute
  

 
  

  const startConversation = () => {

    if(intro) {
      //console.log(examiner['gender'])
      const utterance = new SpeechSynthesisUtterance(intro);
      const voices = synth.current.getVoices();
      const selectedVoice = voices.find(voice => voice.lang.startsWith('en-'));

      if (selectedVoice) {
          utterance.voice = selectedVoice;
      } else {
          console.warn('Desired voice not found, using default voice.');
      }

      utterance.onend = () => {
        setMessages(prevMessages => [...prevMessages, { sender: 'assistant', text: intro }]);
        handleNextPart();
      };
      return synth.current.speak(utterance);
    };

    if (currectSection === 'part2') {
      return ;
    };

    setIsStart(true);
    setCurrentQuestionIndex(0);
    //askQuestion(0);
  };


  



  const askQuestion = (index) => {
    SpeechRecognition.stopListening()
    setAssistantSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(questions[index]);
    setMessages(prevMessages => [...prevMessages, { sender: 'assistant', text: questions[index] }]);
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
      resetSilenceDetection();
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
      animateWaveform();
      //resetTranscript();
      
      // Set a timer to stop recording after 1 minute if no voice is detected for 5 seconds
      silenceTimer.current = setTimeout(stopRecording, QUESTION_WAIT_TIME);

    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (microphone.current) {
      microphone.current.disconnect();
      if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
        mediaRecorder.current.stop();
      }
      setIsRecording(false);
      setRecordingStatus('inactive');
      setVolume(0);
      clearTimeout(silenceTimer.current);

    
     
      SpeechRecognition.stopListening();
      

      if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      }
    }
  };

  const resetSilenceDetection = () => {
    silenceStart.current = null;
  };


  
  const checkSilence = (currentTime, avgVolume) => {
    if (avgVolume <= VOLUME_THRESHOLD) {
      if (silenceStart.current === null) {
        silenceStart.current = currentTime;
      } else if (currentTime - silenceStart.current >= SILENCE_DURATION) {
        clearTimeout(silenceTimer.current); // Stop the 1-minute timer if silence is detected
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

    
    if (!assistantSpeaking) {
      if (avgVolume > VOLUME_THRESHOLD) {
        if (recordingStatus !== 'recording') {
          setRecordingStatus('recording');
  
          if (mediaRecorder.current.state !== 'recording') {
            mediaRecorder.current.start();
            audioChunks.current = [];
          }
          resetSilenceDetection();
        }
      } else {
        const currentTime = Date.now();
        if (checkSilence(currentTime, avgVolume)) {
          setRecordingStatus('listening');
          stopRecording() // Stop recording after a brief pause
          resetSilenceDetection();
        }
      }
    }

    animationFrame.current = requestAnimationFrame(animateWaveform);
  };


  useEffect(() => {
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
        audioContext.current = null;
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (microphone.current) {
        microphone.current.disconnect();
      }
      if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
        mediaRecorder.current.stop();
      }
      SpeechRecognition.stopListening();
      resetTranscript();
      clearTimeout(silenceTimer.current);
    };
  }, []);

  useEffect(() => {
    if (transcript && !listening) {
      setMessages(prevMessages => [...prevMessages, { sender: 'user', text: transcript, audioUrl: audioRef.current.src }])
      resetTranscript();
    }

  },[listening])

  useEffect(() => {
   
    if (currentQuestionIndex < questions?.length && isStart) {
      askQuestion(currentQuestionIndex);
    } else if (currentQuestionIndex >= questions?.length && isStart ) {
      handleNextPart();
    }
  }, [currentQuestionIndex, isStart, questions]);


  useEffect(() => {
    if(start) {
      startConversation();
    }
  }, [start])





  return (
    <>
      <div className="flex items-center justify-center  bg-gradient-to-br from-blue-500 to-blue-600 p-4 flex-col flex-grow">
      <div className="bg-white/10 backdrop-filter backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-md w-full transition-all duration-300 hover:shadow-3xl flex flex-col flex-grow">
        <h2 className="text-xl font-extrabold mb-8 text-center text-white tracking-tight">Examiner</h2>
        <div className="flex flex-col items-center justify-center">
          {/* Avatar */}
          <div className="relative mb-8 group">
            <div className="w-48 h-48 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-300 to-blue-400 transition-all duration-300 group-hover:scale-105">
              <svg width="140" height="140" viewBox="0 0 120 120" className="transform translate-y-4 transition-all duration-300 group-hover:scale-110">
                <circle cx="60" cy="60" r="50" fill="gray" />
                <circle cx="45" cy="50" r="5" fill="white" />
                <circle cx="75" cy="50" r="5" fill="white" />
                <path d={assistantSpeaking ? "M40 80 Q60 100 80 80" : "M40 80 Q60 95 80 80"} stroke="white" strokeWidth="3" fill="none" />
              </svg>
            </div>
            <div className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              assistantSpeaking ? 'bg-blue-400 animate-pulse' :
              recordingStatus === 'recording' ? 'bg-green-400 animate-pulse' :
              recordingStatus === 'listening' ? 'bg-yellow-400 animate-pulse' :
              'bg-slate-300'
            }`}>
              <Mic className="text-white w-6 h-6" />
            </div>
          </div>

          {/* Waveform */}
          {currectSection !== 'part2' && (
            <div className="w-full h-28 bg-white/20 rounded-3xl overflow-hidden relative shadow-inner transition-all duration-300 hover:bg-white/30">
              <div className="absolute inset-0 flex items-center justify-around p-3">
                {[...Array(20)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      assistantSpeaking || recordingStatus !== 'inactive' ? 'bg-white animate-wave' : 'bg-slate-300'
                    }`}
                    style={{
                      height: `${assistantSpeaking || recordingStatus !== 'inactive' ? Math.min(volume * 10, 100) : 20}%`,
                      animationDelay: `${index * 0.05}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
      <audio ref={audioRef} />
    </>
  );
};

export default VoiceAssistant;
