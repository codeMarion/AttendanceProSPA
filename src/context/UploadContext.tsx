import React, {createContext, useState} from 'react';
import UploadModel from '../models/UploadModel';

//Context creation with default value
export const UploadContext = createContext({
    uploadedData: [{
        id: 0,
        userId: 0,
        studyLevel: "",
        courseYear: "",
        regStatus: "",
        courseTitle: "",
        courseCode: "",
        teaching: 0,
        attended: 0,
        explained: 0,
        nonAttended: 0,
        percentAttendance: 0,
        unexcusedPercentAttendance: 0,
        lastAttendance: new Date("01/01/2020")
    }],
    setUploadedData: (e:UploadModel[]) => {}
});

//The provider for the context with handling of data management
export const UploadContextProvider : React.FC = ({children}) => {

    const [uploadedData, setUploadedData] = useState<UploadModel[]>([]);

    return(
        <UploadContext.Provider value={{
            uploadedData,
            setUploadedData
        }}>
            {children}
        </UploadContext.Provider>
    )
}