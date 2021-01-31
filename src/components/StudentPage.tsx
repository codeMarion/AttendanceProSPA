import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import StudentController from '../api/StudentController';
import Student from '../models/Student'
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Box, Card, CircularProgress, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import {Bookmark, MailOutline, PersonRounded, Phone, SchoolRounded} from '@material-ui/icons';
import PieChart from './PieChart';
import LineGraph from './LineGraph';

function StudentPage(props:any) {
    const Auth0 = useAuth0();
    const controller = new StudentController();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState<Student>();

    useEffect(() => {        
        fetchData();
    },[])

    async function fetchData(){
        
        const token = await Auth0.getAccessTokenSilently();
        const response = await controller.GetStudent(props.match.params.student, token);
        if(response){
            setData(await response)
        }else if(response == false){
            history.push("/students");
            enqueueSnackbar('Student not found!', { variant: "error" });
        }
    }
    return (
        <>
            {data ? 
                <>
                    <Grid container spacing={3}>
                        <Grid item style={{display: 'flex', width: '100%'}}>
                            <Avatar style={{ height: '70px', width: '70px', fontSize: '40px' }}>ML</Avatar>
                                <Grid container style={{width: '100%', justifyContent: 'space-between'}}>
                                    <Grid xs={12} md={8} >
                                        <Box style={{marginLeft: '2%'}}>
                                            <Typography>Student</Typography>
                                            <Typography>University of Sussex</Typography>
                                            <Typography>Registered</Typography>
                                        </Box>
                                    </Grid>
                                    <Hidden smDown>
                                        <Grid xs={12} md={4} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                            <Box>
                                                <Typography>Last Contact: 01/02/2021</Typography>
                                            </Box>
                                        </Grid>
                                    </Hidden>
                                    <Hidden mdUp>
                                        <Grid xs={12} md={4} style={{display: 'flex',marginLeft: '2%', justifyContent: 'flex-start'}}>
                                            <Box>
                                                <Typography>Last Contact: 01/02/2021</Typography>
                                            </Box>
                                        </Grid>
                                    </Hidden>
                                </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                        <Card>
                            <Box style={{margin: '1rem'}}>
                                <Typography variant="subtitle1">Course Details:</Typography>
                                <Grid container style={{margin: '2% 0'}}>
                                    <PersonRounded />
                                    <Typography style={{marginLeft: '1%'}}>#{data.userId}</Typography>
                                </Grid>
                                <Grid container>
                                    <SchoolRounded />
                                    <Typography style={{marginLeft: '1%'}}>{data.courseTitle} ({data.courseCode})</Typography>
                                </Grid>
                                <Grid container style={{margin: '2% 0'}}>
                                    <Bookmark />
                                    <Typography style={{marginLeft: '1%'}}>{data.studyLevel}</Typography>
                                </Grid>
                            </Box>
                        </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <Box style={{margin: '1rem'}}>
                                    <Typography variant="subtitle1">Contact Details:</Typography>
                                    <Grid container style={{margin: '2% 0'}}>
                                        <MailOutline />
                                        <Typography style={{marginLeft: '1%'}} variant="body2">ml553@sussex.ac.uk</Typography>
                                    </Grid>
                                    <Grid container >
                                        <Phone />
                                        <Typography style={{marginLeft: '1%'}} variant="body2">+447305613249</Typography>
                                    </Grid>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6} >
                            <Card>
                                <div style={{margin: '1rem'}}>
                                    <Typography style={{textAlign: 'center', marginBottom: '2%'}} variant="h5">Attendance By Period (%)</Typography>
                                    <LineGraph data={data.studentData}/>
                                </div>
                            </Card>
                        </Grid>
                        <Grid item xs={12} lg={6} >
                            <Card>
                                <div style={{margin: '1rem'}}>
                                    <Typography style={{textAlign: 'center', marginBottom: '2%'}} variant="h5">Overall Attendance</Typography>
                                    <PieChart data={data.studentData}/>
                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </>
            :
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} color="secondary">
                    <CircularProgress size={100} />
                </div>
            }           
        </>
    )
}

export default StudentPage

