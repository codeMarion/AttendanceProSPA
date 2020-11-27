import React, { useState } from "react";
import { Search } from "@material-ui/icons";
import { InputBase, Menu, MenuItem } from "@material-ui/core";
import TopBarStyles from "../styles/TopBarStyles";
import Avatar from "@material-ui/core/Avatar";
import { useAuth0 } from "@auth0/auth0-react";
const TopBar = () => {
  const Auth0 = useAuth0();
  const classes = TopBarStyles();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const logout = () => {
    setProfileDropdownOpen(false);
    Auth0.logout();
  }

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
      <div className={classes.avatarDropDown}>
          <Avatar onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>ML</Avatar>
      </div>
      <Menu
        id="menu-appbar"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={profileDropdownOpen}
        onClose={() => setProfileDropdownOpen(false)}
      >
        <MenuItem onClick={() => setProfileDropdownOpen(false)}>
          Profile
        </MenuItem>
        <MenuItem onClick={logout}>
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TopBar;
