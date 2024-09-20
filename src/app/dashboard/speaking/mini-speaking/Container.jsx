'use client'
import FullSpeakingPage from "./FullSpeakingPage";
import { UserProvider } from '@/service/user';
import AuthStateChangeProvider from '@/service/auth';
import withUser from "@/hooks/withUser";

const Container = () => {
    return (
        <UserProvider >
            <AuthStateChangeProvider>
                <FullSpeakingPage isFullTest={false} setCollectAnswer={null} setNextTest={null} savedQuestion={null} savedAnswer={null}/>
            </AuthStateChangeProvider>
        </UserProvider>
    )
}

export default withUser(Container);