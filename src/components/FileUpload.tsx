import React, { useContext, useState } from 'react'
import "../styles/FileUpload.css";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as XLSX from 'xlsx';
import {parse, ParseResult} from 'papaparse';
import { Typography } from '@material-ui/core';
import { UploadContext } from '../context/UploadContext';
import UploadModel from '../models/UploadModel';

const dataHeaders = [
  "user",
  "studyLevel",
  "courseYear",
  "regStatus",
  "courseTitle",
  "courseCode",
  "teaching",
  "attended",
  "explained",
  "nonAttended",
  "percentAttendance",
  "unexcusedPercentAttendance",
  "lastAttendance"
];


function FileUpload() {
    const uploadContext = useContext(UploadContext)
    async function handleUpload(e: React.DragEvent){
        e.preventDefault();
        const file = await e.dataTransfer.files[0];
        if(file.name.split('.')[1] === 'csv'){
          let csv = await file.text();
          let csvRows = csv.split("\n");
          csvRows[0] = dataHeaders.join();
          csv = csvRows.join("\n");
          const parseResponse = parse(csv, {header:true}).data;
          const parsedData : UploadModel[] = parseResponse.map((row:any,i) => {
            const newRow : UploadModel = {
              id: i,
              userId: parseInt(row.user),
              studyLevel: row.studyLevel,
              courseYear: row.courseYear,
              regStatus: row.regStatus,
              courseTitle: row.courseTitle,
              courseCode: row.courseCode,
              teaching: parseInt(row.teaching),
              attended: parseInt(row.attended),
              explained: parseInt(row.explained),
              nonAttended: parseInt(row.nonAttended),
              percentAttendance: parseFloat(row.percentAttendance),
              unexcusedPercentAttendance: parseFloat(row.unexcusedPercentAttendance),
              lastAttendance: new Date(row.lastAttendance)
            }
            return newRow;
          });
          uploadContext.setUploadedData(parsedData)
        } else if(file.name.split('.')[1] === 'xls' || file.name.split('.')[1] === 'xlsx'){
          const reader = new FileReader();
          reader.onload = e => {
            let data = e.target?.result;
            let workbookData = XLSX.read(data, {type: 'binary', cellDates: true});
            const worksheet = workbookData.Sheets[workbookData.SheetNames[0]];
            let parsedData : UploadModel[] = XLSX.utils.sheet_to_json(worksheet , {header: dataHeaders, range:1});
            uploadContext.setUploadedData(parsedData)
          }
          reader.readAsBinaryString(file);
        }
      }
    return (
        <div className="upload"
          onDragOver={e => e.preventDefault()}
          onDrop={handleUpload}
        >
            <CloudUploadIcon fontSize="large"/>
            <Typography>{uploadContext.uploadedData.length === 0 ? "File not uploaded" : "File uploaded"}</Typography>            
        </div>
    )
}



export default FileUpload
