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
function getSteps() {
  return ["Upload your data", "Check the data"];
}

const Upload = () => {
  const history = useHistory();
  const uploadContext = useContext(UploadContext)
  const classes = StepperStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { enqueueSnackbar } = useSnackbar();
  const fileController = new FileController();
  const Auth0 = useAuth0();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    Auth0.getAccessTokenSilently().then(token => setAccessToken(token));
  },[Auth0])
  
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
      }else{
        enqueueSnackbar('Error occurred while uploading data!', { variant: "error" });
      }
    }
  };

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
            </div>
          </div>
      </div>
    </div>
  );
};

export default Upload;
