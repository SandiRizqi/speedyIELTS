'use client'
import 'regenerator-runtime/runtime';
import React, { useState, useEffect, useRef } from 'react';
import { Mic, Play, Pause } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeaking } from './hook/useSpeaking';

const VoiceAssistant = ({ intro, questions, setMessages, start, isVisible }) => {
  
  // const [isRecording, setIsRecording] = useState(false);
  const [volume, setVolume] = useState(0);
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const {audioContext, analyser, microphone, 
    mediaRecorder, animationFrame, audioRef,
    synth, audioChunks, silenceTimer, handleNext, currectSection
  } = useSpeaking();
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


  const resetAudioResources = () => {
    // Reset the microphone and media recorder if they exist
    if (microphone.current) {
      microphone.current.disconnect();
    }
    if (mediaRecorder.current) {
      mediaRecorder.current = null;
    }
    if (audioContext.current) {
      audioContext.current.close();
      audioContext.current = null;
    }
    
  };
  

 
  

  const startConversation = () => {
    if(intro) {
      //console.log(examiner['gender'])
      SpeechRecognition.stopListening()
      //stopRecording();
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
        setCurrentQuestionIndex(0);
        setIsStart(false);
        handleNext();
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
    if (currectSection === 'part2') {
      return ;
    };

    SpeechRecognition.stopListening()
    setAssistantSpeaking(true);
    setMessages(prevMessages => [...prevMessages, { sender: 'assistant', text: questions[index] }]);
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

      // setIsRecording(true);
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
    SpeechRecognition.stopListening();
    resetAudioResources();
    // setIsRecording(false);
    setRecordingStatus('inactive');
    setVolume(0);
    clearTimeout(silenceTimer.current);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
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
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      clearTimeout(silenceTimer.current);
      synth.current.cancel();
    };
  }, []);

  useEffect(() => {
    if (transcript && !listening) {
      setMessages(prevMessages => [...prevMessages, { sender: 'user', text: transcript, audioUrl: audioRef.current.src }])
      resetTranscript();
    }

  },[listening])

  useEffect(() => {
    if (questions) {
      if (currentQuestionIndex < questions.length && isStart) {
        askQuestion(currentQuestionIndex);
      } else if (currentQuestionIndex >= questions.length && isStart ) {
        setCurrentQuestionIndex(0);
        setIsStart(false);
        handleNext();
      }
    }
  }, [currentQuestionIndex, isStart, questions, currectSection, intro]);

  



  useEffect(() => {
    if(start) {
      startConversation();
    }
  }, [start, currectSection, intro])


  useEffect(() => {
    return () => {
      if (synth.current.speaking || synth.current.pending) {
        synth.current.cancel(); // Stop any ongoing speech synthesis
      }
      
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



  if (!isVisible) return null; 

  return (
    <div className="">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Examiner</h2>
        <div className="flex flex-col items-center justify-center mb-8">
          {/* Avatar */}
          <div className="relative mb-6">
            <div className="w-40 h-40 rounded-full flex items-center justify-center overflow-hidden">
              <svg width="120" height="120" viewBox="0 0 120 120" className="transform translate-y-4">
                <circle cx="60" cy="60" r="50" fill="#4B5563" />
                <circle cx="45" cy="50" r="5" fill="white" />
                <circle cx="75" cy="50" r="5" fill="white" />
                <path d={assistantSpeaking ? "M40 80 Q60 100 80 80" : "M40 80 Q60 95 80 80"} stroke="white" strokeWidth="3" fill="none" />
              </svg>
            </div>
            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${assistantSpeaking ? 'bg-blue-400' :
                recordingStatus === 'recording' ? 'bg-green-400' :
                  recordingStatus === 'listening' ? 'bg-yellow-400' :
                    'bg-slate-300'
              }`}>
              <Mic />
            </div>
          </div>

          {/* Waveform */}
          {currectSection !== 'part2' && (
            <div className="w-full h-24 bg-white bg-opacity-30 rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-around p-2">
              {[...Array(20)].map((_, index) => (
                <div
                  key={index}
                  className={`w-1 rounded-full transition-all duration-300 ${assistantSpeaking || recordingStatus !== 'inactive' ? 'bg-slate-700 animate-wave' : 'bg-slate-300'}`}
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
        <div className="flex justify-center space-x-4">
         
        </div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default VoiceAssistant;
