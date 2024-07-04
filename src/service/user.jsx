import { createContext, useContext, useState } from "react";

export const InitUserState = {
    email: null,
    uid: null,
    picture: null,
    displayName: null
}



const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = (props) => {
    const [userState, setUserState] = useState(InitUserState);

    const SetUser = (UserCredential) => {
        setUserState({...UserCredential})
    };

    const ResetUser = () => {
        setUserState(InitUserState)
    };

    const values = {
        ...userState,
        SetUser,
        ResetUser
    }

    return ( <UserContext.Provider value={values}> 
    {props.children}
    </UserContext.Provider> )
}

