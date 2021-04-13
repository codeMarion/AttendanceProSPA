import { ResponsivePie } from "@nivo/pie";
import percentRound from "percent-round";
import React, { useEffect, useState } from "react";
import StudentData from "../../models/StudentData";

interface PieChartProps {
  data: StudentData[]
}

export default function PieChart(props: PieChartProps) {
  const [data, setData] = useState<any>([]);
  const colors : any = { 'Non-Attended': 'rgb(228, 26, 28)', 'Explained': 'rgb(31, 119, 180)', 'Attended': 'rgb(44, 160, 44)' }

  useEffect(() => {
    const dataValues = [0,0,0,0]
    props.data.map(item => {
      dataValues[0] += item.attended;
      dataValues[2] += item.explained;
      dataValues[3] += item.nonAttended;
    })
    const dataPercentages = percentRound(dataValues);
    setData([
      {id: "Attended",label: "Attended", value: dataPercentages[0], color: "hsl(174, 70%, 50%)"},
      {id: "Explained",label: "Explained", value: dataPercentages[2], color: "hsl(234, 70%, 50%)"},
      {id: "Non-Attended",label: "Non-Attended", value: dataPercentages[3], color: "hsl(254, 70%, 50%)"}
    ])
  },[])


  return (
      <ResponsivePie
        data={data}
        //@ts-ignore
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        enableRadialLabels={false}
        sliceLabelsSkipAngle={1}
        sliceLabelsTextColor="#ffffff"
        colors={bar => colors[bar.id]}
        sliceLabel={(item) => `${item.value}%`}
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
      valueFormat={(item) => `${item}%`}
      />
  );
}
