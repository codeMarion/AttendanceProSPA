import React, {createContext, useState} from 'react';

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