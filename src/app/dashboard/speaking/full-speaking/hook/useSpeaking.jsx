import { createContext, useContext, useState } from "react";
import { useRef } from "react";


const SpeakingCollectionContext = createContext()

export const useSpeaking = () => {
    return useContext(SpeakingCollectionContext)
}

export const SpeakingProvider = (props) => {
    const order = [ "intro1", "part1", "intro2", "part2","intro3" ,"part3", "closing"];
    const [indexStep, setIndexStep] = useState(0);
    const [ currentSection, setCurrentSection] = useState(order[indexStep]);
    const [statusTest, setStatusTest] = useState(false);
    const [finished, setFinished] = useState(false);
    const audioContext = useRef(null);
    const analyser = useRef(null);
    const microphone = useRef(null);
    const mediaRecorder = useRef(null);
    const animationFrame = useRef(null);
    const audioRef = useRef(null);
    const synth = useRef(window.speechSynthesis);
    const audioChunks = useRef([]);
    const silenceTimer = useRef(null);

    const handleNext = () => {
        if (indexStep < order.length - 1) {
          setIndexStep((prev) => {
            const newIndex = prev + 1;
            setCurrentSection(order[newIndex]);
            // console.log(`Advancing to indexStep ${newIndex}, currentSection ${order[newIndex]}`);
            return newIndex;
          });
        } else {
        //   console.log('Test finished');
          setStatusTest(false);
          setFinished(true);
        }
      };
    


    const values = {
        audioContext,
        analyser,
        microphone,
        mediaRecorder,
        animationFrame,
        audioRef,
        synth,
        audioChunks,
        silenceTimer,
        handleNext,
        currentSection,
        statusTest, 
        setStatusTest,
        finished,
        setFinished
    }

    return ( <SpeakingCollectionContext.Provider value={values}> 
    {props.children}
    </SpeakingCollectionContext.Provider> )
}

