'use client';
import { useEffect, useState } from "react";
import { FirebaseFunction } from "@/service/firebase";
import { httpsCallable } from "firebase/functions";
import AudioPlayer from "./AudioPlayer";


const IntroChat = ({question, index, setIndex}) => {
    const functions = FirebaseFunction();
    const [voice, setVoice] = useState(null);
   

    const getVoice = async () => {
        const getData = httpsCallable(functions, 'textToSpeech');
        getData({ text: question }).then((result) => {
            setVoice(result.data.base64);
        });
    };


    function handleFinishPlay () {
        setIndex(index + 1)
    };
 
    useEffect(() => {
        getVoice();
    }, [])

    return (
        <>
        {voice && <AudioPlayer base64Audio={voice} onFinish={handleFinishPlay}/>}
        </>
    )
};

export default IntroChat;