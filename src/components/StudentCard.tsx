import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import ButtonBase from "@material-ui/core/ButtonBase";
import { PersonRounded } from "@material-ui/icons";

interface StudentCardProps {
  studentId: number;
}

function StudentCard(props: StudentCardProps) {
  const history = useHistory();
  return (
    <Card>
      <ButtonBase onClick={() => history.push(`students/${props.studentId}`)}>
        <CardContent>
          <div style={{display:'flex'}}>
            <PersonRounded fontSize="large"/>
            <Typography component="h5" variant="h5">
              Student: {props.studentId}
            </Typography>
          </div>
        </CardContent>
      </ButtonBase>
    </Card>
  );
}
export default StudentCard;
