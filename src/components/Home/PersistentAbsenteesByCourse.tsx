import { useAuth0 } from '@auth0/auth0-react';
import { ResponsivePie } from '@nivo/pie'
import React, { useEffect, useState } from 'react'
import StudentController from '../../api/StudentController';

function PersistentAbsenteesByCourse() {

    const Auth0 = useAuth0();
    const controller = new StudentController();
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    },[])

    async function fetchData(){
      const token = await Auth0.getAccessTokenSilently();
      const response = await controller.GetPersistentAbsenteesByCourse(token);
      let newResponse = response.data.map((item:any,i:number) => {
        return {
          id: item.course,
          label: item.course,
          value: item.students
        }
      })
      newResponse = newResponse.filter((item:any) => item.value >= 12)
      setData(newResponse);
    }

    return (
        <div style={{height: '19rem' , width: '100%'}}>
        <ResponsivePie
        data={data}
        //@ts-ignore
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        enableRadialLabels={false}
        sliceLabelsSkipAngle={1}
        sliceLabelsTextColor="#ffffff"
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
    )
}

export default PersistentAbsenteesByCourse
