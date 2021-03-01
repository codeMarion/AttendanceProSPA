import React, { useEffect, useState } from "react";
import { AppBar, CssBaseline, Hidden, IconButton, Toolbar, Drawer as DrawerMUI } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import LayoutStyles from "../styles/LayoutStyles";
import Drawer from "./Drawer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Routes from "../config/Routes";
import TopBar from "./TopBar";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import StudentPage from "./Students/StudentPage";

const Layout = () => {
  const Auth0 = useAuth0();
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = LayoutStyles();

  useEffect(() => {
    Auth0.getAccessTokenSilently().then((accessToken => console.log(accessToken)));
  },[])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
            <TopBar />
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <DrawerMUI
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Drawer />
            </DrawerMUI>
          </Hidden>
          <Hidden xsDown implementation="css">
            <DrawerMUI
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Drawer />
            </DrawerMUI>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Profile />
          {Routes.map((tab, i) => (
            <Route key={i} exact path={tab.path} component={tab.component} />
            ))}
          <Route exact path={"/students/:student"} component={StudentPage} />
        </main>
      </Router>

    </div>
  );
};

export default Layout;
