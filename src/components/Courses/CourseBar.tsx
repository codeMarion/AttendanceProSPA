import { useAuth0 } from '@auth0/auth0-react';
import { ResponsiveBarCanvas } from '@nivo/bar'
import percentRound from 'percent-round';
import React, { useContext, useEffect, useState } from 'react'
import CourseController from '../../api/CourseController';
import { CourseContext } from '../../context/CourseContext';
import AbsenceReasonsResponse from '../../models/AbsenceReasonsResponse';
import BarProps from '../../models/BarProps'

function CourseBar() {
    const Auth0 = useAuth0();
    const controller = new CourseController();
    const coursesContext = useContext(CourseContext)
    const [chartData, setChartData] = useState<BarProps[]>([]);

    useEffect(() => {
      getChartData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[coursesContext.selectedCourses])
    
    async function getChartData(){
      const token = await Auth0.getAccessTokenSilently();
      const res: AbsenceReasonsResponse = await controller.GetAbsenceData(
          coursesContext.selectedCourses.map((el) => el.courseCode),
          token
        );
      const newBarData : BarProps[] = []
      res.absenceReasons.forEach(reason => {
        newBarData.push({year: reason.year.toString(), attendance: reason.attended / reason.teaching})
      });
      const barPercentages = percentRound(newBarData.map(item => item.attendance));
      barPercentages.forEach((percent,i) => {
        newBarData[i].attendance = percent;
      });
      setChartData(newBarData)
    }
    return (
        <ResponsiveBarCanvas
        data={chartData}
        keys={[ 'attendance' ]}
        indexBy="year"
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={() => 'rgb(44, 160, 44)'}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'YEAR',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Attendance (%)',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        label={(item) => `${item.value}%`}
    />
    )
}

export default CourseBar
