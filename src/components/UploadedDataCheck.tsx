import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import { UploadContext } from '../context/UploadContext';
import UploadModel from '../models/UploadModel';

const columns: ColDef[] = [
  { field: 'user', headerName: 'User', width: 120},
  { field: 'studyLevel', headerName: 'Level of Study', width: 150 },
  { field: 'regStatus', headerName: 'Registration Status', width: 180 },
  { field: 'courseTitle', headerName: 'Course Title', width: 200 },
  { field: 'courseCode', headerName: 'Course Code', width: 140 },
  { field: 'teaching', headerName: 'Teaching Sessions', width: 180 },
  { field: 'attended', headerName: 'Attended', width: 120 },
  { field: 'explained', headerName: 'Explained Absences', width: 200 },
  { field: 'nonAttended', headerName: 'Non Attendance', width: 160 },
  { field: 'percentAttendance', headerName: '% Attendance', width: 150 },
  { field: 'unexcusedPercentAttendance', headerName: '% Attendance (Unexcused)', width: 230 },
  { field: 'lastAttendance', headerName: 'Last Attendance', width: 160 },
];

export default function UploadedDataCheck() {
  const [rows, setRows] = useState<UploadModel[]>([])
  const uploadContext = useContext(UploadContext);
  useEffect(() => {
      const newRows = uploadContext.uploadedData.map((row,i) => {
          return { 
            id: i+1, 
            user: row.user, 
            studyLevel: row.studyLevel, 
            courseYear: row.courseYear,
            regStatus: row.regStatus,
            courseTitle: row.courseTitle, 
            courseCode: row.courseCode,
            teaching: row.teaching, 
            attended: row.attended,
            explained: row.explained, 
            nonAttended: row.nonAttended,
            percentAttendance: parseInt((row.percentAttendance * 100).toFixed(2)),
            unexcusedPercentAttendance: parseInt((row.unexcusedPercentAttendance * 100).toFixed(2)),
            lastAttendance: row.lastAttendance, 
        }
      });
      setRows(newRows);
  },[])

  return (
    <div style={{ height: 400, width: '100%', marginBottom: '1rem' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} autoHeight hideFooterSelectedRowCount/>
    </div>
  );
}
