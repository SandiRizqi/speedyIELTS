'use client'
import 'regenerator-runtime/runtime';
import { useState, useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeaking } from './hook/useSpeaking';

const Timer = ({ minutes, seconds, status, setStatus }) => {
  const [timeLeft, setTimeLeft] = useState({ minutes, seconds });

  useEffect(() => {
    if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      if (status === 'waiting') {
        setStatus('listening')
      } else {
        setStatus('inactive')
      }
    }
  }, [timeLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({ minutes: timeLeft.minutes - 1, seconds: 59 });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className='block text-center'>
      <p className='text-2xl font-medium text-gray-900'>{timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</p>
    </div>
  );
};




const PartTwo = ({ question, setMessages, isVisible }) => {
  const [status, setStatus] = useState('waiting');
  const {audioContext, analyser, microphone, 
    mediaRecorder, animationFrame, audioRef,
    synth, audioChunks, silenceTimer, handleNext
  } = useSpeaking();
  const [volume, setVolume] = useState(0);
  // const silenceStart = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();



  const VOLUME_THRESHOLD = 5;
  const QUESTION_WAIT_TIME = 120000; 


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
        setMessages(prevMessages => [...prevMessages, { sender: 'user', text: transcript, audioUrl: audioRef.current.src }])
      };
      resetSilenceDetection();
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
      animateWaveform();
      silenceTimer.current = setTimeout(stopRecording, QUESTION_WAIT_TIME);

    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (microphone.current) {
      microphone.current.disconnect();
    }
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
    setVolume(0);
    clearTimeout(silenceTimer.current);
  
    // Properly clean up SpeechRecognition and set recording status to inactive
    SpeechRecognition.stopListening();
    
    setStatus('inactive');
    resetSilenceDetection();
  };
  

  const resetSilenceDetection = () => {
    silenceTimer.current = null;
  };


  


  const animateWaveform = () => {
    const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
    analyser.current.getByteTimeDomainData(dataArray);

    const sum = dataArray.reduce((acc, val) => acc + Math.abs(val - 128), 0);
    const avgVolume = sum / dataArray.length;
    setVolume(avgVolume);

    
    
    if (avgVolume > VOLUME_THRESHOLD) {
        if (status !== 'listening') {
          setStatus('listening')
  
          if (mediaRecorder.current.state !== 'recording') {
            mediaRecorder.current.start();
            audioChunks.current = [];
          }
          resetSilenceDetection();
        }
    }

    animationFrame.current = requestAnimationFrame(animateWaveform);
  };

  // const resetAudioResources = () => {
  //   // Reset the microphone and media recorder if they exist
  //   if (microphone.current) {
  //     microphone.current.disconnect();
  //   }
  //   if (mediaRecorder.current) {
  //     mediaRecorder.current = null;
  //   }
  //   if (audioContext.current) {
  //     audioContext.current.close();
  //     audioContext.current = null;
  //   }
    
  // };
  




  useEffect(() => {
    if (status === 'listening') {
      startRecording();;
    } else if (status === 'inactive') {
      resetTranscript();
      // resetAudioResources();
      stopRecording();
      handleNext();
    }

  }, [status])


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
  





  if (!isVisible) return null; 

  return (
    <div className="flex flex-col w-full">
      {status === 'waiting' && (<Timer minutes={0} seconds={60} status={status} setStatus={setStatus}/>)}
      {status === 'listening' && (<Timer minutes={0} seconds={QUESTION_WAIT_TIME / 1000} status={status} setStatus={setStatus}/>)}
      <div
        className="mt-2 p-2 w-full h-full rounded"
        dangerouslySetInnerHTML={{ __html: `<span >${question}</span>` }} />
        
        {status === 'listening' && (
          <div className="w-full h-24 bg-white bg-opacity-30 rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-around p-2">
            {[...Array(20)].map((_, index) => (
              <div
                key={index}
                className={`w-1 rounded-full transition-all duration-300 ${status !== 'waiting' ? 'bg-slate-700 animate-wave' : 'bg-slate-300'}`}
                style={{
                  height: `${status !== 'waiting' ? Math.min(volume * 10, 100) : 20}%`,
                  animationDelay: `${index * 0.05}s`
                }}
              ></div>
            ))}
          </div>
      </div>
        )}
          
      <audio ref={audioRef} />
    </div>
  )
};

export default PartTwo;