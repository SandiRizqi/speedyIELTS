"use client";
import { useEffect, useState, useRef } from "react";
import { blobToBase64 } from "../util/blobToBase64";
import { createMediaStream } from "../util/createMediaStream";
import { FirebaseFunction } from "@/service/firebase";
import { httpsCallable } from "firebase/functions";


export const useRecordVoice = () => {
    const functions = FirebaseFunction();
    const [text, setText] = useState("");
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recording, setRecording] = useState(false);
    const [processing, setProcessing] = useState(true);
    const isRecording = useRef(false);
    const chunks = useRef([]);

    const startRecording = () => {
        console.log("start")
        if (mediaRecorder) {
            console.log("recording...")
            isRecording.current = true;
            mediaRecorder.start();
            setRecording(true);
        }
    };

    const stopRecording = () => {
        console.log("stop")
        if (mediaRecorder) {
            isRecording.current = false;
            mediaRecorder.stop();
            setRecording(false);
        }
    };

    const getText = async (base64data) => {
        setProcessing(true);
        try {
            const getData = httpsCallable(functions, 'speechToText');
            getData({base64Audio: base64data}).then((result) => {
                setText(result.data.text);
                setProcessing(false);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const initialMediaRecorder = (stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        
     

        mediaRecorder.onstart = () => {
            createMediaStream(stream);
            chunks.current = [];
        };

        mediaRecorder.ondataavailable = (ev) => {
            chunks.current.push(ev.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
            blobToBase64(audioBlob, getText);
        };
        setMediaRecorder(mediaRecorder);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then(initialMediaRecorder);
            } catch (err) {
                console.log(err);
                console.log("Device recorder doesn't exist.")
            }
        }
    }, []);

    return { recording, processing, mediaRecorder, startRecording, stopRecording, text };
};