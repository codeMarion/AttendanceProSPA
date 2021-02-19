import { Box, TableBody, TableCell, TableRow } from '@material-ui/core'
import React from 'react'

const data = [
    {
        id: "181283",
        status: "Registered",
        course: "CompSci",
        attendance: 95,
        ranking: "Critical"
    },
    {
        id: "181379",
        status: "Registered",
        course: "CompSci & AI",
        attendance: 95,
        ranking: "Perfect"
    },
    {
        id: "181326",
        status: "Registered",
        course: "CompSci",
        attendance: 95,
        ranking: "Critical"
    }
]

function StudentsTableBody() {
    return (
        <TableBody>
                {data.map(item => (
                    <TableRow className="item-hover">
                        <TableCell>
                            <Box>{item.id}</Box>
                        </TableCell>
                        <TableCell>
                            <Box>{item.status}</Box>
                        </TableCell>
                        <TableCell>
                            <Box>{item.course}</Box>
                        </TableCell>
                        <TableCell>
                            <Box style={{textAlign: 'center'}}>{item.attendance}%</Box>
                        </TableCell>
                        <TableCell>
                            <Box style={{textAlign: 'center',color: 'white',backgroundColor: item.ranking === 'Critical' ? 'red' : 'green', borderRadius: 50}}>{item.ranking}</Box>
                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
    )
}

export default StudentsTableBody
