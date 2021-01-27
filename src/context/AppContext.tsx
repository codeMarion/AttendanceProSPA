import React, {createContext, useState} from 'react';

export const AppContext = createContext({
    searchBarValue:"",
    setSearchBarValue: (val : string) =>  {}
});

export const AppContextProvider : React.FC = ({children}) => {

    const [searchBarValue, setSearchBarValue] = useState("");

    return(
        <AppContext.Provider value={{searchBarValue, setSearchBarValue}}>
            {children}
        </AppContext.Provider>
    )
}