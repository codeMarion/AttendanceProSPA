import AuthConfig from "../config/AuthConfig";
import UserModel from "../models/UserModel";

/*
    This controller contains functions that fetches information from the User controller of the REST API. 
    The controller makes the other parts of the code more readable.
*/
export default class UserController 
{
    public async updateUser(accessToken: string, body: UserModel){
        await fetch(`${AuthConfig.API_URL}/User`,{
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });
    }

    public async GetTrackedStudentIds(accessToken: string){
        const res = await fetch(`${AuthConfig.API_URL}/User`,{
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        });
        return res.json();
    }

    public async UpdateTrackedStudents(accessToken: string, students: string){
        const response = await fetch(`${AuthConfig.API_URL}/User/${students}`,{
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        });        
        return response.ok ? true : false;
    }
}