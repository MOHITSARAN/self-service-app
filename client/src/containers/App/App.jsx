// Node modules
import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { callAPI, remove } from "../../helpers/utility";

// Layout and Design COmponents
import {
  CssBaseline,
  Drawer,
  List,
  Divider,
  IconButton,
  createMuiTheme,
  withStyles,
  CircularProgress,
} from "@material-ui/core";

import { styles } from "./AppStyles";

// Icons
import { ChevronLeft as ChevronLeftIcon } from "@material-ui/icons";

// Theme Switch Imports
import { ThemeProvider } from "@material-ui/core/styles";
import { deepOrange, grey } from "@material-ui/core/colors";

// Routes
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

import Dashboard from "../../components/Dashboard";

// Components
import Sidebar from "../../components/Sidebar";
import NotFoundPage from "../Pages/NotFoundPage";

// Backend
import getDataFromBackend from "./backend";
import HomePage from "../Pages/HomePage";

// Nav Bar
import NavBar from "../../components/NavBar";

class App extends Component {
  state = {
    loading: true,
    menuDrawerOpen: false,
    userName: "",
    darkState: true,
    routes: [],
    sideBarObjects: {},
  };

  componentDidMount() {
    let userID = "userID";
    let sideBarObjects = getDataFromBackend(userID);

    callAPI(
      "user",
      "get",
      this.handleSetUserContext.bind(this),
      this.handleError.bind(this)
    );

    let routes = [];
    // Adding the dashboards in predefined domains to routes
    sideBarObjects.predefinedDomains.map(domain => {
      if (domain.hasOwnProperty("dashboards")) {
        domain.dashboards.forEach(dashboard => {
          routes.push({
            component: Dashboard,
            exact: true,
            path: dashboard.path,
            dashboardType: "Predefined",
            dashboardID: dashboard.key,
          });
        });
      }
      return null;
    });

    // Adding the dashboards of user made dashboards to routes
    sideBarObjects.myDashboards.forEach(dashboard => {
      routes.push({
        component: Dashboard,
        exact: true,
        path: dashboard.path,
        dashboardType: "Self Service",
        dashboardID: dashboard.key,
      });
    });

    this.setState({
      loading: false,
      routes,
      sideBarObjects,
    });
  }

  handleSetUserContext(data) {
    let { darkState, name } = data.data.userDetails;
    this.setState({ name, darkState });
  }

  handleError(err) {
    this.setState({ waiting: false, authorised: false });
  }

  handleLogOut = () => {
    remove("auth");

    // Redirect to SignIn Page NOT WORKING
    this.props.history.push(`/`);
  };

  handleShowUserAccount = () => {
    // Redirect to SignIn Page NOT WORKING
    this.props.history.push(`/profile`);
  };

  handleDrawerOpen = () => {
    this.setState({
      menuDrawerOpen: true,
    });
  };

  handleDrawerClose = () => {
    this.setState({
      menuDrawerOpen: false,
    });
  };

  toggleDarkState = () => {
    callAPI(
      "/user/toggledarkstate",
      "get",
      data => {
        this.setState({
          darkState: !this.state.darkState,
        });
        console.log("Toggled");
      },
      err => {
        console.log("Something went wrong while changing theme!");
      },
      "Hi"
    );
  };

  render() {
    // Extract URL from props
    const { classes } = this.props;
    const {
      menuDrawerOpen,
      darkState,
      sideBarObjects,
      routes,
      name,
    } = this.state;

    // Dark Mode Switch
    const palletType = darkState ? "dark" : "light";
    // const mainPrimaryColor = darkState ? grey[900] : indigo[600];
    const mainPrimaryColor = darkState ? grey[900] : "#002e66";
    const mainSecondaryColor = darkState ? deepOrange[500] : deepOrange[800];
    const darkTheme = createMuiTheme({
      palette: {
        type: palletType,
        primary: {
          main: mainPrimaryColor,
        },
        secondary: {
          main: mainSecondaryColor,
        },
      },
    });

    if (this.state.loading) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      );
    }

    return (
      <ThemeProvider theme={darkTheme}>
        <div className={classes.root}>
          <CssBaseline />

          <NavBar
            classes={classes}
            menuDrawerOpen={menuDrawerOpen}
            darkState={darkState}
            name={name}
            handleDrawerOpen={this.handleDrawerOpen}
            handleShowUserAccount={this.handleShowUserAccount}
            toggleDarkState={this.toggleDarkState}
            handleLogOut={this.handleLogOut}
          />

          <Drawer
            variant='temporary'
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !menuDrawerOpen && classes.drawerPaperClose
              ),
            }}
            open={menuDrawerOpen}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List component='nav'>
              <Sidebar data={sideBarObjects} />
            </List>
          </Drawer>

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Switch>
              <Route
                exact={true}
                key=''
                path={`/dashboard/${""}`}
                render={routeProps => <HomePage darkState={darkState} />}
              />
              {Object.values(routes).map(route => {
                let {
                  exact,
                  path,
                  component: Component,
                  ...otherProps
                } = route;
                return (
                  <Route
                    exact={exact}
                    key={path}
                    path={`/dashboard/${path}`}
                    render={routeProps => (
                      <Component
                        {...routeProps}
                        {...otherProps}
                        darkState={darkState}
                      />
                    )}
                  />
                );
              })}
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(App));
