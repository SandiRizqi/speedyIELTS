'use client'
import React, { useState, useRef, useEffect } from 'react';
import { FirebaseStorge } from '@/service/firebase';
import { ref, getDownloadURL } from 'firebase/storage';


const AudioPlayer = ({ audioUrls }) => {
    const drive = FirebaseStorge();
    const [currentTrack, setCurrentTrack] = useState(0);
    const [currentUrl, setCurrentUrl] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        async function getURL() {
            const storageRef = ref(drive, audioUrls[currentTrack]);
            const Url = await getDownloadURL(storageRef);
            audioRef.current.src = Url;
            audioRef.current.play();
        }

        if (isPlaying) {
            getURL()
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrack, audioUrls]);

    useEffect(() => {
        const handleEnded = () => {
            playNext();
        };
        audioRef.current?.addEventListener('ended', handleEnded);
        return () => {
            audioRef.current?.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const playNext = () => {
        if (currentTrack  < audioUrls.length -1) {
            setCurrentTrack((prevTrack) => (prevTrack + 1) % audioUrls.length);
        }
    };

    const playPrevious = () => {
        if (currentTrack > 0) {
            setCurrentTrack((prevTrack) => (prevTrack - 1 + audioUrls.length) % audioUrls.length);
        }  
    };
    return (
        <div className="flex flex-1 w-full p-4 items-center justify-center  bg-gray-100">
            <audio ref={audioRef}>
                <source src={currentUrl} type="audio/mpeg" />
            </audio>
            <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-bold mb-4">Audio Player</h2>
                <p className="mb-2">Now playing: Track {currentTrack + 1} of {audioUrls.length}</p>
                <div className="flex space-x-4">
                    <button
                        onClick={playPrevious}
                        className="px-4 py-2 bg-blue-600 text-white hover:bg-orange-400"
                    >
                        Previous
                    </button>
                    <button
                        onClick={togglePlayPause}
                        className="px-4 py-2 bg-green-500 text-white  hover:bg-green-600"
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                        onClick={playNext}
                        className="px-4 py-2 bg-blue-600 text-white  hover:bg-orange-400"
                    >
                        Next
                    </button>
            </div>
        </div >
        </div>
    )
}

export default AudioPlayer;