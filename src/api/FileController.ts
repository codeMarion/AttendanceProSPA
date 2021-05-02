import AuthConfig from "../config/AuthConfig";
import UploadModel from "../models/UploadModel";

/*
    This controller contains functions that allows the application to communicate with the serverless function. 
    The controller makes the other parts of the code more readable.
*/
export default class FileController 
{
    public async uploadData(accessToken: string, body: UploadModel[]) : Promise<boolean> {
        const response = await fetch(`${AuthConfig.FUNCTIONS_URL}/api/UploadFile`,{
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });
        return response.ok;
    }
}