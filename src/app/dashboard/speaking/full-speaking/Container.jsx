'use client'
import FullSpeakingPage from "./FullSpeakingPage";
// import SpeakingPage from "./SpeakingPage";
import { UserProvider } from '@/service/user';
import AuthStateChangeProvider from '@/service/auth';
import { SpeakingProvider } from "./hook/useSpeaking";

const Container = () => {
    return (
        <UserProvider >
            <AuthStateChangeProvider>
                <SpeakingProvider>
                <FullSpeakingPage isFullTest={false} setCollectAnswer={null} setNextTest={null} savedQuestion={null} savedAnswer={null} questionId={null} Feedback={null}/>
                </SpeakingProvider>
            </AuthStateChangeProvider>
        </UserProvider>
    )
}

export default Container;