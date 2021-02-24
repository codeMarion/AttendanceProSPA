import React, { useEffect, useState } from 'react'
import { Box, ButtonBase, Table, TablePagination, Typography } from '@material-ui/core'
import StudentsTableBody from './StudentsTableBody'
import StudentsTableHeader from './StudentsTableHeader'
import { useAuth0 } from '@auth0/auth0-react';
import StudentController from '../../api/StudentController';
import { SwapHoriz } from '@material-ui/icons';

function StudentsTable() {
    const [notAttendingStudents, setNotAttendingStudents] = useState<number>(0);
    const [page, setPage] = useState(0);
    const [absenceCount, setAbsenceCount] = useState(0);
    const [showPersistent, setShowPersistent] = useState(true);
    const Auth0 = useAuth0();
    const controller = new StudentController();
    useEffect(() => {
        GetPersistentStudents();
        GetNotAttendingStudentsCount();
    },[])

    async function GetPersistentStudents(){
        const token = await Auth0.getAccessTokenSilently();
        const count = await controller.GetPersistentStudentsCount(token);
        setAbsenceCount(count);
    }

    async function GetNotAttendingStudentsCount(){
        const token = await Auth0.getAccessTokenSilently();
        const response = await controller.GetNotAttendingStudentsCount(token);
        setNotAttendingStudents(response);
    }
    
    return (
    <>
        <Box style={{display: 'flex',justifyContent: 'flex-end', alignItems: 'flex-end'}} onClick={() => setShowPersistent(!showPersistent)}>
            <ButtonBase>
                <SwapHoriz/>
            </ButtonBase>
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
