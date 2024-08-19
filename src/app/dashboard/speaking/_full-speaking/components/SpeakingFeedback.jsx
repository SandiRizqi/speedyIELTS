'use client'
import { useChat } from "../hook/chat";
import { useEffect, useState } from "react";
import { FirebaseFunction } from "@/service/firebase";
import { httpsCallable } from "firebase/functions";

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
    const functions = FirebaseFunction();
    const { chatState } = chat;
    const [allDialogue, setAllDialogue] = useState('');
    const [Feedback, setFeedback] = useState(null);
    const [highlightedText, setHighlightedText] = useState("")
    const [loading, isLoading] = useState(true);

    const getFeedback = async (text) => {
        console.log(text);
        const getFb = httpsCallable(functions, 'getSpeakingScore');
        getFb({ dialogue: text }).then((result) => {
            setFeedback(result.data);
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
                return `<p class="bg-red-400 inline-block whitespace-pre text-white">${sentence}</p> \n <p class="bg-green-400 inline-block whitespace-pre text-white">${revision}</p>`;
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
                className="mt-2 p-2 rounded text-wrap break-words max-w-full"
                dangerouslySetInnerHTML={{ __html: `<span className="text-wrap break-words">${highlightedText}</span>` }}
            />
            <button
                className="block bg-blue-600  px-5 py-3 text-xs font-medium text-white transition hover:bg-orange-400 focus:outline-none focus:ring"
                type="button"
                onClick={() => getFeedback(allDialogue)}
            >
                Refresh
            </button>

        </>
    )
};

export default SpeakingFeedback;