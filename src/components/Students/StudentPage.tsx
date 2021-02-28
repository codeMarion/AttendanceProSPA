import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import StudentController from '../../api/StudentController';
import Student from '../../models/Student';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, ButtonBase, Card, CircularProgress, Grid, Hidden, Tabs, TextField, Typography } from '@material-ui/core';
import {Bookmark, CheckCircleOutline, Edit, Fullscreen, MailOutline, PersonRounded, Phone, Print, SchoolRounded} from '@material-ui/icons';
import PieChart from './PieChart';
import LineGraph from './LineGraph';
import GraphDialog from './../GraphDialog';
import Email from './Email';
import { Tab } from '@material-ui/core';
import Moment from "react-moment";
import { AppContext } from '../../context/AppContext';
//@ts-ignore
import SVGtoPDF from 'svg-to-pdfkit';
//@ts-ignore
import PDFDocument from 'pdfkit-browserify';
import blobStream from 'blob-stream';


function StudentPage(props:any) {
    const Auth0 = useAuth0();
    const controller = new StudentController();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState<Student>();
    const [bigGraph, setBigGraph] = useState("");
    const tabs = ["Profile","Communication"];
    const [personalDetailsEditMode, setPersonalDetailsEditMode] = useState(false);
    const [tab, setTab] = useState('profile');
    const [graphTitle, setGraphTitle] = useState('');
    const appContext = useContext(AppContext);
    

    useEffect(() => {  
        appContext.setSearchBarValue("");      
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
    const printPDF = async() => {
        PDFDocument.prototype.addSVG = function(svg:any, x:any, y:any, options:any) {
            return SVGtoPDF(this, svg, x, y, options), this;
        };
        const overallAttendance = document.getElementById('overallAttendance')!.children[0].children[0].children[0];
        const attendanceByPeriod = document.getElementById('attendanceByPeriod')!.children[0].children[0].children[0];
        const logo = document.getElementsByClassName('MuiSvgIcon-root MuiSvgIcon-colorSecondary')[0]
        var doc = new PDFDocument();
        var stream = doc.pipe(blobStream())

        doc.addSVG(logo, -100, 70, {preserveAspectRatio: 'None', height: 40, useCSS :true});
        doc.fontSize(25).text('Attendance Pro', 100, 80, {align: 'center'});

        doc.fontSize(15).text(`Student ID: ${data?.userId}`,50,130)
        doc.fontSize(15).text(`Course: ${data?.courseTitle} (${data?.courseCode})`)
        doc.fontSize(15).text(`Study Level: ${data?.studyLevel}`)

        doc.fontSize(15).text('Overall Attendance',240,200)
        doc.addSVG(overallAttendance, 50, 230, {preserveAspectRatio: 'None', height: 250, width: 500});

        doc.fontSize(15).text('Attendance By Period',220,480)
        doc.addSVG(attendanceByPeriod, -20, 500, {preserveAspectRatio: 'None', height: 200})
        doc.fontSize(10).text('%',100,590)
        doc.fontSize(10).text('Period',290,700)

        doc.end();
            stream.on('finish', function() {
            window.open(stream.toBlobURL('application/pdf'));
        });
    }

    return (
        <>
        <div>
            {data ? 
                <>
                    {bigGraph ? 
                        <GraphDialog open={true} closeDialog={() => {
                            setBigGraph("");
                            setGraphTitle("")
                        }} title={graphTitle}>
                            {bigGraph === "pie" ?
                                <div style={{ height: "29rem", width: "100%" }}>
                                    <PieChart data={data.studentData}/>
                                </div> 
                            : bigGraph === "line" ?
                                <div style={{ height: "29rem", width: "100%" }}>
                                    <LineGraph data={data.studentData}/>
                                </div> 
                            :<></>
                            }
                        </GraphDialog>
                        : 
                        <>
                            <Grid container spacing={3}>
                                <Grid item style={{display: 'flex', width: '100%'}}>
                                <Box style={{display:'flex', justifyContent: 'center', alignItems: 'center', padding: '5px 10px 5px 10px', backgroundColor: 'lightblue', borderRadius: '50%'}}>
                                    <img style={{height: '70%'}} src={'https://img.icons8.com/color/48/000000/student-male--v1.png'} />
                                </Box>
                                        <Grid container style={{width: '100%', justifyContent: 'space-between'}}>
                                            <Grid xs={12} md={8} >
                                                <Box style={{marginLeft: '2%'}}>
                                                    <Typography>Student</Typography>
                                                    <Typography>University of Sussex</Typography>
                                                    <Typography>Registered</Typography>
                                                </Box>
                                            </Grid>
                                            {data.studentData[data.studentData.length - 1].lastAttendance ?
                                            <>
                                                <Hidden smDown>
                                                    <Grid xs={12} md={4} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                        <Box>
                                                            <Typography>Last Attendance: <Moment format="DD/MM/YYYY HH:mm">{data.studentData[data.studentData.length - 1].lastAttendance}</Moment></Typography>
                                                        </Box>
                                                    </Grid>
                                                </Hidden>
                                                <Hidden mdUp>
                                                    <Grid xs={12} md={4} style={{display: 'flex',marginLeft: '2%', justifyContent: 'flex-start'}}>
                                                        <Box>
                                                            <Typography>Last Attendance: <Moment format="DD/MM/YYYY HH:mm">{data.studentData[data.studentData.length - 1].lastAttendance}</Moment></Typography>
                                                        </Box>
                                                    </Grid>
                                                </Hidden>
                                            </> : <></>
                                            }
                                        </Grid>
                                </Grid>
                            </Grid>
                            <Grid container xs={12}>
                                <ButtonBase style={{paddingTop: 10, paddingBottom: 10}} onClick={printPDF}>
                                    <Print />
                                </ButtonBase>
                                {data.email ? 
                                    <Tabs
                                        onChange={(event, value) => setTab(tabs[value])}
                                        indicatorColor='primary'
                                        textColor='primary'
                                        variant='scrollable'
                                        scrollButtons='auto'
                                        aria-label='scrollable auto tabs example'
                                            >
                                        {tabs.map((tab, index) => {
                                        return (
                                            <Tab
                                            key={index}
                                            label={tab}
                                            />
                                        );
                                        })}
                                    </Tabs>
                                : <></> }
                            </Grid>
                            {tab === 'Communication' ? <Email name={data.userId} email={data.email} /> :
                            <>
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
                                            <Box style={{display: 'flex', justifyContent: 'space-between'}}>
                                                <Typography variant="subtitle1">Contact Details:</Typography>
                                                {personalDetailsEditMode ? 
                                                    <ButtonBase onClick={async () => {
                                                        const token = await Auth0.getAccessTokenSilently();
                                                        controller.UpdateStudent(data.userId,data.email,data.phone,token);
                                                        setPersonalDetailsEditMode(false);
                                                    }}>
                                                        <CheckCircleOutline />
                                                    </ButtonBase>
                                                :
                                                    <ButtonBase onClick={() => setPersonalDetailsEditMode(true)}>
                                                        <Edit />
                                                    </ButtonBase>
                                                }
                                            </Box>
                                            <Grid container style={{margin: '2% 0'}}>
                                                <MailOutline />
                                                {personalDetailsEditMode ?
                                                    <TextField value={data.email} onChange={(e) => {
                                                        const newData = {...data};
                                                        newData.email = e.target.value;
                                                        setData(newData);
                                                    }}/>
                                                :
                                                    <Typography style={{marginLeft: '1%'}} variant="body2">{data.email}</Typography>
                                                }
                                            </Grid>
                                            <Grid container >
                                                <Phone />
                                                {personalDetailsEditMode ?
                                                    <TextField value={data.phone} onChange={(e) => {
                                                        const newData = {...data};
                                                        newData.phone = e.target.value;
                                                        setData(newData);
                                                    }}/>
                                                :
                                                    <Typography style={{marginLeft: '1%'}} variant="body2">{data.phone}</Typography>
                                                }
                                            </Grid>
                                        </Box>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} lg={6} >
                                    <Card>
                                        <Box style={{display: 'flex',justifyContent: 'flex-end'}}>
                                            <ButtonBase onClick={() => {
                                                setGraphTitle("Attendance By Period (%)");
                                                setBigGraph("line");
                                            }}>
                                                <Fullscreen />
                                            </ButtonBase>
                                        </Box>
                                        <div style={{margin: '1rem'}}>
                                            <Typography style={{textAlign: 'center', marginBottom: '2%'}} variant="h5">Attendance By Period (%)</Typography>
                                            <div id="attendanceByPeriod" style={{height: '19rem', width: "99%"}}>
                                                <LineGraph data={data.studentData}/>
                                            </div>
                                        </div>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} lg={6} >
                                    <Card>
                                        <Box style={{display: 'flex',justifyContent: 'flex-end'}}>
                                            <ButtonBase onClick={() => {
                                                setGraphTitle("Overall Attendance");
                                                setBigGraph("pie")
                                            }}>
                                                <Fullscreen />
                                            </ButtonBase>
                                        </Box>
                                        <div style={{margin: '1rem'}}>
                                            <Typography style={{textAlign: 'center', marginBottom: '2%'}} variant="h5">Overall Attendance</Typography>
                                            <div id="overallAttendance" style={{height: '19rem' , width: '99%'}}>
                                                <PieChart data={data.studentData}/>
                                            </div>
                                        </div>
                                    </Card>
                                </Grid>
                            </Grid>
                            </> }                   
                        </>
                    }
                </>
            :
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} color="secondary">
                    <CircularProgress size={100} />
                </div>
            }           
        </div>
        </>
    )
}

export default StudentPage;