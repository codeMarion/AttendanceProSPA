import React, { useState } from "react";
import { AppBar, CssBaseline, Hidden, IconButton, Toolbar, Drawer as DrawerMUI } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import LayoutStyles from "../styles/LayoutStyles";
import Drawer from "./Drawer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Routes from "../config/Routes";
import TopBar from "./TopBar";

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = LayoutStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
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
      <Router>
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
          {Routes.map((tab, i) => (
            <Route key={i} exact path={tab.path} component={tab.component} />
          ))}
        </main>
      </Router>
    </div>
  );
};

export default Layout;