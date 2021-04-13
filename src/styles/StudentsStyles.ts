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
    },
    search:{
      padding: '10px 10px 0 10px'
    },
    autoComplete: {
      width: '100%', 
      marginBottom: '5px'
    },
    chips: {
      padding: '0 10px 0 10px'
    },
    chipStyle: {
      margin: '5px'
    },
    filterStudentsTitle: {
      padding: '10px 10px 0 10px'
    },
    drawerPaper: {
      width: 300,
    }
  }
));

export default StudentsStyles;