import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import StudentController from '../../api/StudentController';

const AbsenceStartGraph = () => {

  const Auth0 = useAuth0();
  const controller = new StudentController();
  const [data, setData] = useState([]);
  useEffect(() =>{
    fetchData();
  },[])

  async function fetchData(){
    const token = await Auth0.getAccessTokenSilently();
    const response = await controller.GetAbsenceStartingData(token);
    const newResponse = response.map((item:any,i:number) => {
      return {name: `Period ${i+1}`, attendance: Math.ceil((item.attended/item.teaching)*100)}
    })
    setData(newResponse);
  }
  return (
    <div style={{ height: "19rem", width: "99%" }}>
    <ResponsiveContainer width="99%" height="99%">
    <AreaChart
      data={data}
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
      <Tooltip formatter={(value:number) => `${value}%`}/>
      <CartesianGrid />
      <Area
          type='monotone'
          dataKey='attendance'
          strokeWidth={4}
          stackId='2'
          stroke='#18A0FB'
          fill='url(#color15)'
          fillOpacity={1}
        />
    </AreaChart>
  </ResponsiveContainer>
      </div>
  );
};

export default AbsenceStartGraph;
