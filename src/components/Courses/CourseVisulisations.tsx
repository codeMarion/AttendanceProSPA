import { Box, ButtonBase, Card, Grid, Tooltip, Typography } from "@material-ui/core";
import { Fullscreen } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { CourseContext } from "../../context/CourseContext";
import GraphDialog from "./../GraphDialog";
import CourseBar from "./CourseBar";
import CoursePie from "./CoursePie";
import HeatMap from "./HeatMap";
import ScatterDiagram from "./ScatterDiagram";

function CourseVisulisations() {
  //States and contexts
  const coursesContext = useContext(CourseContext);
  const [bigGraph, setBigGraph] = useState("");
  const [graphTitle, setGraphTitle] = useState("")

  return (
    <>
    {bigGraph ? 
      <GraphDialog open={true} closeDialog={() => {
        setGraphTitle("");
        setBigGraph("")
        }} title={graphTitle} >
        {bigGraph === "pie" ?
        <div style={{ height: "29rem", width: "100%" }}>
          <CoursePie/>
        </div> 
        : bigGraph === "bar" ? 
        <div style={{ height: "29rem", width: "100%" }}>
          <CourseBar />
        </div> 
        : bigGraph === "heat" ? 
        <div style={{ height: "29rem", width: "100%" }}>
          <HeatMap/>
        </div> 
        : bigGraph === "scatter" ? 
        <div style={{ height: "29rem", width: "100%" }}>
          <ScatterDiagram />
        </div> 
        : <></>}
      </GraphDialog>
    :
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <Box style={{display: 'flex',justifyContent: 'flex-end'}}>
            <Tooltip title="Fullscreen">
            <ButtonBase onClick={() => {
              setGraphTitle("Attendance Statistics")
              setBigGraph("pie");
              }}>
                <Fullscreen />
            </ButtonBase>
            </Tooltip>
          </Box>
          <Typography variant="h5" align="center">Attendance Statistics</Typography>
          <div style={{ height: "19rem", width: "99%" }}>
            <CoursePie />
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
        <Box style={{display: 'flex',justifyContent: 'flex-end'}}>
        <Tooltip title="Fullscreen">
          <ButtonBase onClick={() => {
            setGraphTitle("Attendance Statistics By Year")
            setBigGraph("bar")
          }}>
            <Fullscreen />
          </ButtonBase>
        </Tooltip>
        </Box>
        <Typography variant="h5" align="center">Attendance Statistics By Year</Typography>
        <div style={{ height: "19rem", width: "99%" }}>
          <CourseBar />
        </div>
        </Card>
      </Grid>
      {coursesContext.selectedCourses.length > 0 ?
      <>
        <Grid item xs={12} md={6}>
          <Card>
          <Box style={{display: 'flex',justifyContent: 'flex-end'}}>
          <Tooltip title="Fullscreen">
            <ButtonBase onClick={() => {
              setBigGraph("heat");
              setGraphTitle("Course Attendance By Period")
            }}>
              <Fullscreen />
            </ButtonBase>
          </Tooltip>
          </Box>
          <Typography variant="h5" align="center">Course Attendance By Period</Typography>
          <div style={{ height: "19rem", width: "90%" }}>
            <HeatMap/>
          </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
          <Box style={{display: 'flex',justifyContent: 'flex-end'}}>
          <ButtonBase onClick={() => {
            setBigGraph("scatter")
            setGraphTitle("Student Attendance Distribution");  
          }}>
            <Tooltip title="Fullscreen">
              <Fullscreen />
            </Tooltip>
          </ButtonBase>
          </Box>
          <Typography variant="h5" align="center">Student Attendance Distribution</Typography>
          <div style={{ height: "19rem", width: "99%" }}>
            <ScatterDiagram />
          </div>
          </Card>
        </Grid>
      </> 
      : <></>
      }
    </Grid>
    }
    </>
  );
}

export default CourseVisulisations;
