import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import StudentCard from "../components/StudentCard";
import Pagination from '@material-ui/lab/Pagination';
import StudentController from "../api/StudentController";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import StudentPage from "../models/StudentPage";
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from '@material-ui/core/CircularProgress';

const Students = () => {
  const Auth0 = useAuth0();
  const [pages, setPages] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [students, setStudents] = useState<StudentPage[]>();
  const controller = new StudentController();
  const appContext = useContext(AppContext);

  useEffect(() => {
    setPagesCount().then(() => GetStudents());
  },[appContext.searchBarValue]);

  useEffect(() => {
    GetStudents();
  },[currPage])

  const setPagesCount = async() => {
    const token = await Auth0.getAccessTokenSilently();
    setPages(Math.ceil(await controller.GetStudentCount(appContext.searchBarValue, token)/12))
  }
  
  const GetStudents = async() => {
    const token = await Auth0.getAccessTokenSilently();
    setStudents(await controller.GetStudentsPage(currPage, appContext.searchBarValue, token));
  }

  return (
    <>
    {students ? 
      <Grid container spacing={3}>
        <Grid xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <Typography variant="h4">Students</Typography>
        </Grid>
        {students.map(student => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StudentCard studentId={student.userId}/>
          </Grid>
        ))}
        <Grid xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <Pagination count={pages} variant="outlined" onChange={(event, value) => setCurrPage(value)}/>
        </Grid>
      </Grid>
    :
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} color="secondary">
        <CircularProgress size={100} />
      </div>
    }
    </>
  );
};

export default Students;