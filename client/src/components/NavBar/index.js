import React, { Component } from "react";
import clsx from "clsx";

// Layout and Design COmponents
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Link,
} from "@material-ui/core";

import { Search as SearchIcon } from "@material-ui/icons";

// Icons
import {
  Menu as MenuIcon,
  ExitToApp,
  Brightness3,
  Brightness7,
} from "@material-ui/icons";

export class NavBar extends Component {
  render() {
    const { classes, menuDrawerOpen, darkState, name } = this.props;

    return (
      <AppBar
        position='absolute'
        className={clsx(classes.appBar, menuDrawerOpen && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='Open drawer'
            onClick={this.props.handleDrawerOpen.bind(undefined)}
            className={clsx(
              classes.menuButton,
              menuDrawerOpen && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          <Typography
            variant='body2'
            color='inherit'
            noWrap
            style={{ margin: "0.5rem" }}
          >
            <Link
              href='#'
              onClick={this.props.handleShowUserAccount.bind(undefined)}
              color='inherit'
            >
              Hello, {name}
            </Link>
          </Typography>
          <IconButton
            style={{ margin: "0.5rem" }}
            edge='end'
            color='inherit'
            aria-label='mode'
            onClick={this.props.toggleDarkState.bind(undefined)}
          >
            {darkState ? <Brightness7 /> : <Brightness3 />}
          </IconButton>

          <IconButton
            color='inherit'
            onClick={this.props.handleLogOut.bind(undefined)}
            style={{ margin: "0.5rem" }}
          >
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
