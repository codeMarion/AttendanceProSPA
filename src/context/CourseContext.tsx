import React, {createContext, useState} from 'react';
import CourseResponse from '../models/CourseResponse';

//Context creation with default value
export const CourseContext = createContext({
    selectedCourses: [{courseCode:"",courseTitle:""}],
    setSelectedCourses: (courses: CourseResponse[]) => {}
});

//The provider for the context with handling of data management
export const CourseContextProvider : React.FC = ({children}) => {
    const [selectedCourses, setSelectedCourses] = useState<CourseResponse[]>([])
    return(
        <CourseContext.Provider value={{selectedCourses, setSelectedCourses}}>
            {children}
        </CourseContext.Provider>
    )
}