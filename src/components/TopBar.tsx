import { useAuth0 } from "@auth0/auth0-react";
import { InputBase, Menu, MenuItem } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Search } from "@material-ui/icons";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { UserContext } from "../context/UserContext";
import TopBarStyles from "../styles/TopBarStyles";
const TopBar = () => {
  const Auth0 = useAuth0();
  const history = useHistory();
  const classes = TopBarStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const userContext = useContext(UserContext)
  const appContext = useContext(AppContext);

  const logout = () => {
    setAnchorEl(null);
    Auth0.logout();
  }

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Search />
        </div>
        <InputBase
          placeholder="Search a student..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => {
            appContext.setSearchBarValue(e.target.value);
            history.push('/students');
          }}
          value={appContext.searchBarValue}
        />
      </div>
      <div className={classes.avatarDropDown}>
        <Avatar onClick={(e) => setAnchorEl(e.currentTarget)}>{Auth0.user.name.substring(0,2).toUpperCase()}</Avatar>
      </div>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => {
          setAnchorEl(null);
          userContext.setProfileUpdate(true)
        }}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => {
          setAnchorEl(null);
          appContext.setShowThresholdDialog(true)
        }}>
          Configure Risk Levels
        </MenuItem>
        <MenuItem onClick={logout}>
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TopBar;
