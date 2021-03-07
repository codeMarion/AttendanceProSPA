import { useAuth0 } from "@auth0/auth0-react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Card, CardContent, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, Hidden, MenuItem, Select, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import StudentController from "../api/StudentController";
import Grad from '../assets/grad.png';
import AbsenceStartGraph from "../components/Home/AbsenceStartGraph";
import PersistentAbsenteesByCourse from "../components/Home/PersistentAbsenteesByCourse";
import PersistentAbsenteesByYearChart from "../components/Home/PersistentAbsenteesByYearChart";
import SmallInfo from "../components/Home/SmallInfo";
import StudentsTable from "../components/Home/StudentsTable";
import Loading from '../config/loading.json';
import { AppContext } from "../context/AppContext";

const Home = () => {

  const Auth0 = useAuth0();
  const studentController = new StudentController();
  const [studentCount, setStudentCount] = useState<number>();
  const [persistentAbsenteesCount, setPersistentAbsenteesCount] = useState<number>();
  const [averageAttendance, setAverageAttendance] = useState<number>();
  const [notAttendingStudents, setNotAttendingStudents] = useState<number>();
  const appContext = useContext(AppContext);
  useEffect(() => {
    getSmallCardData();
    getPersistentStudentsCount();
    getAverageAttendance();
    getNotAttendingStudentsCount();
  },[appContext.riskStudentThreshold]);

  const getSmallCardData = async() => {
    const token = await Auth0.getAccessTokenSilently();
    const response = await studentController.GetStudentCount("",[],token);
    setStudentCount(response);
  }

  async function getPersistentStudentsCount(){
    const token = await Auth0.getAccessTokenSilently();
    const count = await studentController.GetPersistentStudentsCount(token, appContext.riskStudentThreshold);
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
      {appContext.showThresholdDialog ? 
            <Dialog open={appContext.showThresholdDialog} onClose={() => appContext.setShowThresholdDialog(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Risk Student Levels</DialogTitle>
            <DialogContent style={{marginBottom: '10px'}}>
              <DialogContentText>
                Change Risk Students Level
              </DialogContentText>
              <Select
                style={{marginBottom: '10px'}}
                fullWidth
                onChange={(e:any) => {
                  appContext.setRiskStudentThreshold(e.target.value);
                  appContext.setShowThresholdDialog(false)
                }}
              >
                <MenuItem value={90}>90%</MenuItem>
                <MenuItem value={80}>80%</MenuItem>
                <MenuItem value={70}>70%</MenuItem>
                <MenuItem value={60}>60%</MenuItem>
              </Select>

              <Typography>Current Levels</Typography>
              <Typography>Critical: 0% - {appContext.riskStudentThreshold - 41}%</Typography>
              <Typography>Very Bad: {appContext.riskStudentThreshold - 40}% - {appContext.riskStudentThreshold - 21}%</Typography>
              <Typography>Bad: {appContext.riskStudentThreshold - 20}% - {appContext.riskStudentThreshold}%</Typography>
              </DialogContent>
          </Dialog>
      :
      <></>}
      {studentCount && averageAttendance && persistentAbsenteesCount && notAttendingStudents ?
          <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <SmallInfo
                title={"Total Students"}
                data={studentCount.toString()}
                imagesrc={Grad}
                color="lightblue"
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <SmallInfo
                title={"Avg. Attendance"}
                data={`${averageAttendance}%`}
                imagesrc={Grad}
                color="lightgreen"
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <SmallInfo
                title={"Risk Students"}
                data={persistentAbsenteesCount.toString()}
                imagesrc={Grad}
                color="#ffccba"
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <SmallInfo
                title={"Not Attending"}
                data={notAttendingStudents.toString()}
                imagesrc={Grad}
                color="pink"
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
          <Player
            autoplay
            loop
            src={Loading}
          >
          </Player>
        </div>
      }
    </>
  );
};

export default Home;
