import { useRouter } from "next/navigation";
import { useUser } from "@/service/user";


const withProtected = (Pages) => {

    return (props) => {
        const router = useRouter();
        const user = useUser();
        const {uid} = user;

        if (!uid){
            router.replace("/auth/signin");
            return<></>;
        }

        return <Pages {...props} />;
        }
}
withProtected.displayName = "withProtected";
export default withProtected;