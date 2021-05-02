import React, { useContext, useEffect, useState } from 'react'
import { Box, ButtonBase, Table, TablePagination, Tooltip, Typography } from '@material-ui/core'
import StudentsTableBody from './StudentsTableBody'
import StudentsTableHeader from './StudentsTableHeader'
import { useAuth0 } from '@auth0/auth0-react';
import StudentController from '../../api/StudentController';
import { SwapHoriz } from '@material-ui/icons';
import { AppContext } from '../../context/AppContext';

function StudentsTable() {
    //States and contexts
    const [notAttendingStudents, setNotAttendingStudents] = useState<number>(0);
    const [page, setPage] = useState(0);
    const [absenceCount, setAbsenceCount] = useState(0);
    const [showPersistent, setShowPersistent] = useState(true);
    const Auth0 = useAuth0();
    const controller = new StudentController();
    const appContext = useContext(AppContext);

    //This lifecycle hook is triggered when the risk levels are updated or persistent state is changed
    useEffect(() => {
        GetPersistentStudents();
        GetNotAttendingStudentsCount();
    },[showPersistent,appContext.riskStudentThreshold])

    //This function retrieves persitent absentees from the backend 
    async function GetPersistentStudents(){
        setPage(0);
        const token = await Auth0.getAccessTokenSilently();
        const count = await controller.GetPersistentStudentsCount(token, appContext.riskStudentThreshold);
        setAbsenceCount(count);
    }
    
    //This function retrieves not attending students from the backend 
    async function GetNotAttendingStudentsCount(){
        setPage(0);
        const token = await Auth0.getAccessTokenSilently();
        const response = await controller.GetNotAttendingStudentsCount(token);
        setNotAttendingStudents(response);
    }
    
    return (
    <>
        <Box style={{display: 'flex',justifyContent: 'flex-end', alignItems: 'flex-end'}} onClick={() => setShowPersistent(!showPersistent)}>
            <Tooltip title={showPersistent ? 'Show Not Attending Students Table' : 'Show Persistent Absentees Table'}>
                <ButtonBase>
                    <SwapHoriz/>
                </ButtonBase>
            </Tooltip>
        </Box>
        <Typography align="center" variant="h5">{showPersistent ? 'Persistent Absentees' : 'Not Attending Students'}</Typography>
        <Table className="table" >
            <StudentsTableHeader />
            <StudentsTableBody page={page} persistentView={showPersistent}/>
        </Table>
        <TablePagination
            component="div"
            count={showPersistent ? absenceCount: notAttendingStudents}
            page={page}
            onChangePage={(event, page) => setPage(page)}
            rowsPerPage={5}
            rowsPerPageOptions={[]}
        />
    </>
    )
}

export default StudentsTable
