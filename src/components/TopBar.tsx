import React from 'react';
import { Search } from "@material-ui/icons";
import { InputBase } from "@material-ui/core";
import TopBarStyles from "../styles/TopBarStyles";
import Avatar from '@material-ui/core/Avatar';

const TopBar = () => {
    const classes = TopBarStyles();

    return (
      <div className={classes.root}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div style={{marginLeft: '10px'}}>
              <Avatar>ML</Avatar>
          </div>
      </div>
    );
}

export default TopBar