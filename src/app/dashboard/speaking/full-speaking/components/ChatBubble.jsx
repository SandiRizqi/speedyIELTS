'use client'
import { useEffect, useState } from "react";
import { useRecordVoice } from "../hook/useRecordVoice";
import { httpsCallable } from "firebase/functions";
import { FirebaseFunction } from "@/service/firebase";
import AudioPlayer from "./AudioPlayer";
import { useChat } from "../hook/chat";

const RecordingIcon = () => {
    return (
        <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-8 w-8 rounded-full bg-red opacity-75 animate-ping">
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="relative w-10 h-10 text-red" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                Recording...
            </svg>
        </div>
    )
};


const ChatBubble = ({ role, isClient, setIsClient, question, index, setIndex }) => {
    const functions = FirebaseFunction();
    const chat = useChat();
    const {addChat} = chat;
    const { recording, processing, mediaRecorder, startRecording, stopRecording, text } = useRecordVoice();
    const [voice, setVoice] = useState(null);
   

    const getVoice = async () => {
        const getData = httpsCallable(functions, 'textToSpeech');
        getData({ text: question }).then((result) => {
            setVoice(result.data.base64);
        });
    };


    function handleFinishPlay () {
        setIsClient(true);
    };


    useEffect(() => {
        if (mediaRecorder && isClient) {
            startRecording();
            const timer = setTimeout(() => {
                stopRecording();
            }, 15000); // Adjust the delay as needed
            return () => clearTimeout(timer);
        };

    }, [mediaRecorder]);


    useEffect(() => {
        if (role === "system" && !isClient) {
            getVoice();
        };
    }, []);

    useEffect(() => {
        if(!processing) {
            addChat({examiner: question, user: text});
            setIndex(index + 1);
        };
    },[processing]);






    return (
        <>
            {role === 'system' && (<div className="py-2">
                <div className="flex items-start gap-2.5">
                    <img className="w-10 h-10 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3276/3276535.png" alt="Jese image" />
                    <div className="flex flex-col gap-1 w-full max-w-[320px]">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">System</span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                        </div>
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl justify-center rounded-es-xl dark:bg-gray-700 bg-white shadow-md">
                            <p className="text-sm font-normal text-slate-900 dark:text-slate-600">
                                {question}
                            </p>
                            <br />
                            {voice && <AudioPlayer base64Audio={voice} onFinish={handleFinishPlay}/>}
                        </div>
                    </div>
                </div>
            </div>)}
            {isClient && (
                (
                    <div className="flex w-full justify-end py-2">
                        <div className="flex items-start gap-2.5">
                            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Client</span>
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                                </div>
                                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-l-xl rounded-b-xl dark:bg-gray-700 bg-white shadow-md">
                                    {recording && <RecordingIcon />}
                                    {processing && !recording && <p>processing ...</p>}
                                    <p className="text-sm font-normal text-slate-900  dark:text-slate-600">
                                        {text}
                                    </p>
                                </div>
                            </div>
                            <img className="w-10 h-10 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3276/3276535.png" alt="Jese image" />
                        </div>
                    </div>
                )
            )}
        </>

    )
}

export default ChatBubble;