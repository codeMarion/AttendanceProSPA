import { useAuth0 } from "@auth0/auth0-react";
import { Box, ButtonBase, Typography } from "@material-ui/core";
import { SwapHoriz } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import StudentController from "../../api/StudentController";
import { AppContext } from "../../context/AppContext";

const PersistentAbsenteesByYearChart = () => {
  const Auth0 = useAuth0();
  const controller = new StudentController();
  const [data, setData] = useState([]);
  const [showPersistent, setShowPersistent] = useState(true);
  const appContext = useContext(AppContext);
  useEffect(() => {
    if(showPersistent){
      GetPersistentAbsentees();
    }else{
      GetNotAttendingAbsentees();
    }
  },[showPersistent,appContext.riskStudentThreshold])

  async function GetPersistentAbsentees(){
    const token = await Auth0.getAccessTokenSilently();
    let response = await controller.GetPersistentAbsenteesByYear(token, appContext.riskStudentThreshold);
    setData(response);
  }

  async function GetNotAttendingAbsentees(){
    const token = await Auth0.getAccessTokenSilently();
    let response = await controller.NonAttendingStudentsByYear(token);
    setData(response);
  }

  return (
    <>
      <Box style={{display: 'flex',justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <ButtonBase onClick={() => setShowPersistent(!showPersistent)}>
              <SwapHoriz/>
          </ButtonBase>
      </Box>
      <Typography align="center" variant="h5">{showPersistent ? 'Persistent Absentees' : 'Not Attending Students'} By Year</Typography>
      <div style={{ height: "23.3rem", width: "99%" }}>
        <ResponsiveContainer width="99%" height="99%">
          <BarChart
            barGap={5}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="year"/>
            <YAxis />
            <Tooltip labelStyle={{color: 'black'}} labelFormatter={(value: number) => `Year ${value}`}/>
            <Legend />
            <Bar dataKey={showPersistent ? 'persistentAbsenteesCount' : 'notAttendingStudents'} name={showPersistent ? "Persistent Absentees" : "Not Attending"} stackId="a" fill="#3182CE" />
            {showPersistent ?
            <Bar dataKey="attendingStudents" name={"Attending Students"} stackId="a" fill="#E53E3E" />
            :<></>}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default PersistentAbsenteesByYearChart;
