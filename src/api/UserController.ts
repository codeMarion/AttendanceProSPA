import UserModel from "../models/UserModel";

export default class UserController 
{
    public async updateUser(accessToken: string, body: UserModel){
        await fetch('https://attendanceproapi.azurewebsites.net/User',{
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });
    }
}