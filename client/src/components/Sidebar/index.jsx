import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 240,
    backgroundColor: theme.palette.background.paper,
  },
  dashboard: {
    paddingLeft: theme.spacing(4),
  },
  tabs: {
    paddingLeft: theme.spacing(8),
  },
});

class Sidebar extends React.Component {
  state = { open: {} };

  handleClick = key => () => {
    this.setState({ [key]: !this.state[key] });
  };

  render() {
    let { data, classes } = this.props;

    let { predefinedDomains, myDashboards } = data;

    let myDashboardsExist = myDashboards.length !== 0 ? true : false;

    return (
      <div className={classes.root}>
        <List component='nav'>
          <ListItem button component={Link} to={`/dashboard/`} color='inherit'>
            <ListItemIcon>
              <Icon>home</Icon>
            </ListItemIcon>
            <ListItemText primary='Home Page' />
          </ListItem>
          <Divider />
          <ListItem button component={Typography} color='inherit' variant='h2'>
            <ListItemText primary='Predefined Domains' />
          </ListItem>

          {predefinedDomains.map(
            ({
              key: domainKey,
              label: domainLabel,
              icon: domainIcon,
              path: domainPath,
              dashboards,
            }) => {
              let domainOpen = this.state[domainKey] || false;
              let dashboardExists = domainPath !== undefined ? false : true;
              let domainLinkProps = dashboardExists
                ? {}
                : { component: Link, to: `/dashboard/${domainPath}` };
              return (
                <div key={domainKey}>
                  <ListItem
                    button
                    onClick={this.handleClick(domainKey)}
                    color='inherit'
                    {...domainLinkProps}
                  >
                    <ListItemIcon>
                      <Icon>{domainIcon}</Icon>
                    </ListItemIcon>
                    <ListItemText
                      primary={domainLabel}
                      primaryTypographyProps={{
                        style: { wordWrap: "break-word" },
                      }}
                    />
                    {dashboardExists &&
                      (domainOpen ? <ExpandLess /> : <ExpandMore />)}
                  </ListItem>
                  {dashboardExists && (
                    <Collapse in={domainOpen} timeout='auto' unmountOnExit>
                      <List component='div' disablePadding>
                        {dashboards.map(
                          ({
                            key: dashboardKey,
                            label: dashboardLabel,
                            icon: dashboardIcon,
                            path: dashboardPath,
                          }) => {
                            let dashboardLinkProps = {
                              component: Link,
                              to: `/dashboard/${dashboardPath}`,
                            };
                            return (
                              <div key={dashboardKey}>
                                <ListItem
                                  button
                                  className={classes.dashboard}
                                  onClick={this.handleClick(dashboardKey)}
                                  color='inherit'
                                  {...dashboardLinkProps}
                                >
                                  <ListItemIcon>
                                    <Icon>{dashboardIcon}</Icon>
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={dashboardLabel}
                                    primaryTypographyProps={{
                                      style: { wordWrap: "break-word" },
                                    }}
                                  />
                                </ListItem>
                              </div>
                            );
                          }
                        )}
                      </List>
                    </Collapse>
                  )}
                </div>
              );
            }
          )}
          <Divider />

          {myDashboardsExist && (
            <React.Fragment>
              <ListItem
                button
                component={Typography}
                color='inherit'
                variant='h2'
              >
                <ListItemText primary='My Dashboards' />
              </ListItem>
              {myDashboards.map(
                ({
                  key: dashboardKey,
                  label: dashboardLabel,
                  icon: dashboardIcon,
                  path: dashboardPath,
                }) => {
                  let dashboardLinkProps = {
                    component: Link,
                    to: `/dashboard/${dashboardPath}`,
                  };
                  return (
                    <div key={dashboardKey}>
                      <ListItem
                        button
                        onClick={this.handleClick(dashboardKey)}
                        color='inherit'
                        {...dashboardLinkProps}
                      >
                        <ListItemIcon>
                          <Icon>{dashboardIcon}</Icon>
                        </ListItemIcon>
                        <ListItemText
                          primary={dashboardLabel}
                          primaryTypographyProps={{
                            style: { wordWrap: "break-word" },
                          }}
                        />
                      </ListItem>
                    </div>
                  );
                }
              )}
            </React.Fragment>
          )}
        </List>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
