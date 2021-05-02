import { TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

/*
    This component is used as a table header for the rendered table(persitent absentees and not attending students)
*/
function StudentsTableHeader() {
    return (
        <TableHead>
            <TableRow>
            <TableCell align="left">Student ID</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Course</TableCell>
            <TableCell align="left">Attendance</TableCell>
            <TableCell align="left">Ranking</TableCell>
            </TableRow>
        </TableHead>
    )
}

export default StudentsTableHeader
