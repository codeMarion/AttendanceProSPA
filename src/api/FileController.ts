import AuthConfig from "../config/AuthConfig";
import UploadModel from "../models/UploadModel";

export default class FileController 
{
    public async uploadData(accessToken: string, body: UploadModel[]) : Promise<boolean> {
        while(body.length !== 0){
            const response = await fetch(`${AuthConfig.API_URL}/File`,{
                method: 'POST',
                body: JSON.stringify(body.slice(0,1000)),
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            if(!response.ok){
                return false;
            }else{
                body = body.slice(1000, body.length);
            }
        }
        return true;
    }
}