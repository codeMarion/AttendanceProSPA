import React, {createContext, useState} from 'react';

//Context creation with default value
export const UserContext = createContext({
    profileUpdate: false, 
    setProfileUpdate: (state: boolean) =>  {}
});

//The provider for the context with handling of data management
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