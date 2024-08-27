import withUser from "./withUser";
import { FirestoreDB } from "@/service/firebase";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { doc, onSnapshot } from 'firebase/firestore';
import { useUser } from "@/service/user";

const withSubscription = (Component) => {
    return (props) => {
        const db = FirestoreDB();
        const user = useUser();
        const router = useRouter();



        const handleReplace = () => {
            router.back();
          };
        


        useEffect(() => {
    
            const userDocRef = doc(db, 'users-data', user.uid);
            const unsubscribe = onSnapshot(
                userDocRef,
                (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        if (userData["subscription"] !== "PREMIUM") {
                            handleReplace();
                        }
                    } else {
                        console.log("No such user's document!");
                    }
                },
                (err) => {
                    console.error("Error fetching user data: ", err);
                }
            );
            return () => unsubscribe();
        }, []);
    

        return <Component {...props} />;
    };
};

withSubscription.displayName = "withSubscription";

export default withSubscription;