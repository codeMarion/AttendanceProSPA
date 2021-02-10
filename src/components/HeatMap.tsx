import React, { useEffect, useState } from 'react'
import { ResponsiveHeatMap } from '@nivo/heatmap'

interface HeatMapProps {
  data: {
    course: string;
    attended: number[]
  }[]
}

function HeatMap(props: HeatMapProps) {
    const [val, setVal] = useState<any>([]);

    useEffect(() => {
      const x :any = [];
      props.data.map(item => {
        const y:any = {course: item.course};
        item.attended.map((score,i) => {
          y[i + 1] = score
        })
        x.push(y);
      })
      setVal(x);
      console.log(x);
    },[props.data])
    return (
      <ResponsiveHeatMap 
        data={val}
        keys={props.data[0].attended.map((score,i) => (i + 1).toString())}
        indexBy="course"
        margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
        axisTop={{ orient: 'top', tickSize: 5, tickPadding: 5, tickRotation: -90, legend: '', legendOffset: 36 }}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -70
        }}
        cellOpacity={1}
        cellBorderColor="black"
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.8 ] ] }}

        animate={true}
        motionStiffness={80}
        motionDamping={9}
        hoverTarget="cell"
        cellHoverOpacity={0.85}
        cellHoverOthersOpacity={0.25}
    />
    )
}

export default HeatMap
