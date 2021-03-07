import { useAuth0 } from '@auth0/auth0-react';
import { Box, Hidden, TableBody, TableCell, TableRow } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import StudentController from '../../api/StudentController';
import { AppContext } from '../../context/AppContext';
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
    const appContext = useContext(AppContext);
    useEffect(() => {
        if(props.persistentView){
            GetPersistentStudents();
        }else{
            GetNotAttendingStudents();
        }
    },[props.page, props.persistentView,appContext.riskStudentThreshold])

    async function GetPersistentStudents(){
        const token = await Auth0.getAccessTokenSilently();
        const dbData = await controller.GetPersistentStudentsData(token, props.page + 1, appContext.riskStudentThreshold);
        setData(dbData);
    }

    async function GetNotAttendingStudents(){
        const token = await Auth0.getAccessTokenSilently();
        const dbData = await controller.NonAttendingStudents(token, props.page + 1);
        setData(dbData);
    }

    return (
        <TableBody>
                {data.map((item,i) => (
                    <TableRow key={i} className="item-hover" onClick={() => history.push(`students/${item.userId}`)}>
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
                            {item.attendancePercentage < appContext.riskStudentThreshold - 0.4 ?
                                <Box style={{textAlign: 'center',color: 'white',backgroundColor: 'red', borderRadius: 50}}>Critical</Box>
                            :item.attendancePercentage < appContext.riskStudentThreshold - 0.2 ?
                                <Box style={{textAlign: 'center',color: 'white',backgroundColor: '#FF1493', borderRadius: 50}}>Very Bad</Box>
                            :
                                <Box style={{textAlign: 'center',color: 'white',backgroundColor: '#FF4500', borderRadius: 50}}>Bad</Box>
                            }
                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
    )
}

export default StudentsTableBody
