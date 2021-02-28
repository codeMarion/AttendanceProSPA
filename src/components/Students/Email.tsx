import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { Person, School, Star, Work } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSnackbar } from 'notistack';
import CommunicationController from "../../api/CommunicationController";
import { useAuth0 } from "@auth0/auth0-react";
import Moment from "react-moment";

interface EmailProps{
  email:string;
  name: number;
}

function Email(props: EmailProps) {
  const Auth0 = useAuth0();
  const { enqueueSnackbar } = useSnackbar();
  const [openNewEmailDialog, setNewEmailDialog] = useState(false);
  const controller = new CommunicationController(); 
  const [data, setData] = useState([]); 
  const [emailContent, setEmailContent] = useState('Dear Student,');
  const [emailSubject, setEmailSubject] = useState('Attendance Information');
  const emailDelimiters = ['']

  useEffect(() => {
    GetEmails();
  },[]);

  async function GetEmails(){
    const token = await Auth0.getAccessTokenSilently();
    let res = await controller.GetConversations(token,props.email);
    setData(res.reverse());
}

async function sendEmail(){
    const token = await Auth0.getAccessTokenSilently();
    const res = await controller.SendEmail(token,{
        fromName:"AttendancePro",
        fromEmail:"admin@em2322.attendancepro.co.uk",
        toName:props.name.toString(),
        toEmail:props.email,
        subject:emailSubject,
        content:`${emailContent}`,
        htmlContent:`${emailContent}`
    });
    if(res){
        enqueueSnackbar('Email sent!', { variant: "success" });
        GetEmails();
    }else{
        enqueueSnackbar('Error occurred!', { variant: "error" });
    }
    setNewEmailDialog(false);
  }

  function filterEmail(email:string){
    let cleanEmailArr = email.replace(/\n/g, "<br />").split("<br />");
    let index = 0;
    for(let i = 0; i < cleanEmailArr.length; i++){
      if(cleanEmailArr[i].includes("admin@em2322.attendancepro.co.uk")){
        index = i - 1;
        break;
      }
    }
    let response = cleanEmailArr.slice(0, index).join("<br />");
    console.log(response === "");
    return response === "" ? email : response;
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setNewEmailDialog(true)} style={{marginTop: '5px'}}>
      Send New Email
      </Button>
      <VerticalTimeline>
        {data.map((email:any,i) => (
            <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={email.fromEmail === "admin@em2322.attendancepro.co.uk" ? <School /> : <Person />}
            >
            <h3 className="vertical-timeline-element-title">{email.fromEmail === "admin@em2322.attendancepro.co.uk" ? 'Staff' : 'Student'}</h3>
            <h4 className="vertical-timeline-element-subtitle">Date: <Moment format="DD/MM/YYYY HH:mm">{email.date}</Moment></h4>
            <h4 className="vertical-timeline-element-subtitle">University of Sussex</h4>
            <div dangerouslySetInnerHTML={{__html: email.fromEmail === "admin@em2322.attendancepro.co.uk" ? email.content : filterEmail(email.content)}} />
            </VerticalTimelineElement>
        ))}
        <VerticalTimelineElement
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          icon={<Star />}
        />
      </VerticalTimeline>
      <Dialog open={openNewEmailDialog} onClose={() => setNewEmailDialog(false)} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">New Email</DialogTitle>
        <DialogContent>
            <TextField
            style={{marginBottom: '2%'}}
            label="Subject"
            multiline
            rows={1}
            defaultValue={emailSubject}
            variant="outlined"
            fullWidth
            onChange={(e) => setEmailSubject(e.target.value)}
            />
            <TextField
            label="Email"
            multiline
            rows={8}
            defaultValue={emailContent}
            variant="outlined"
            fullWidth
            onChange={(e) => setEmailContent(e.target.value)}
            />
            <Button variant="contained" color="primary" style={{marginTop: '20px'}} onClick={sendEmail}>
            Send
            </Button>
        </DialogContent>
       </Dialog>
    </div>
  );
}

export default Email;
