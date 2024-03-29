import { useAuth0 } from "@auth0/auth0-react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Box, ButtonBase, Chip, Divider, Drawer, FormControlLabel, FormGroup, Grid, Switch, TextField, Tooltip, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Pagination from '@material-ui/lab/Pagination';
import React, { useContext, useEffect, useState } from "react";
import CourseController from "../api/CourseController";
import StudentController from "../api/StudentController";
import UserController from "../api/UserController";
import FilterIcon from "../assets/FilterIcon";
import StudentCard from "../components/Students/StudentCard";
import Loading from '../config/loading.json';
import NoResults from '../config/no-results.json';
import { AppContext } from "../context/AppContext";
import CourseResponse from "../models/CourseResponse";
import StudentPage from "../models/StudentPage";
import StudentsStyles from "../styles/StudentsStyles";

const Students = () => {
  //States and contexts
  const classes = StudentsStyles();
  const Auth0 = useAuth0();
  const [pages, setPages] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [students, setStudents] = useState<StudentPage[]>();
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [chipData, setChipData] = useState<CourseResponse[]>([]);
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [showTrackedStudents, setShowTrackedStudents] = useState(false);
  const [showPaginator, setShowPaginator] = useState(true);
  const controller = new StudentController();
  const courseController = new CourseController();
  const userController = new UserController();
  const appContext = useContext(AppContext);
  

  //This lifecycle hook is triggered when course filters have been updated or the contents of the global search bar have been changed.
  useEffect(() => {
    setPagesCount().then(() => GetStudents());
  },[appContext.searchBarValue, chipData]);
  
  //This lifecycle hook is triggered when the page is changed or course filters have been updated.
  useEffect(() => {
    GetStudents();
  },[currPage,chipData])

  //This lifecycle hook is triggered on first load
  useEffect(() => {
    GetCourses();
  },[])

  //This function makes a HTTP request to retrieve the number of students through the controller and response is stored in the relevant state. 
  const setPagesCount = async() => {
    const token = await Auth0.getAccessTokenSilently();
    setPages(Math.ceil(await controller.GetStudentCount(appContext.searchBarValue, chipData, token)/12))
  }
  
  //This function makes a HTTP request to retrieve the students data of a specific page through the controller and response is stored in the relevant state. 
  const GetStudents = async() => {
    const token = await Auth0.getAccessTokenSilently();
    setStudents(await controller.GetStudentsPage(currPage, appContext.searchBarValue, chipData, token));
  }

  //This function makes a HTTP request to retrieve the courses through the controller and response is stored in the relevant state. 
  const GetCourses = async () => {
    const token = await Auth0.getAccessTokenSilently();
    setCourses(await courseController.GetAllCourses(token));
  };

  //This function is triggered when course filters are updated to change the courses that are displayed to the user
  const handleCourseFilter = (course: CourseResponse | null) => {
    if(course){
      const newCourses = courses?.filter(
        (c) => c.courseCode !== course.courseCode
      );
      setCourses(newCourses);
      setChipData(chipData => [...chipData, course]);      
      setTextInput('');
    }
  };
  
  //This function is triggered when a user tries to remove a course from the filter.
  const handleChipDelete = (course: CourseResponse) => {
    setCourses([course,...courses]);
    setChipData(chipData.filter(c => c.courseCode !== course.courseCode));
  };

  //This function makes a request to retrieve the students that the logged in user is tracking and the response is stored in the relevant state. 
  const GetTrackedStudents = async() => {
    const status = showTrackedStudents;
    setShowTrackedStudents(!showTrackedStudents);
    const token = await Auth0.getAccessTokenSilently();
    setCurrPage(1)
    if(status){
      setShowPaginator(true);
      setPagesCount();
      setStudents(await controller.GetStudentsPage(1, appContext.searchBarValue, chipData, token));
    }else{
      const user = await userController.GetTrackedStudentIds(token);
      const ids : string = await user.metadata.students;
      if(ids !== "" && ids !== null){
          const idsArr = ids.split(',').filter(id => id !== "");
          appContext.setTrackedStudentIds(idsArr);
          const trackedStudents = await controller.GetTrackedStudents(token,idsArr);
          setStudents(trackedStudents);
      }
      else{
        setPages(1)
        setStudents([]);
      }
      setShowPaginator(false);
    }
  }

  return (
    <>
    {students ? 
      <>
        <Grid container spacing={3}>
          <Grid xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
            <ButtonBase onClick={() => setFilterDrawer(true)}>
                {!showTrackedStudents ? 
                <Tooltip title="Filtering options">
                  <Box>
                    <FilterIcon />
                  </Box>
                </Tooltip>
                : <></>}
            </ButtonBase>
          </Grid>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h4">{showTrackedStudents ? 'Tracked Students' : 'Students'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
                <FormControlLabel
                  label="Tracked Students"
                  control={<Switch size="small" checked={showTrackedStudents} onChange={GetTrackedStudents} />}
                />
            </FormGroup>
          </Grid>
          {students.length === 0 ?
            <Grid xs={12}>
              <Player
                autoplay
                loop
                src={NoResults}
                style={{ height: '300px', width: '300px' }}
              >
              </Player>
              <Typography align="center">No students found</Typography>
            </Grid>
          :
            <>
              {students.map((student,i) => (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <StudentCard studentId={student.userId}/>
                </Grid>
              ))}
            </>          
          }
          {showPaginator ? 
          <Grid item xs={12} className={classes.pagination}>
            <Pagination count={pages} variant="outlined" onChange={(event, value) => setCurrPage(value)}/>
          </Grid>
          : <></> }
        </Grid>
        <Drawer variant="temporary" anchor={"right"} 
        open={filterDrawer} 
        classes={{paper: classes.drawerPaper}} 
        onClose={() => setFilterDrawer(false)} 
      >
        <Grid >
          <Grid item xs={12} className={classes.filterStudentsTitle}>
            <Typography variant="h5" align="center">Filter Students by Course</Typography>
          </Grid>
          <Grid item xs={12} className={classes.search}>
            <Autocomplete
              options={courses}
              getOptionLabel={(course) => course.courseTitle}
              className={classes.autoComplete}
              onChange={(event, value, reason) => handleCourseFilter(value ?? null)}
              onInputChange={(event, value, reason) => {
                if(reason === "input"){
                  setTextInput(value)
                }
              }}
              renderInput={(params) => 
                (
                  <TextField {...params} label="Courses" variant="outlined" />
                )}
              inputValue={textInput}
            />
          </Grid>
          <Divider />
          <Box className={classes.chips}>
            {chipData.map((course) => (
              <Chip label={course.courseTitle} className={classes.chipStyle}  onDelete={() => handleChipDelete(course)} />
              ))}
          </Box>
        </Grid>
      </Drawer>
      </>
    :
      // Loading animation 
      <div className={classes.loading} color="secondary">
          <Player
            autoplay
            loop
            src={Loading}
            style={{ height: '40%', width: '40%' }}
          >
          </Player>
      </div>
    }
    </>
  );
};

export default Students;