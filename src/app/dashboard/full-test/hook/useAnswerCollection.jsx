import { createContext, useContext, useState } from "react";

export const InitState = {};



const AnswerCollectionContext = createContext()

export const useAnswer = () => {
    return useContext(AnswerCollectionContext)
}

export const AnswerProvider = (props) => {
    const [state, setState] = useState(InitState);

    const addAnswer = (data) => {
        setState(prev => ({...prev, data}));
        console.log(state);
    };


    const values = {
        state,
        addAnswer,
    }

    return ( <AnswerCollectionContext.Provider value={values}> 
    {props.children}
    </AnswerCollectionContext.Provider> )
}

