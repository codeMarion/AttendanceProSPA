import React, {createContext, useState} from 'react';
import UploadModel from '../models/UploadModel';

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