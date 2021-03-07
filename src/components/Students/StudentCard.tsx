import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Box } from "@material-ui/core";
import Grad from '../../assets/grad.png';

interface StudentCardProps {
  studentId: number;
}

function StudentCard(props: StudentCardProps) {
  const history = useHistory();
  return (
    <ButtonBase style={{width: '100%'}}>
      <Card onClick={() => history.push(`students/${props.studentId}`)} style={{width: '100%'}}>
        <CardContent>
            <Box style={{display: 'flex', justifyContent: 'space-between'}}>
                <Box>
                    <Typography variant="h6" style={{display:'flex'}}>
                        Student
                    </Typography>
                    <Typography variant="h5" style={{display:'flex'}}>
                        {props.studentId}
                    </Typography>
                </Box>
                <Box style={{display:'flex', justifyContent: 'center', alignItems: 'center', padding: '5px 10px 5px 10px', backgroundColor: 'lightblue', borderRadius: '50%'}}>
                    <img style={{height: '70%'}} src={Grad} />
                </Box>
            </Box>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}
export default StudentCard;
