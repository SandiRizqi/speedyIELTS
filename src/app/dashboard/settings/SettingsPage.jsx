"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { UserProvider } from "@/service/user";
import AuthStateChangeProvider from "@/service/auth";
import UserInfo from "./UserInfo";

const SettingsPage = () => {
    return (
        <UserProvider>
            <AuthStateChangeProvider>
                <div className="mx-auto max-w-270">
                    <Breadcrumb pageName="Settings" />
                    <UserInfo />
                </div>
            </AuthStateChangeProvider>
        </UserProvider>
    )
}


export default SettingsPage;