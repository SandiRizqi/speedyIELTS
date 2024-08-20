
'use client'
import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ base64Audio, onFinish }) => {
    const [audioUrl, setAudioUrl] = useState(null);

    useEffect(() => {
        // Convert base64 to Blob
        const byteCharacters = atob(base64Audio);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'audio/mp3' });

        // Create URL for the audio
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        // Clean up the URL when component unmounts
        return () => {
            URL.revokeObjectURL(url);
        };
    }, []);

    return (
        <div>
            {audioUrl && (
                <audio autoPlay onEnded={onFinish}>
                    <source src={audioUrl} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default AudioPlayer;