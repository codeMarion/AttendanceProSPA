import AuthConfig from "../config/AuthConfig";
import UserModel from "../models/UserModel";

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
}