import { useAuth0 } from '@auth0/auth0-react';
import { Box, Hidden, TableBody, TableCell, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import StudentController from '../../api/StudentController';
import StudentData from '../../models/StudentData';


interface StudentsTableBodyProps {
    page: number;
    persistentView: boolean;
}



function StudentsTableBody(props: StudentsTableBodyProps) {

    const Auth0 = useAuth0();
    const controller = new StudentController();
    const history = useHistory();
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        if(props.persistentView){
            GetPersistentStudents();
        }else{
            GetNotAttendingStudents();
        }
    },[props.page, props.persistentView])

    async function GetPersistentStudents(){
        const token = await Auth0.getAccessTokenSilently();
        const dbData = await controller.GetPersistentStudentsData(token, props.page);
        setData(dbData);
    }

    async function GetNotAttendingStudents(){
        const token = await Auth0.getAccessTokenSilently();
        const dbData = await controller.NonAttendingStudents(token, props.page);
        setData(dbData);
    }

    return (
        <TableBody>
                {data.map(item => (
                    <TableRow className="item-hover" onClick={() => history.push(`students/${item.userId}`)}>
                        <TableCell>
                            <Box>{item.userId}</Box>
                        </TableCell>
                        <TableCell>
                            <Box style={{whiteSpace: "nowrap",width: '80px',textOverflow: 'ellipsis', overflow: 'hidden'}}>{item.regStatus}</Box>
                        </TableCell>
                        <TableCell>
                            <Box style={{whiteSpace: "nowrap",width: '100px',textOverflow: 'ellipsis', overflow: 'hidden'}}>{item.courseTitle}</Box>
                        </TableCell>
                        <TableCell>
                            <Box style={{textAlign: 'center'}}>{Math.round(item.attendancePercentage * 100)}%</Box>
                        </TableCell>
                        <TableCell>
                            {item.attendancePercentage < 0.4 ?
                                <Box style={{textAlign: 'center',color: 'white',backgroundColor: 'red', borderRadius: 50}}>Critical</Box>
                                :
                                <Box style={{textAlign: 'center',color: 'white',backgroundColor: 'green', borderRadius: 50}}>Perfect</Box>
                            }
                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
    )
}

export default StudentsTableBody
