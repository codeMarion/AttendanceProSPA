import { Card, CardContent, Grid } from "@material-ui/core";
import React from "react";
import SmallInfo from "../components/Home/SmallInfo";
import StudentsTable from "../components/Home/StudentsTable";

const Home = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SmallInfo
            title={"Total Students"}
            data={"5401"}
            imagesrc={'https://img.icons8.com/color/48/000000/student-male--v1.png'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SmallInfo
            title={"Total Courses"}
            data={"5401"}
            imagesrc={'https://img.icons8.com/color/48/000000/homework.png'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SmallInfo
            title={"Total Students"}
            data={"5401"}
            imagesrc={'https://img.icons8.com/color/48/000000/university.png'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SmallInfo
            title={"Total Students"}
            data={"5401"}
            imagesrc={'https://img.icons8.com/color/48/000000/student-male--v1.png'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={{ height: "15rem" }}>
            <CardContent>
              <h1>Persistent Absentees by Course</h1>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={{ height: "15rem" }}>
            <CardContent>
              <h1>Persistent Absentees by Year</h1>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={{ height: "17.5rem" }}>
            <CardContent>
              <h1>Absence Starting Graph</h1>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
                <StudentsTable />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
