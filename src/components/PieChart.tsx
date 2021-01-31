import { ResponsivePie } from "@nivo/pie";
import React, { useEffect, useState } from "react";
import StudentData from "../models/StudentData";

export default function PieChart(props: {data: StudentData[]}) {
  const [data, setData] = useState([
    {id: "Attended",label: "Attended", value: 0, color: "hsl(174, 70%, 50%)"},
    {id: "Teaching",label: "Teaching", value: 0, color: "hsl(204, 70%, 50%)"},
    {id: "Explained",label: "Explained", value: 0, color: "hsl(234, 70%, 50%)"},
    {id: "Non-Attended",label: "Non-Attended", value: 0, color: "hsl(254, 70%, 50%)"}
  ]);

  useEffect(() => {
    props.data.map(item => {
      setData(data => [
        {id: "Attended",label: "Attended", value: data[0].value + item.attended, color: "hsl(174, 70%, 50%)"},
        {id: "Teaching",label: "Teaching", value: data[1].value + item.teaching, color: "hsl(204, 70%, 50%)"},
        {id: "Explained",label: "Explained", value: data[2].value + item.explained, color: "hsl(234, 70%, 50%)"},
        {id: "Non-Attended",label: "Non-Attended", value: data[3].value + item.nonAttended, color: "hsl(254, 70%, 50%)"}
      ])
    })
  },[])


  return (
    <div style={{height: '19rem' , width: '100%'}}>
      <ResponsivePie
        data={data}
        //@ts-ignore
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        enableRadialLabels={false}
        sliceLabelsSkipAngle={1}
        colors={{ scheme: "category10" }}
        margin={{bottom:60,}}
        legends={[
          {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 20,
              itemWidth: 80,
              itemHeight: 0,
              itemsSpacing: 0,
              symbolSize: 20,
              itemDirection: 'left-to-right'
          }
      ]}
      />
      </div>
  );
}
