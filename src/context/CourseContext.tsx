import React, {createContext, useState} from 'react';
import CourseResponse from '../models/CourseResponse';

export const CourseContext = createContext({
    selectedCourses: [{courseCode:"",courseTitle:""}],
    setSelectedCourses: (courses: CourseResponse[]) => {}
});

export const CourseContextProvider : React.FC = ({children}) => {
    const [selectedCourses, setSelectedCourses] = useState<CourseResponse[]>([])
    return(
        <CourseContext.Provider value={{selectedCourses, setSelectedCourses}}>
            {children}
        </CourseContext.Provider>
    )
}