import AuthConfig from "../config/AuthConfig";

/*
    This controller contains functions that fetches information from the Course controller of the REST API. 
    The controller makes the other parts of the code more readable.
*/
export default class StudentController 
{
    public async GetAllCourses(accessToken: string) {
        const response = await fetch(`${AuthConfig.API_URL}/Course`,{
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });        
        return response.ok ? await response.json() : false;
    }

    public async GetAbsenceData(body: string[], accessToken: string) {
        const response = await fetch(`${AuthConfig.API_URL}/Course/absenceData`,{
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        });        
        return response.ok ? await response.json() : false;
    }

    public async GetAttendanceByPeriod(body: string[], accessToken: string) {
        const response = await fetch(`${AuthConfig.API_URL}/Course/coursedata`,{
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        });        
        return response.ok ? await response.json() : false;
    }

    public async getAttendedByTeachingSessionsData(body: string[], accessToken: string) {
        const response = await fetch(`${AuthConfig.API_URL}/Course/attendanceoverteaching`,{
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        });        
        return response.ok ? await response.json() : false;
    }
}