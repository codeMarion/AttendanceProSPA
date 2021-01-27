import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import AuthConfig from '../config/AuthConfig';
import StudentController from '../api/StudentController';
import Student from '../models/Student'
import { useAuth0 } from '@auth0/auth0-react';
function StudentPage(props:any) {
    const Auth0 = useAuth0();
    const controller = new StudentController();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState<Student>();

    useEffect(() => {
        
        fetchData();
    },[])

    async function fetchData(){
        
        const token = await Auth0.getAccessTokenSilently();
        const response = await controller.GetStudent(props.match.params.student, token);
        if(response){
            setData(await response)
        }else if(response == false){
            history.push("/students");
            enqueueSnackbar('Student not found!', { variant: "error" });
        }
    }
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}

export default StudentPage

