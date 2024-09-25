import { createContext, useContext, useState, useEffect } from "react";
import { FirestoreDB } from "./firebase";
import { doc, onSnapshot } from 'firebase/firestore';


export const InitUserState = {
    email: null,
    uid: null,
    picture: null,
    photoURL: null,
    displayName: null,
    subscribtion: null,
    name: null,
    quota: null,
}



const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = (props) => {
    const db = FirestoreDB();
    const [userState, setUserState] = useState(InitUserState);

    const SetUser = (UserCredential) => {
        setUserState({...UserCredential})
    };

    const ResetUser = () => {
        setUserState(InitUserState)
    };

    useEffect(() => {
        if (userState.uid) {
            const userDocRef = doc(db, 'users-data', userState.uid);
            const unsubscribe = onSnapshot(
                userDocRef,
                (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        setUserState(prev => ({...prev, subscribtion: userData["subscription"],
                            photoURL: userData["photoURL"],
                            phoneNumber: userData["phoneNumber"],
                            bio: userData["bio"],
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


    const values = {
        ...userState,
        SetUser,
        ResetUser
    }

    return ( <UserContext.Provider value={values}> 
    {props.children}
    </UserContext.Provider> )
}

