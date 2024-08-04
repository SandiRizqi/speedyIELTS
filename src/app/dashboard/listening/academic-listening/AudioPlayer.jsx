'use client'
import React, { useState, useRef, useEffect } from 'react';
import { FirebaseStorge } from '@/service/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

const AudioPlayer = ({ audioUrls }) => {
    const drive = FirebaseStorge();
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());



    useEffect(() => {
        async function getURL() {
            const storageRef = ref(drive, audioUrls[currentTrack]);
            audioRef.current.src = await getDownloadURL(storageRef);
            return audioRef.current.play();
        }
        getURL();
    }, [currentTrack, audioUrls]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        const handleEnded = () => {
            playNext();
        };
        audioRef.current.addEventListener('ended', handleEnded);
        return () => {
            audioRef.current.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const playNext = () => {
        setCurrentTrack((prevTrack) => (prevTrack + 1) % audioUrls.length);
        setIsPlaying(true);
    };

    const playPrevious = () => {
        setCurrentTrack((prevTrack) => (prevTrack - 1 + audioUrls.length) % audioUrls.length);
        setIsPlaying(true);
    };
    return (
        <>
            <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Audio Player</h2>
                <p className="mb-2">Now playing: Track {currentTrack + 1} of {audioUrls.length}</p>
                <div className="flex space-x-4">
                    <button
                        onClick={playPrevious}
                        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    >
                        Previous
                    </button>
                    <button
                        onClick={togglePlayPause}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                        onClick={playNext}
                        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    >
                        Next
                    </button>
            </div>
        </div >
        </>
    )
}

export default AudioPlayer;