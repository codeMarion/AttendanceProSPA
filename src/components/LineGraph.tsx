import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import LineGraphModel from "../models/LineGraphModel";
import StudentData from "../models/StudentData";

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
    <ResponsiveContainer width="99%">
    <LineChart
      width={500}
      height={300}
      data={val}
      syncId="anyId"
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" label={{value: "Period", position: "outsideBottom"}}/>
      <YAxis label={{ value: "%", position: "insideLeft"}}/>
      <Tooltip />
      <Line
        type="monotone"
        dataKey="attended"
        stroke="#8884d8"
        fill="#8884d8"
      />
    </LineChart>
    </ResponsiveContainer>
  );
}