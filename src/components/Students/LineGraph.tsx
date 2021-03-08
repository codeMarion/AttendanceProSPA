import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import LineGraphModel from "../../models/LineGraphModel";
import StudentData from "../../models/StudentData";

interface LineGraphProps {
    data: StudentData[]
}

export default function LineGraph(props: LineGraphProps) {
    const [val, setVal] = useState<LineGraphModel[]>([]);

    useEffect(() => {
        props.data.map((item,i) => {
            setVal(val => [...val, {name:(i + 1).toString(),attended:Math.ceil(item.attendancePercentage * 100)}])
        })
    },[])
  return (
    <ResponsiveContainer width="99%" height="99%">
    <AreaChart
      data={val}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <defs>
          <linearGradient id='color15' x1='0' y1='0' x2='0' y2='1'>
             <stop offset='5%' stopColor='#EBF6FC' stopOpacity={0.8} />
             <stop offset='95%' stopColor='#fff' stopOpacity={0.8} />
          </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis domain={[0, 100]}/>
      <Tooltip labelFormatter={(value:number) => `Period ${value}`}formatter={(value:number) => `${value}%`}/>
      <CartesianGrid />
      <Area
          type='monotone'
          dataKey='attended'
          strokeWidth={4}
          stackId='2'
          stroke='#18A0FB'
          fill='url(#color15)'
          fillOpacity={1}
        />
    </AreaChart>
  </ResponsiveContainer>
  );
}