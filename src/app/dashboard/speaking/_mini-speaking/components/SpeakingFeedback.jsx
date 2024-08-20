'use client'
import { useChat } from "../hook/chat";
import { useEffect, useState } from "react";
import { FirebaseFunction } from "@/service/firebase";
import { httpsCallable } from "firebase/functions";
import Loader from "@/components/common/Loader";
import { useUser } from '@/service/user';


function dialogToString(dialogArray) {
    let dialogString = "";
    dialogArray.map((dialogObj, index) => {
        dialogString += `<strong>Examiner</strong>: ${dialogObj.examiner}`;
        dialogString += "<br />";
        dialogString += `<strong>User</strong>: ${dialogObj.user}`;
        if (index !== dialogArray.length - 1) {
            dialogString += "<br />";
        }
    });
    return dialogString;
}


const SpeakingFeedback = ({ finished }) => {
    const chat = useChat();
    const user = useUser();
    const functions = FirebaseFunction();
    const { chatState } = chat;
    const [allDialogue, setAllDialogue] = useState('');
    const [Feedback, setFeedback] = useState(null);
    const [highlightedText, setHighlightedText] = useState("")
    const [loading, isLoading] = useState(false);

    const getFeedback = async (text) => {
        isLoading(true);
        const getFb = httpsCallable(functions, 'getSpeakingScore');
        getFb({ dialogue: text, userId: user.uid, testType: "mini-speaking" }).then((result) => {
            setFeedback(result.data["result"]);
            isLoading(false)
        });
    };

    useEffect(() => {
        if (chatState && finished) {
            const Dialogue = dialogToString(chatState);
            getFeedback(Dialogue);
            setAllDialogue(Dialogue)
        }
    }, [chatState]);

    const handleHighlisht = (sentencesWithRevisions) => {
        let paragraph = allDialogue;

        sentencesWithRevisions.forEach(({ mistakes, revision }) => {
            const pattern = new RegExp(`(${mistakes})`, "gi");
            paragraph = paragraph.replace(pattern, sentence => {
                return `<p class="bg-danger inline-block whitespace-pre text-white">${sentence}</p> \n <p class="bg-green-400 inline-block whitespace-pre">${revision}</p>`;
            });
        });

        setHighlightedText(paragraph);
    };

    useEffect(() => {
        if (Feedback) {
            handleHighlisht(Feedback.corrections)
        }

    }, [Feedback]);

    return (
        <>
            <div
                className="mt-2 p-2 rounded text-wrap break-words max-w-full overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: `<span className="text-wrap break-words dark:text-white">${highlightedText}</span>` }}
            />
            {loading && (<Loader />)}
        </>
    )
};

export default SpeakingFeedback;