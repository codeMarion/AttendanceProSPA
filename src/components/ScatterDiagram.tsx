import React, { useContext, useEffect, useState } from 'react'
import { ResponsiveScatterPlot, ResponsiveScatterPlotCanvas } from '@nivo/scatterplot'
import ScatterProps from '../models/ScatterProps'
import { useAuth0 } from '@auth0/auth0-react';
import CourseController from '../api/CourseController';
import { CourseContext } from '../context/CourseContext';

function ScatterDiagram() {
    const Auth0 = useAuth0();
    const controller = new CourseController();
    const coursesContext = useContext(CourseContext)
    const [chartData, setChartData] = useState<ScatterProps[]>([]);

    useEffect(() => {
        getChartData()
    },[coursesContext.selectedCourses])

    async function getChartData() {
        const token = await Auth0.getAccessTokenSilently();
        const res = await controller.getAttendedByTeachingSessionsData(
          coursesContext.selectedCourses.map((el) => el.courseCode),
            token
        );
        const newData : ScatterProps[] = []
        res.map((course:any) => {
          const dataPoint : ScatterProps = {
            id: course.course,
            data: course.attendanceData.map((record : any) => {
                return {
                  x: record.attended,
                  y: record.teaching
                }
            })
          }
          newData.push(dataPoint);
        })
        setChartData(newData);
      }

    return (
        <ResponsiveScatterPlotCanvas
        data={chartData}
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        xScale={{ type: 'linear', min: 0, max: 'auto' }}
        xFormat={function(e){return "attended "+e}}
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        yFormat={function(e){return "teaching "+e}}
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'attended',
            legendPosition: 'middle',
            legendOffset: 46
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'teaching',
            legendPosition: 'middle',
            legendOffset: -60
        }}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 130,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 12,
                itemsSpacing: 5,
                itemDirection: 'left-to-right',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    )
}

export default ScatterDiagram
