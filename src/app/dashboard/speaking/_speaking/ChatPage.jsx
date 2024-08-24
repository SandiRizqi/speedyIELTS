
'use client'
import ChatBubble from "./components/ChatBubble";
import { useState, useEffect, useRef } from "react";

const Chat = ({ text, index, setIndex, isClient, setIsClient }) => {
   
    return (
        <div>
            <ChatBubble role={'system'} setIsClient={setIsClient} question={text} index={index} setIndex={setIndex}/>
            {isClient && (<ChatBubble role={'client'} isClient={isClient} question={text} index={index} setIndex={setIndex} />)}
        </div>
    )
};


const ChatPage = ({ question, step, changeStep }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [index, setIndex] = useState(0);
    const messagesEndRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    

    useEffect(() => {
        if (index < question.length) {
            setChatHistory([...chatHistory, question[index]]);
        } else {
            changeStep(step + 1);
        }
    }, [index, question]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory]);


    return (
        <>
            {chatHistory.map((obj, idx) => (
                <div key={idx}>
                    <Chat text={obj} index={index} setIndex={setIndex} question={question} isClient={isClient} setIsClient={setIsClient}/>
                </div>)
            )}
            <div ref={messagesEndRef} />
        </>
    )
}


export default ChatPage;