'use client'
import FullSpeakingPage from "./FullSpeakingPage";
import { UserProvider } from '@/service/user';
import AuthStateChangeProvider from '@/service/auth';
import withUser from "@/hooks/withUser";
import checkQuota from "@/hooks/checkQuota";
const Container = () => {
    return (
        <UserProvider >
            <AuthStateChangeProvider>
                <FullSpeakingPage isFullTest={false} setCollectAnswer={null} setNextTest={null} savedQuestion={null} savedAnswer={null}/>
            </AuthStateChangeProvider>
        </UserProvider>
    )
}

export default checkQuota(withUser(Container), "speaking-questions");