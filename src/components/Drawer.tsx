import { Divider, List, ListItem, ListItemIcon, ListItemText, useTheme } from "@material-ui/core";
import { School } from "@material-ui/icons";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Routes from "../config/Routes";
import LayoutStyles from "../styles/LayoutStyles";

function Drawer() {
  //Material UI configuration objects
  const theme = useTheme();
  const classes = LayoutStyles();
  const history = useHistory();

  return (
    <div>
      <div className={`${classes.toolbar} ${classes.logoSection}`} onClick={() => history.push('/')}>
        <School color="secondary" style={{marginRight: '7px'}}/>
        <h1 style={{color: theme.palette.secondary.main}}>Attendance</h1>
        <h1 style={{color: 'white'}}>Pro</h1>
      </div>
      <Divider />
      <List>
        {Routes.map((tab,i) => (
          <ListItem button key={i} component={Link} to={tab.path}>
            <ListItemIcon>
                <tab.logo className={classes.tabColor}/>
            </ListItemIcon>
            <ListItemText primary={tab.title} className={classes.tabColor} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Drawer;
