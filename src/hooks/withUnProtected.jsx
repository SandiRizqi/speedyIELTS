import { useRouter } from "next/navigation";
import { useUser } from "@/service/user";


const withUnProtected = (Pages) => {

    return (props) => {
        const router = useRouter();
        const user = useUser();
        const {userState} = user;

        if (userState?.uid){
            router.replace("/dashboard");
            return<></>;
        }

        return <Pages {...props} />;
        }
}
withUnProtected.displayName = "withUnProtected";
export default withUnProtected;