import React, { useContext, useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Button, Typography } from "@material-ui/core";
import StepperStyles from "../styles/StepperStyles";
import FileUpload from "../components/FileUpload";
import UploadedDataCheck from "../components/UploadedDataCheck";
import { UploadContext } from "../context/UploadContext";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import FileController from "../api/FileController";
import { useAuth0 } from "@auth0/auth0-react";
import { Player } from "@lottiefiles/react-lottie-player";
import Animation from '../config/upload_logo.json';
import CommunicationController from "../api/CommunicationController";

//This function retrieves the titles for the stepper based on the current progress of a user.
function getStepContent(step: number) {
  switch (step) {
    case 0:
      return "Upload your data";
    case 1:
      return "Check the data";
    default:
      return "Unknown step";
  }
}

//This function returns the step names
function getSteps() {
  return ["Upload your data", "Check the data"];
}

const Upload = () => {
  //States and contexts
  const history = useHistory();
  const uploadContext = useContext(UploadContext)
  const classes = StepperStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { enqueueSnackbar } = useSnackbar();
  const fileController = new FileController();
  const commsController = new CommunicationController();
  const Auth0 = useAuth0();
  const [accessToken, setAccessToken] = useState("");

  //This lifecycle hook is triggered when the Auth0 object value changes
  useEffect(() => {
    Auth0.getAccessTokenSilently().then(token => setAccessToken(token));
  },[Auth0])

  //This lifecycle hook is triggered on first load
  useEffect(() => {
    uploadContext.setUploadedData([]);
  },[])
  
  //This function is used to handle the the stepper and provide snackbar messages
  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(activeStep === 1){
      setActiveStep(0);
      history.push("/");
      enqueueSnackbar('Data is being uploaded!', { variant: "info" });      
      const response = await fileController.uploadData(accessToken, uploadContext.uploadedData)
      if(response){
        uploadContext.setUploadedData([]);
        enqueueSnackbar('Data uploaded successfully!', { variant: "success" });
        const token = await Auth0.getAccessTokenSilently();
        await commsController.SendReminders(token);
      }else{
        enqueueSnackbar('Error occurred while uploading data!', { variant: "error" });
      }
    }
  };

  //This function allows a user to go back to the previous step.
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map(label => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            {activeStep === 0 ? 
                <FileUpload />
            :
            activeStep === 1 ?
                <UploadedDataCheck />
            :
            <></>    
            }
            <div>
              <Button
                style={{display: activeStep === 1 ? 'inline' : 'none'}}
                onClick={handleBack}
                className={classes.button}
                >
                Back
              </Button>
              <Button
                variant="contained"
                disabled={uploadContext.uploadedData.length === 0}
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Confirm" : "Next"}
              </Button>
              <br />
              <br />
              {activeStep === 0 ?
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.download = `sample data.xlsx`;
                    link.href = `${window.origin}/sample_data.xlsx`;
                    link.click();
                  }}
                  className={classes.button}
                >
                  Download Sample Data
                </Button>
                : <></>
              }
            </div>
          </div>
      </div>
      {/* Upload animation */}
      <Player
        autoplay
        loop
        src={Animation}
        style={{ height: '25%', width: '25%' }}
      >
      </Player>
    </div>
  );
};

export default Upload;
