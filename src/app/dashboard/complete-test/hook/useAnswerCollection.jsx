import { createContext, useContext, useState } from "react";

export const InitState = {listening: {}, reading: {}, writing: {}, speaking: {}};



const AnswerCollectionContext = createContext()

export const useAnswer = () => {
    return useContext(AnswerCollectionContext)
}

export const AnswerProvider = (props) => {
    const [globalState, setGlobalState] = useState(InitState);

    const addAnswer = (data) => {
        setGlobalState(data);
        console.log(globalState);
    };


    const values = {
        globalState,
        addAnswer,
    }

    return ( <AnswerCollectionContext.Provider value={values}> 
    {props.children}
    </AnswerCollectionContext.Provider> )
}

