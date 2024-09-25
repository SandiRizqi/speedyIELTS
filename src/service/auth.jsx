"use client"
import { Authenticaion } from "./firebase";
import { useEffect, useState } from "react";
import { useUser, InitUserState } from "./user";




const AuthStateChangeProvider = ({children}) => {
    const [isLoading, setLoading ] = useState(true);
    const user = useUser();
    const {SetUser} = user;

    const InitAuthStateChange = () => {
        Authenticaion().onAuthStateChanged ((user) => {
            if (user) {
                SetUser({email: user.email, uid: user.uid, picture: user.photoURL, photoURL: user.photoURL, displayName: user.displayName, name: user.displayName});
            } else {
                SetUser(InitUserState);
            };
            setLoading(false)
        })
    }

    useEffect(() => {
        InitAuthStateChange();
    }, [])




    if(isLoading){
        return ;
    }
    return children;
}

export default AuthStateChangeProvider;