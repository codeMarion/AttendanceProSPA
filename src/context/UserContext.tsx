import React, {createContext, useState} from 'react';

export const UserContext = createContext({
    profileUpdate: false, 
    setProfileUpdate: (state: boolean) =>  {}
});

export const UserContextProvider : React.FC = ({children}) => {

    const [profileUpdate, setProfileUpdate] = useState(false);

    return(
        <UserContext.Provider value={{
            profileUpdate, 
            setProfileUpdate: (state: boolean) => setProfileUpdate(state)
        }}>
            {children}
        </UserContext.Provider>
    )
}