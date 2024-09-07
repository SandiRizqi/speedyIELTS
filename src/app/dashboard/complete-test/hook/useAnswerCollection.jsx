import { createContext, useContext, useState } from "react";

export const InitState = {listening: {}, reading: {}, writing: {}, speaking: {}};
export const InitFeedback = {listening: null , reading: null, writing: null, speaking: null};



const AnswerCollectionContext = createContext()

export const useAnswer = () => {
    return useContext(AnswerCollectionContext)
}

export const AnswerProvider = (props) => {
    const [globalState, setGlobalState] = useState(InitState);
    const [globalFeedback, setGlobalFeedback] = useState(InitFeedback)

    const addAnswer = (data) => {
        setGlobalState(data);
    };

    const addFeedback  = (data) => {
        setGlobalFeedback(data)
    }


    const values = {
        globalState,
        globalFeedback,
        addAnswer,
        addFeedback
    }

    return ( <AnswerCollectionContext.Provider value={values}> 
    {props.children}
    </AnswerCollectionContext.Provider> )
}

