import React, { useState, useRef, useEffect } from 'react';
import { FirebaseStorge } from '@/service/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

const AudioPlayer = ({ audioUrls, onComplete }) => {
    const drive = FirebaseStorge();
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        async function getURL() {
            if (!audioUrls || audioUrls.length === 0) return;
            
            try {
                const storageRef = ref(drive, audioUrls[currentTrack]);
                const url = await getDownloadURL(storageRef);
                audioRef.current.src = url;
                if (isPlaying) {
                    audioRef.current.play();
                }
            } catch (error) {
                console.error('Error loading audio:', error);
            }
        }

        if (isPlaying) {
            getURL();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrack, audioUrls, drive]);

    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            if (currentTrack < audioUrls.length - 1) {
                setCurrentTrack(prev => prev + 1);
            } else {
                setIsPlaying(false);
                if (onComplete) onComplete();
            }
        };

        const handleTimeUpdate = () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            setProgress(progress);
        };

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [currentTrack, audioUrls, onComplete]);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const playNext = () => {
        if (currentTrack < audioUrls.length - 1) {
            setCurrentTrack(prev => prev + 1);
        }
    };

    const playPrevious = () => {
        if (currentTrack > 0) {
            setCurrentTrack(prev => prev - 1);
        }
    };

    if (!audioUrls || audioUrls.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                <div className="text-center mb-4">
                    <h2 className="text-xl font-bold dark:text-white">Audio Player</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Track {currentTrack + 1} of {audioUrls.length}
                    </p>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={playPrevious}
                        disabled={currentTrack === 0}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button
                        onClick={togglePlayPause}
                        className={`px-6 py-2 rounded text-white ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                        onClick={playNext}
                        disabled={currentTrack === audioUrls.length - 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>

                <audio 
                    ref={audioRef}
                    className="w-full mt-4"
                    controls
                >
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    );
};

export default AudioPlayer;