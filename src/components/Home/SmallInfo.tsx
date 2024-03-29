import { Box, Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'

//TypeScript model for the component props
interface SmallInfoProps {
    title: string;
    data: string;
    imagesrc: string;
    color: string;
}

const SmallInfo = (props:SmallInfoProps) => {
    return (
        <Card>
            <CardContent>
                <Box style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box>
                        <Typography style={{whiteSpace: "nowrap",width: '140px',textOverflow: 'ellipsis', overflow: 'hidden'}}>
                            {props.title}
                        </Typography>
                        <Typography variant="h4">
                            {props.data}
                        </Typography>
                    </Box>
                    <Box style={{display:'flex', justifyContent: 'center', alignItems: 'center',marginRight: '10%', padding: '5px 10px 5px 10px', backgroundColor: props.color, borderRadius: '50%'}}>
                        <img style={{height: '70%'}} src={props.imagesrc} />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default SmallInfo
