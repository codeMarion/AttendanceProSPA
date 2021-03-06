import React, {createContext, useState} from 'react';

export const AppContext = createContext({
    searchBarValue:"",
    trackedStudentsIds: [""],
    setSearchBarValue: (val : string) =>  {},
    setTrackedStudentIds: (val : string[]) =>  {}
});

export const AppContextProvider : React.FC = ({children}) => {

    const [searchBarValue, setSearchBarValue] = useState("");
    const [trackedStudentsIds, setTrackedStudentIds] = useState([""]);

    return(
        <AppContext.Provider value={{searchBarValue, setSearchBarValue, trackedStudentsIds, setTrackedStudentIds}}>
            {children}
        </AppContext.Provider>
    )
}