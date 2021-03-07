import { useAuth0 } from '@auth0/auth0-react';
import { ResponsivePie } from '@nivo/pie';
import percentRound from 'percent-round';
import React, { useContext, useEffect, useState } from 'react';
import CourseController from '../../api/CourseController';
import { CourseContext } from '../../context/CourseContext';
import AbsenceReasonsResponse from '../../models/AbsenceReasonsResponse';
import PieProps from '../../models/PieProps';

function CoursePie() {
    const Auth0 = useAuth0();
    const controller = new CourseController();
    const coursesContext = useContext(CourseContext)
    const [data, setData] = useState<PieProps[]>([
      {id: "Attended", label: "Attended", value: 0, color: "hsl(174, 70%, 50%)"},
      {id: "Non-Attended", label: "Non-Attended", value: 0, color: "hsl(254, 70%, 50%)"},
      {id: "Explained", label: "Explained", value: 0, color: "hsl(234, 70%, 50%)"},
    ])
    const colors : any = { 'Non-Attended': 'rgb(228, 26, 28)', 'Explained': 'rgb(31, 119, 180)', 'Attended': 'rgb(44, 160, 44)' }

    useEffect(() => {
      getChartData();
    },[coursesContext.selectedCourses])

    async function getChartData(){
      const token = await Auth0.getAccessTokenSilently();
      const res: AbsenceReasonsResponse = await controller.GetAbsenceData(
        coursesContext.selectedCourses.map((el) => el.courseCode),
        token
      );
      const piePercentages = percentRound([res.overall.attended, res.overall.nonAttended, res.overall.explained]);
      const newPieData = [...data];
      newPieData[0].value = piePercentages[0];
      newPieData[1].value = piePercentages[1];
      newPieData[2].value = piePercentages[2];
      setData(newPieData);
    }


    return (
        <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.7}
        colors={bar => colors[bar.id]}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: "color" }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#ffffff"
        sliceLabel={(item) => `${item.value}%`}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    )
}

export default CoursePie
