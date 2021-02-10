import { createStyles, makeStyles, Theme } from "@material-ui/core";

const FileUploadStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 2000
    },
    dataCheck: {
      height: 400, 
      width: '100%', 
      marginBottom: '1rem'
    }
  }),
);

export default FileUploadStyles;