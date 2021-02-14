import { Box, ButtonBase, Card, Grid } from "@material-ui/core";
import React, { useContext, useState } from "react";
import CoursePie from "./CoursePie";
import CourseBar from "./CourseBar";
import HeatMap from "./HeatMap";
import ScatterDiagram from "./ScatterDiagram";
import { Fullscreen } from "@material-ui/icons";
import GraphDialog from "./GraphDialog";
import { CourseContext } from "../context/CourseContext";

function CourseVisulisations() {
  const coursesContext = useContext(CourseContext);
  const [bigGraph, setBigGraph] = useState("");

  return (
    <>
    {bigGraph ? 
      <GraphDialog open={true} closeDialog={() => setBigGraph("")}>
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
            <ButtonBase onClick={() => setBigGraph("pie")}>
              <Fullscreen />
            </ButtonBase>
          </Box>
          <div style={{ height: "19rem", width: "100%" }}>
            <CoursePie />
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
        <Box style={{display: 'flex',justifyContent: 'flex-end'}}>
        <ButtonBase onClick={() => setBigGraph("bar")}>
          <Fullscreen />
        </ButtonBase>
        </Box>
        <div style={{ height: "19rem", width: "100%" }}>
          <CourseBar />
        </div>
        </Card>
      </Grid>
      {coursesContext.selectedCourses.length > 0 ?
      <>
        <Grid item xs={12} md={6}>
          <Card>
          <Box style={{display: 'flex',justifyContent: 'flex-end'}}>
            <ButtonBase onClick={() => setBigGraph("heat")}>
              <Fullscreen />
            </ButtonBase>
          </Box>
          <div style={{ height: "19rem", width: "90%" }}>
            <HeatMap/>
          </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
          <Box style={{display: 'flex',justifyContent: 'flex-end'}}>
          <ButtonBase onClick={() => setBigGraph("scatter")}>
            <Fullscreen />
          </ButtonBase>
          </Box>
          <div style={{ height: "19rem", width: "100%" }}>
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
