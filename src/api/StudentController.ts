import AuthConfig from "../config/AuthConfig";
import StudentPage from "../models/StudentPage";

export default class StudentController 
{
    public async GetStudentCount(searchTerm: string, accessToken: string) : Promise<number> {
        const response = await fetch(`${AuthConfig.API_URL}/Student/count${searchTerm ? `/${searchTerm}`:''}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return parseInt(await response.text());
    }

    public async GetStudentsPage(currPage : number, searchTerm: string, accessToken: string) : Promise<StudentPage[]> {
        const response = await fetch(`${AuthConfig.API_URL}/Student/page/${currPage}${searchTerm ? `/${searchTerm}` : ''}`,{
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
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