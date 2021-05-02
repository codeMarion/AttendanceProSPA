import AuthConfig from "../config/AuthConfig";
import CourseResponse from "../models/CourseResponse";
import StudentPage from "../models/StudentPage";

/*
    This controller contains functions that fetches information from the Student controller of the REST API. 
    The controller makes the other parts of the code more readable.
*/
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

    public async UpdateStudent(userId: number, email: string, phone: string, accessToken: string){
        const response = await fetch(`${AuthConfig.API_URL}/Student/update`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({userId,email,phone})
        });
        return response.ok;
    }

    public async GetStudent(studentId: string, accessToken: string) {
        const response = await fetch(`${AuthConfig.API_URL}/Student/${studentId}`,{
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });        
        return response.ok ? await response.json() : false;
    }

    public async GetPersistentStudentsCount(accessToken: string, margin: number){
        const response = await fetch(`${AuthConfig.API_URL}/Student/persistentAbsenceCount/${margin / 100}`,{
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });        
        return response.ok ? await response.json() : false;
    }

    public async GetNotAttendingStudentsCount(accessToken: string){
        const response = await fetch(`${AuthConfig.API_URL}/Student/nonAttendingCount`,{
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });        
        return response.ok ? await response.json() : false;
    }

    public async GetPersistentStudentsData(accessToken: string, page: number, margin: number){
        const response = await fetch(`${AuthConfig.API_URL}/Student/persistentAbsence/${margin / 100}/${page}`,{
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });        
        return response.ok ? await response.json() : false;
    }

    public async GetAverageAttendance(accessToken: string){
        const response = await fetch(`${AuthConfig.API_URL}/Student/avgAttendance`,{
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });        
        return response.ok ? await response.json() : false;
    }

    public async GetPersistentAbsenteesByYear(accessToken: string, margin: number){
        const response = await fetch(`${AuthConfig.API_URL}/Student/persistentAbsenteesCountByYear/${margin / 100}`,{
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });        
        return response.ok ? await response.json() : false;
    }

    public async GetAbsenceStartingData(accessToken: string){
        const response = await fetch(`${AuthConfig.API_URL}/Student/attendanceByPeriod`,{
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });        
        return response.ok ? await response.json() : false;
    }

    public async GetPersistentAbsenteesByCourse(accessToken: string, margin: number){
        const response = await fetch(`${AuthConfig.API_URL}/Student/persistentAbsenteesCountByCourse/${margin / 100}`,{
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });        
        return response.ok ? await response.json() : false;
    }

    public async NonAttendingStudents(accessToken: string, page: number){
        const response = await fetch(`${AuthConfig.API_URL}/Student/nonAttendingStudents/${page}`,{
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });        
        return response.ok ? await response.json() : false;
    }

    public async NonAttendingStudentsByYear(accessToken: string){
        const response = await fetch(`${AuthConfig.API_URL}/Student/nonAttendingStudentsByYear`,{
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });        
        return response.ok ? await response.json() : false;
    }

    public async GetTrackedStudents(accessToken: string, students: string[]){
        const response = await fetch(`${AuthConfig.API_URL}/Student/getTrackedStudents`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(students)
        });        
        return response.ok ? await response.json() : false;
    }
}