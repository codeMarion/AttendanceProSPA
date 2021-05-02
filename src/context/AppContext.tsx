import React, {createContext, useState} from 'react';

//Context creation with default value
export const AppContext = createContext({
    searchBarValue:"",
    trackedStudentsIds: [""],
    setSearchBarValue: (val : string) =>  {},
    setTrackedStudentIds: (val : string[]) =>  {},
    riskStudentThreshold : 0, 
    setRiskStudentThreshold: (val: number) => {},
    showThresholdDialog : false,
    setShowThresholdDialog : (val: boolean) => {},
});

//The provider for the context with handling of data management
export const AppContextProvider : React.FC = ({children}) => {

    const [searchBarValue, setSearchBarValue] = useState("");
    const [trackedStudentsIds, setTrackedStudentIds] = useState([""]);
    const [showThresholdDialog, setShowThresholdDialog] = useState(false);
    const [riskStudentThreshold, setRiskStudentThreshold] = useState(80);

    return(
        <AppContext.Provider value={
            {
                searchBarValue, setSearchBarValue, 
                trackedStudentsIds, setTrackedStudentIds,
                showThresholdDialog, setShowThresholdDialog,
                riskStudentThreshold, setRiskStudentThreshold
            }
        }>
            {children}
        </AppContext.Provider>
    )
}