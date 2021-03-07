import { useAuth0 } from "@auth0/auth0-react";
import { ResponsiveHeatMapCanvas } from "@nivo/heatmap";
import React, { useContext, useEffect, useState } from "react";
import CourseController from "../../api/CourseController";
import { CourseContext } from "../../context/CourseContext";

function HeatMap() {
  const Auth0 = useAuth0();
  const controller = new CourseController();
  const coursesContext = useContext(CourseContext);
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    GetChartData();
  }, [coursesContext.selectedCourses]);

  async function GetChartData() {
    const token = await Auth0.getAccessTokenSilently();
    const res: {
      course: string;
      attended: number[];
    }[] = await controller.GetAttendanceByPeriod(
      coursesContext.selectedCourses.map((el) => el.courseCode),
      token
    );
    const newData: any = [];
    res.map((item) => {
      const dataPoint: any = { course: item.course };
      item.attended.map((score, i) => {
        dataPoint[i + 1] = score;
      });
      newData.push(dataPoint);
    });
    setChartData(newData);
  }

  function getHeatMapKeys(): string[] {
    const keys: string[] = [];
    if (chartData.length > 0) {
      for (let i = 1; i < Object.keys(chartData[0]).length; i++) {
        keys.push(i.toString());
      }
    }
    return keys;
  }

  return (
    <ResponsiveHeatMapCanvas
      data={chartData}
      keys={getHeatMapKeys()}
      indexBy="course"
      margin={{ top: 60, right: 10, bottom: 60, left: 70 }}
      pixelRatio={1.25}
      minValue="auto"
      maxValue="auto"
      forceSquare={false}
      sizeVariation={0}
      padding={0}
      colors="YlOrRd"
      axisTop={{
        orient: "top",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: 36,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableGridX={false}
      enableGridY={true}
      cellOpacity={1}
      cellBorderWidth={0}
      cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
      enableLabels={false}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
      isInteractive={true}
      hoverTarget="rowColumn"
      cellHoverOpacity={1}
      cellHoverOthersOpacity={0.5}
    />
  );
}

export default HeatMap;
