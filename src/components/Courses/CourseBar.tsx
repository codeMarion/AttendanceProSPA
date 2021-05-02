import { useAuth0 } from '@auth0/auth0-react';
import { ResponsiveBarCanvas } from '@nivo/bar';
import React, { useContext, useEffect, useState } from 'react';
import CourseController from '../../api/CourseController';
import { CourseContext } from '../../context/CourseContext';
import AbsenceReasonsResponse from '../../models/AbsenceReasonsResponse';
import BarProps from '../../models/BarProps';

function CourseBar() {
    //States and contexts
    const Auth0 = useAuth0();
    const controller = new CourseController();
    const coursesContext = useContext(CourseContext)
    const [chartData, setChartData] = useState<BarProps[]>([]);

    //This lifecycle hook is triggered when the selectedCourses is updated in the context
    useEffect(() => {
      getChartData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[coursesContext.selectedCourses])
    
    //This function is responsible for retrieving the chart information from the backend
    async function getChartData(){
      const token = await Auth0.getAccessTokenSilently();
      const res: AbsenceReasonsResponse = await controller.GetAbsenceData(
          coursesContext.selectedCourses.map((el) => el.courseCode),
          token
        );
      const newBarData : BarProps[] = []
      res.absenceReasons.forEach(reason => {
        newBarData.push({year: reason.year.toString(), attendance: Math.ceil((reason.attended / reason.teaching) * 100)})
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
        maxValue={100}
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
        tooltip={({ value, indexValue, color }) => (
          <div style={{paddingTop: '5%', paddingBottom: '5%'}}>
            <p style={{marginBottom: '2%'}}>
                Year {indexValue}
            </p>
            <p style={{ color }}>
              Attendance Statistics: {value}%
            </p>
          </div>
        )}
    />
    )
}

export default CourseBar
