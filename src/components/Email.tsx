import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { Person, School, Star, Work } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSnackbar } from 'notistack';
import CommunicationController from "../api/CommunicationController";
import { useAuth0 } from "@auth0/auth0-react";
function Email() {
  const Auth0 = useAuth0();
  const { enqueueSnackbar } = useSnackbar();
  const [openNewEmailDialog, setNewEmailDialog] = useState(false);
  const controller = new CommunicationController(); 
  const [data, setData] = useState([]); 
  const [emailContent, setEmailContent] = useState('Dear Student,');
  const [emailSubject, setEmailSubject] = useState('Attendance Information');

  useEffect(() => {
    GetEmails();
  },[]);

  async function GetEmails(){
    const token = await Auth0.getAccessTokenSilently();
    let res = await controller.GetConversations(token,"mari6n7795@gmail.com");
    setData(res);
}

async function sendEmail(){
    const token = await Auth0.getAccessTokenSilently();
    const res = await controller.SendEmail(token,{
        fromName:"AttendancePro",
        fromEmail:"admin@em2322.attendancepro.co.uk",
        toName:"Marion",
        toEmail:"mari6n7795@gmail.com",
        subject:emailSubject,
        content:`${emailContent}`,
        htmlContent:`<strong>${emailContent}</strong>`
    });
    if(res){
        enqueueSnackbar('Email sent!', { variant: "success" });
        GetEmails();
    }else{
        enqueueSnackbar('Error occurred!', { variant: "error" });
    }
    setNewEmailDialog(false);
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
            <h4 className="vertical-timeline-element-subtitle">University of Sussex</h4>
            <div dangerouslySetInnerHTML={{__html: email.htmlContent}} />
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
