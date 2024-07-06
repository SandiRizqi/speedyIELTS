import { UserProvider } from "@/service/user";
import AuthStateChangeProvider from "@/service/auth";

const withUser = (Pages) => {
    return (props) => {
        return <UserProvider>
            <AuthStateChangeProvider>
                <Pages {...props} />
            </AuthStateChangeProvider>
        </UserProvider>
    }
}
withUser.displayName = "withUser";
export default withUser;