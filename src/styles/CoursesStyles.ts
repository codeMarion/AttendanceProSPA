import { createStyles, makeStyles, Theme } from "@material-ui/core";

const CoursesStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      display: "flex", 
      justifyContent: "center"
    },
    filterCoursesTitle: {
      padding: '10px 10px 0 10px'
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
    loading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 300,
    }
  }
));

export default CoursesStyles;