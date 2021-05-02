import { useAuth0 } from '@auth0/auth0-react';
import { ResponsivePie } from '@nivo/pie'
import React, { useContext, useEffect, useState } from 'react'
import StudentController from '../../api/StudentController';
import { AppContext } from '../../context/AppContext';

function PersistentAbsenteesByCourse() {
    //States and contexts
    const Auth0 = useAuth0();
    const controller = new StudentController();
    const [data, setData] = useState([]);
    const appContext = useContext(AppContext);
    //This lifecycle hook is triggered when the risk levels are updated
    useEffect(() => {
      fetchData();
    },[appContext.riskStudentThreshold])

    //This function is responsible for retrieving the chart information from the backend
    async function fetchData(){
      const token = await Auth0.getAccessTokenSilently();
      const response = await controller.GetPersistentAbsenteesByCourse(token,appContext.riskStudentThreshold);
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
        <div style={{height: '19rem' , width: '99%'}}>
        <ResponsivePie
        data={data}
        //@ts-ignore
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        enableRadialLabels={false}
        sliceLabelsSkipAngle={1}
        sliceLabelsTextColor="#ffffff"
        colors={{ scheme: "category10" }}
        margin={{bottom:60,}}
        sliceLabel={(item) => `${item.value}%`}
        valueFormat={(item) => `${item}%`}
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
