import { createContext, useContext, useState } from "react";

export const InitChatState = [];



const ChatContext = createContext()

export const useChat = () => {
    return useContext(ChatContext)
}

export const ChatProvider = (props) => {
    const [chatState, setChatState] = useState(InitChatState);

    const addChat = (newChat) => {
        setChatState((prev) => [...prev, newChat]);
    };

    const resetChat = () => {
        setChatState(InitChatState);
    };


    const values = {
        chatState,
        addChat,
        resetChat
    }

    return ( <ChatContext.Provider value={values}> 
    {props.children}
    </ChatContext.Provider> )
}

