import { createStyles, makeStyles, Theme } from "@material-ui/core";

const StudentsStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
        display: 'flex', 
        justifyContent: 'center'
    },
    pagination: {
        display: 'flex', 
        justifyContent: 'center'
    },
    loading: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems:'center'
    }
  }
));

export default StudentsStyles;