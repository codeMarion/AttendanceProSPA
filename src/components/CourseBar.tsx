import { ResponsiveBar } from '@nivo/bar'
import React from 'react'
import BarProps from '../models/BarProps'

interface CourseBarProps{
    data: BarProps[]
}

function CourseBar(props: CourseBarProps) {
    return (
        <ResponsiveBar
        data={props.data}
        keys={[ 'attendance' ]}
        indexBy="year"
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
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
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        label={(item) => `${item.value}%`}
    />
    )
}

export default CourseBar
