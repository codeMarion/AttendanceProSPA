import React, { useEffect, useState } from "react";
import { Box, ButtonBase, Chip, Divider, Drawer, Grid, TextField, Typography } from "@material-ui/core";
import StudentCard from "../components/Students/StudentCard";
import Pagination from '@material-ui/lab/Pagination';
import StudentController from "../api/StudentController";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import StudentPage from "../models/StudentPage";
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from '@material-ui/core/CircularProgress';
import StudentsStyles from "../styles/StudentsStyles";
import FilterIcon from "../assets/FilterIcon";
import { Autocomplete } from "@material-ui/lab";
import CourseResponse from "../models/CourseResponse";
import CourseController from "../api/CourseController";

const Students = () => {
  const classes = StudentsStyles();
  const Auth0 = useAuth0();
  const [pages, setPages] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [students, setStudents] = useState<StudentPage[]>();
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [chipData, setChipData] = useState<CourseResponse[]>([]);
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const controller = new StudentController();
  const courseController = new CourseController();
  const appContext = useContext(AppContext);

  useEffect(() => {
    setPagesCount().then(() => GetStudents());
  },[appContext.searchBarValue, chipData]);
  
  useEffect(() => {
    GetCourses();
    GetStudents();
  },[currPage,chipData])

  const setPagesCount = async() => {
    const token = await Auth0.getAccessTokenSilently();
    setPages(Math.ceil(await controller.GetStudentCount(appContext.searchBarValue, chipData, token)/12))
  }
  
  const GetStudents = async() => {
    const token = await Auth0.getAccessTokenSilently();
    setStudents(await controller.GetStudentsPage(currPage, appContext.searchBarValue, chipData, token));
  }

  const GetCourses = async () => {
    const token = await Auth0.getAccessTokenSilently();
    setCourses(await courseController.GetAllCourses(token));
  };

  const handleCourseFilter = (course: CourseResponse | null) => {
    if(course){
      setChipData(chipData => [...chipData, course]);      
      setTextInput('');
    }
  };
  
  const handleChipDelete = (course: CourseResponse) => {
    setChipData(chipData.filter(c => c.courseCode !== course.courseCode));
  };

  return (
    <>
    {students ? 
      <>
        <Grid container spacing={3}>
          <Grid xs={12} className={classes.title}>
            <Typography variant="h4">Students</Typography>
          </Grid>
          <Grid xs={12}>
              <ButtonBase onClick={() => setFilterDrawer(true)}>
                <FilterIcon />
              </ButtonBase>
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
        <Drawer variant="temporary" anchor={"right"} 
        open={filterDrawer} 
        classes={{paper: classes.drawerPaper}} 
        onClose={() => setFilterDrawer(false)} 
      >
        <Grid >
          <Grid xs={12} className={classes.filterStudentsTitle}>
            <Typography variant="h5" align="center">Filter Students by Course</Typography>
          </Grid>
          <Grid container xs={12} className={classes.search}>
            <Autocomplete
              options={courses}
              getOptionLabel={(course) => course.courseTitle}
              className={classes.autoComplete}
              onChange={(event, value, reason) => handleCourseFilter(value ?? null)}
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
      <div className={classes.loading} color="secondary">
        <CircularProgress size={100} />
      </div>
    }
    </>
  );
};

export default Students;