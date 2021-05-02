import React from 'react'
import OpenApiDocumentation from '../config/OpenApiDocumentation'
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

/*
  This components is responsible of rendering the REST API documentation component
*/
function Documentation() {
    return (
    <div>
        <div style={{marginBottom: '-2%'}}>
          <div style={{backgroundColor: '#292D39', padding: '1%', display: 'flex'}}>
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{height: '30px', paddingLeft: '2%', marginTop:'2px', marginRight: '5px'}}>
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#39B6FF"></path>
            </svg>
            <span style={{color: '#39B6FF', fontSize:'25px', fontFamily:'Poppins'}}>Attendance</span><span style={{color: 'white',fontSize:'25px', fontFamily:'Poppins'}}>Pro</span>
          </div>
        </div>
        <div>
          <SwaggerUI spec={OpenApiDocumentation} />
        </div>
    </div>
    )
}

export default Documentation
