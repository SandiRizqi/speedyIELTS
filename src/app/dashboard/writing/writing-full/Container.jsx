'use client'
import WritingFullPage from './WritingFullPage';
import { UserProvider } from '@/service/user';
import AuthStateChangeProvider from '@/service/auth';

const Container = () => {
    return (
        <UserProvider >
            <AuthStateChangeProvider>
                <WritingFullPage isFullTest={false} setCollectAnswer={null} setNextTest={null} savedQuestion={null} savedAnswer={null} feedback={null}/>
            </AuthStateChangeProvider>
        </UserProvider>
    )
}

export default Container;