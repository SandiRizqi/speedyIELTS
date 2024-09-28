import { createContext, useContext, useState, useEffect } from "react";
import { FirestoreDB } from "@/service/firebase";
import { ErrorMessage } from "../../_components/Alert";
import { doc, setDoc } from "firebase/firestore";
export const InitState = {listening: {done:false}, reading: {done:false}, writing: {done:false}, speaking: {done:false}};
export const InitFeedback = {listening: null , reading: null, writing: null, speaking: null};



const AnswerCollectionContext = createContext()

export const useAnswer = () => {
    return useContext(AnswerCollectionContext)
}

export const AnswerProvider = (props) => {
    const db = FirestoreDB();
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
        addFeedback,
        setGlobalState
    };

    const setDataToDB = async (docId, data) => {
        try {
          await setDoc(doc(db, "complete-test", docId), data, { merge: true });
        } catch (error) {
          ErrorMessage(error)
        }
    };



    useEffect(() => {
        if (globalState?.id) {
            setDataToDB(globalState.id, globalState);
        }
    },[globalState])

    return ( <AnswerCollectionContext.Provider value={values}> 
    {props.children}
    </AnswerCollectionContext.Provider> )
}

