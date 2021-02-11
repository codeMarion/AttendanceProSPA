import AuthConfig from "../config/AuthConfig";
import Email from "../models/Email";

export default class CommunicationController 
{
    public async GetConversations(accessToken: string, email:string) {
        const response = await fetch(`${AuthConfig.API_URL}/Communication/${email}`,{
            headers: { 
                "Authorization":`Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        return data;
    }

    public async SendEmail(accessToken:string, email:Email){
        const response = await fetch(`${AuthConfig.API_URL}/Communication/send`,{
            method: 'POST',
            body: JSON.stringify(email),
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });
        return response.ok;
    }
}