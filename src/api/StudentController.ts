import AuthConfig from "../config/AuthConfig";
import CourseResponse from "../models/CourseResponse";
import StudentPage from "../models/StudentPage";

export default class StudentController 
{
    public async GetStudentCount(searchTerm: string, chipData: CourseResponse[], accessToken: string) : Promise<number> {
        const response = await fetch(`${AuthConfig.API_URL}/Student/count${searchTerm ? `/${searchTerm}`:''}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(chipData.map(course => course.courseCode))
        });
        return parseInt(await response.text());
    }

    public async GetStudentsPage(currPage : number, searchTerm: string, chipData: CourseResponse[], accessToken: string) : Promise<StudentPage[]> {
        const response = await fetch(`${AuthConfig.API_URL}/Student/page/${currPage}${searchTerm ? `/${searchTerm}` : ''}`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(chipData.map(course => course.courseCode))
        });        
        const data : StudentPage[] = await response.json();
        return data;
    }

    public async GetStudent(studentId: string, accessToken: string) {
        const response = await fetch(`${AuthConfig.API_URL}/Student/${studentId}`,{
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });        
        return response.ok ? await response.json() : false;
    }
}