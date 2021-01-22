import AuthConfig from "../config/AuthConfig";
import UploadModel from "../models/UploadModel";

export default class FileController 
{
    public async uploadData(accessToken: string, body: UploadModel[]){
        await fetch(`${AuthConfig.API_URL}/File`,{
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });
    }
}