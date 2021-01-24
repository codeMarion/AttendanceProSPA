import AuthConfig from "../config/AuthConfig";
import UploadModel from "../models/UploadModel";

export default class FileController 
{
    public async uploadData(accessToken: string, body: UploadModel[]) : Promise<boolean> {
        const response = await fetch(`${AuthConfig.FUNCTIONS_URL}/File`,{
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