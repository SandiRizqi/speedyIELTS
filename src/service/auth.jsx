"use client"
import { Authenticaion } from "./firebase";
import { useEffect, useState } from "react";
import { useUser, InitUserState } from "./user";
import { doc, onSnapshot } from "firebase/firestore";
import { FirestoreDB } from "./firebase";



const AuthStateChangeProvider = ({children}) => {
    const [isLoading, setLoading ] = useState(true);
    const user = useUser();
    const {SetUser, userState} = user;
    const db = FirestoreDB();

    const InitAuthStateChange = () => {
        Authenticaion().onAuthStateChanged ((user) => {
            if (user) {
                SetUser({email: user.email, uid: user.uid, picture: user.photoURL, name: user.displayName});
            } else {
                SetUser(InitUserState);
            };
            setLoading(false)
        })
    }

    useEffect(() => {
        InitAuthStateChange();
    }, [])


    useEffect(() => {
        if (userState.uid) {
            // console.log("RUN")
            const userDocRef = doc(db, 'users-data', userState.uid);
            const unsubscribe = onSnapshot(
                userDocRef,
                (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const Data = docSnapshot.data();
                        // console.log(Data)
                        SetUser((prev) => ({...prev,
                            subscribtion: Data["subscription"],
                            displayName: Data["name"],
                            photoURL: Data["photoURL"],
                            phoneNumber: Data["phoneNumber"],
                            bio: Data["bio"],
                        }))
                    } else {
                        console.log("No such user's document!");
                    }
                },
                (err) => {
                    console.error("Error fetching user data: ", err);
                }
            );
            return () => unsubscribe();
        }
    }, [userState.uid]);




    if(isLoading){
        return ;
    }
    return children;
}

export default AuthStateChangeProvider;