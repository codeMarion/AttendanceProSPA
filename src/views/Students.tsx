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
import StudentsStyles from "../styles/StudentsStyles";

const Students = () => {
  const classes = StudentsStyles();
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
        <Grid xs={12} className={classes.title}>
          <Typography variant="h4">Students</Typography>
        </Grid>
        {students.map(student => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StudentCard studentId={student.userId}/>
          </Grid>
        ))}
        <Grid xs={12} className={classes.pagination}>
          <Pagination count={pages} variant="outlined" onChange={(event, value) => setCurrPage(value)}/>
        </Grid>
      </Grid>
    :
      <div className={classes.loading} color="secondary">
        <CircularProgress size={100} />
      </div>
    }
    </>
  );
};

export default Students;