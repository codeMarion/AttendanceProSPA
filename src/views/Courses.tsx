import { useAuth0 } from "@auth0/auth0-react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Box, ButtonBase, Chip, Divider, Drawer, Grid, TextField, Tooltip, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useContext, useEffect, useState } from "react";
import CourseController from "../api/CourseController";
import FilterIcon from "../assets/FilterIcon";
import CourseVisulisations from "../components/Courses/CourseVisulisations";
import Loading from '../config/loading.json';
import { CourseContext } from "../context/CourseContext";
import CourseResponse from "../models/CourseResponse";
import CoursesStyles from "../styles/CoursesStyles";

const Students = () => {
  const classes = CoursesStyles();
  const Auth0 = useAuth0();
  const coursesContext = useContext(CourseContext);
  const controller = new CourseController();
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [courses, setCourses] = useState<CourseResponse[]>();

  useEffect(() => {
    GetCourses();
  }, []);

  const GetCourses = async () => {
    const token = await Auth0.getAccessTokenSilently();
    setCourses(await controller.GetAllCourses(token));
  };

  const handleCourseFilter = (course: CourseResponse | null) => {
    if (course) {
      const newCourses = courses?.filter(
        (c) => c.courseCode !== course.courseCode
      );
      setCourses(newCourses);
      let chipData = [...coursesContext.selectedCourses]
      chipData.push(course);
      coursesContext.setSelectedCourses(chipData);
      setTextInput("");
    }
  };

  const handleChipDelete = (course: CourseResponse) => {
    let chipData = [...coursesContext.selectedCourses]
    chipData = chipData.filter(c => c.courseCode !== course.courseCode)
    coursesContext.setSelectedCourses(chipData);
    let courseArr = [course];
    let newCourses = [...courses!];
    newCourses = courseArr.concat(newCourses);
    setCourses(newCourses);
  };

  return (
    <>
      {courses ? (
        <Grid container spacing={3}>
          <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Tooltip title="Filtering options">
            <ButtonBase onClick={() => setFilterDrawer(true)}>
              <FilterIcon />
            </ButtonBase>
          </Tooltip>
          </Grid>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h4">Courses</Typography>
          </Grid>

          <Drawer variant="temporary" anchor={"right"} 
            open={filterDrawer} 
            classes={{paper: classes.drawerPaper}} 
            onClose={() => setFilterDrawer(false)} 
          >
            <Grid >
              <Grid item xs={12} className={classes.filterCoursesTitle}>
                <Typography variant="h5" align="center">Filter Courses</Typography>
              </Grid>
              <Grid item xs={12} className={classes.search}>
                <Autocomplete
                  options={courses}
                  getOptionLabel={(course) => course.courseTitle}
                  className={classes.autoComplete}
                  onChange={(event, value, reason) => handleCourseFilter(value ?? null)}
                  renderInput={(params) => 
                    (
                      <TextField {...params} label="Courses" variant="outlined" />
                    )}
                  // inputValue={textInput}
                />
              </Grid>
              <Divider />
              <Box className={classes.chips}>
                {coursesContext.selectedCourses.map((course) => (
                  <Chip label={course.courseTitle} className={classes.chipStyle}  onDelete={() => handleChipDelete(course)} />
                  ))}
              </Box>
            </Grid>
          </Drawer>
          <CourseVisulisations/>
        </Grid>
      ) : (
        <div className={classes.loading} color="secondary">
          <Player
            autoplay
            loop
            src={Loading}
          >
          </Player>
        </div>
      )}
    </>
  );
};

export default Students;
