import { useAuth0 } from "@auth0/auth0-react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Box, ButtonBase, Card, CardContent, CircularProgress, Grid, Hidden, Typography } from "@material-ui/core";
import { SwapHoriz } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import StudentController from "../api/StudentController";
import AbsenceStartGraph from "../components/Home/AbsenceStartGraph";
import PersistentAbsenteesByCourse from "../components/Home/PersistentAbsenteesByCourse";
import PersistentAbsenteesByYearChart from "../components/Home/PersistentAbsenteesByYearChart";
import SmallInfo from "../components/Home/SmallInfo";
import StudentsTable from "../components/Home/StudentsTable";

const Home = () => {

  const Auth0 = useAuth0();
  const studentController = new StudentController();
  const [studentCount, setStudentCount] = useState<number>();
  const [persistentAbsenteesCount, setPersistentAbsenteesCount] = useState<number>();
  const [averageAttendance, setAverageAttendance] = useState<number>();
  const [notAttendingStudents, setNotAttendingStudents] = useState<number>();
  useEffect(() => {
    getSmallCardData();
    getPersistentStudentsCount();
    getAverageAttendance();
    getNotAttendingStudentsCount();
  },[]);

  const getSmallCardData = async() => {
    const token = await Auth0.getAccessTokenSilently();
    const response = await studentController.GetStudentCount("",[],token);
    setStudentCount(response);
  }

  async function getPersistentStudentsCount(){
    const token = await Auth0.getAccessTokenSilently();
    const count = await studentController.GetPersistentStudentsCount(token);
    setPersistentAbsenteesCount(count);
  }

  async function getAverageAttendance(){
    const token = await Auth0.getAccessTokenSilently();
    const response = await studentController.GetAverageAttendance(token);
    setAverageAttendance(Math.ceil((response.attended/response.sessions)*100));
  }

  async function getNotAttendingStudentsCount(){
    const token = await Auth0.getAccessTokenSilently();
    const response = await studentController.GetNotAttendingStudentsCount(token);
    setNotAttendingStudents(response);
  }

  return (
    <>
      {studentCount && averageAttendance && persistentAbsenteesCount && notAttendingStudents ?
          <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <SmallInfo
                title={"Total Students"}
                data={studentCount.toString()}
                imagesrc={'https://img.icons8.com/color/48/000000/student-male--v1.png'}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <SmallInfo
                title={"Avg. Attendance"}
                data={`${averageAttendance}%`}
                imagesrc={'https://img.icons8.com/color/48/000000/student-male--v1.png'}
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <SmallInfo
                title={"Risk Students"}
                data={persistentAbsenteesCount.toString()}
                imagesrc={'https://img.icons8.com/color/48/000000/student-male--v1.png'}
                // imagesrc={'https://img.icons8.com/color/48/000000/university.png'}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <SmallInfo
                title={"Not Attending"}
                data={notAttendingStudents.toString()}
                imagesrc={'https://img.icons8.com/color/48/000000/homework.png'}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Hidden smDown>
              <Card>
                <CardContent>
                    <StudentsTable />
                </CardContent>
              </Card>
              </Hidden>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card>
                <CardContent>
                  <PersistentAbsenteesByYearChart />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">Absence Starting Graph</Typography>
                  <AbsenceStartGraph />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">Persistent Absentees by Course</Typography>
                  <PersistentAbsenteesByCourse />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>:        
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} color="secondary">
          <CircularProgress size={100} />
        </div>
      }
    </>
  );
};

export default Home;
