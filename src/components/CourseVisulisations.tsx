import { useAuth0 } from "@auth0/auth0-react";
import { Box, ButtonBase, Card, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CourseController from "../api/CourseController";
import CourseResponse from "../models/CourseResponse";
import percentRound from "percent-round";
import AbsenceReasonsResponse from "../models/AbsenceReasonsResponse";
import CoursePie from "./CoursePie";
import CourseBar from "./CourseBar";
import PieProps from "../models/PieProps";
import BarProps from "../models/BarProps";
import HeatMap from "./HeatMap";
import ScatterDiagram from "./ScatterDiagram";
import ScatterProps from "../models/ScatterProps";
import { AspectRatio, Fullscreen } from "@material-ui/icons";
import GraphDialog from "./GraphDialog";

interface CourseVisulisationsProps {
  courses: CourseResponse[];
}

function CourseVisulisations(props: CourseVisulisationsProps) {
  const [pieData, setPieData] = useState<PieProps[]>([
    {id: "Attended", label: "Attended", value: 0, color: "hsl(174, 70%, 50%)"},
    {id: "Non-Attended", label: "Non-Attended", value: 0, color: "hsl(254, 70%, 50%)"},
    {id: "Explained", label: "Explained", value: 0, color: "hsl(234, 70%, 50%)"},
  ]);
  const [barData, setBarData] = useState<BarProps[]>([]);
  const [heatMapProps, setHeatMapProps] = useState<{course: string, attended: number[]}[]>([]);
  const [scatterProps, setScatterProps] = useState<ScatterProps[]>([]);
  const [bigGraph, setBigGraph] = useState("");
  const Auth0 = useAuth0();
  const controller = new CourseController();

  useEffect(() => {
    GetAbsenceReasons();
    GetAttendanceByPeriod();
    getAttendedByTeachingSessionsData();
  }, [props.courses]);

  async function GetAbsenceReasons() {
    const token = await Auth0.getAccessTokenSilently();
    const res: AbsenceReasonsResponse = await controller.GetAbsenceData(
      props.courses.map((el) => el.courseCode),
      token
    );
    const piePercentages = percentRound([res.overall.attended, res.overall.nonAttended, res.overall.explained]);
    const newPieData = [...pieData];
    newPieData[0].value = piePercentages[0];
    newPieData[1].value = piePercentages[1];
    newPieData[2].value = piePercentages[2];
    setPieData(newPieData);
    const newBarData : BarProps[] = []
    res.absenceReasons.map(reason => {
      newBarData.push({year: reason.year.toString(), attendance: reason.attended / reason.teaching})
    });
    const barPercentages = percentRound(newBarData.map(item => item.attendance));
    barPercentages.map((percent,i) => {
      newBarData[i].attendance = percent;
    });
    setBarData(newBarData);
  }

  async function GetAttendanceByPeriod(){
    const token = await Auth0.getAccessTokenSilently();
    const res: {course: string, attended: number[]}[] = await controller.GetAttendanceByPeriod(
      props.courses.map((el) => el.courseCode),
      token
    );
    setHeatMapProps(res);
  }

  async function getAttendedByTeachingSessionsData() {
    const token = await Auth0.getAccessTokenSilently();
    const res = await controller.getAttendedByTeachingSessionsData(
        props.courses.map((el) => el.courseCode),
        token
    );
    const arr : ScatterProps[] = []
    res.map((course:any) => {
      const obj : ScatterProps = {
        id: course.course,
        data: course.attendanceData.map((record : any) => {
            return {
              x: record.attended,
              y: record.teaching
            }
        })
      }
      arr.push(obj);
    })
    setScatterProps(arr);
  }

  return (
    <>
    {bigGraph ? 
      <GraphDialog open={true} closeDialog={() => setBigGraph("")}>
        {bigGraph === "pie" ?
        <div style={{ height: "29rem", width: "100%" }}>
          <CoursePie data={pieData} />
        </div> 
        : bigGraph === "bar" ? 
        <div style={{ height: "29rem", width: "100%" }}>
          <CourseBar data={barData}/>
        </div> 
        : bigGraph === "heat" ? 
        <div style={{ height: "29rem", width: "100%" }}>
          {heatMapProps.length > 0 ?<HeatMap data={heatMapProps}/> : <></>}
        </div> 
        : bigGraph === "scatter" ? 
        <div style={{ height: "29rem", width: "100%" }}>
          <ScatterDiagram data={scatterProps}/>
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
            <CoursePie data={pieData} />
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
          <CourseBar data={barData}/>
        </div>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
        <Box style={{display: 'flex',justifyContent: 'flex-end'}}>
          <ButtonBase onClick={() => setBigGraph("heat")}>
            <Fullscreen />
          </ButtonBase>
        </Box>
        <div style={{ height: "19rem", width: "100%" }}>
          {heatMapProps.length > 0 ?<HeatMap data={heatMapProps}/> : <></>}
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
          <ScatterDiagram data={scatterProps}/>
        </div>
        </Card>
      </Grid>
    </Grid>
    }
    </>
  );
}

export default CourseVisulisations;
