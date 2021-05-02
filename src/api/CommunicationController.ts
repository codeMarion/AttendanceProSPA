import AuthConfig from "../config/AuthConfig";
import Email from "../models/Email";

/*
    This controller contains functions that fetches information from the Communication controller of the REST API. 
    The controller makes the other parts of the code more readable.
*/
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

    public async SendReminders(accessToken:string){
        const response = await fetch(`${AuthConfig.API_URL}/Communication/reminders`,{
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        });
        return response.ok;
    }
}