import { Table, Typography } from '@material-ui/core'
import React from 'react'
import StudentsTableBody from './StudentsTableBody'
import StudentsTableHeader from './StudentsTableHeader'

function StudentsTable() {
    return (
    <>
        <Typography>Persistent Absentees</Typography>
        <Table className="table">
            <StudentsTableHeader />
            <StudentsTableBody />
        </Table>
    </>
    )
}

export default StudentsTable
