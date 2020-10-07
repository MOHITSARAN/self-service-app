import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  withStyles,
  Fade,
} from "@material-ui/core";
import { Redirect, withRouter } from "react-router-dom";
import { callAPI, set, get } from "../../../helpers/utility";

// styles
import { styles } from "./SignInPageStyles";

// logo
import logo from "../../../images/isg.png";

export class SignInPage extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      isLoading: false,
      activeTabId: 0,
      error: false,
      errMsg: "",
      formFields: {
        name: { val: "", err: false },
        email: { val: "", err: false },
        password: { val: "", err: false },
      },
    };
  }

  componentDidMount() {
    let isAuthenticated = !!get("auth");

    this.setState({ isAuthenticated });
  }

  changeState(newType) {
    this.setState({ type: newType });
  }

  checkErr(val, key) {
    switch (key) {
      case "email":
        return !/^\w+([-]?\.\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(val);
      case "name":
        return !/^[a-zA-Z ]+$/.test(val);
      case "password":
        return !(val.length >= 6);
      default:
        console.log("Added default case for removing warning in console");
    }
  }

  changeFormFields(e, key) {
    let errStatus = this.checkErr(e.target.value, key);
    let { formFields } = this.state; //{email, name, pass}
    let tempObj = {};
    Object.assign(tempObj, formFields);
    tempObj[key].val = e.target.value;
    tempObj[key].err = errStatus;
    // console.log("Event", e.target.value);
    this.setState({ formFields: tempObj });
  }
  handleSignUp(data) {
    console.log("Signed up! Here's your token", data.data.token);
    //Store the token into local storage
    set("auth", data.data.token);
    //redirect to my dashboard
    this.props.history.push("dashboard");
  }

  handleSignIn(data) {
    console.log("Signed in! Here's your token", data.data.token);
    //Store the token into local storage
    set("auth", data.data.token);
    this.setState({ isLoading: false });
    //redirect to my dashboard
    this.props.history.push("dashboard");
  }

  handleError(err) {
    this.setState({
      errMsg: "Could not log/sign you in",
      error: true,
      isLoading: false,
    });
  }

  formSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    // Uncomment these 2 lines to bypass signin
    // set("auth", "ACCESS TOKEN");
    // this.props.history.push("dashboard");
    let { formFields, type } = this.state;
    let tempObj = {};
    if (type === "signup") {
      tempObj.name = formFields.name.val;
    }
    tempObj.email = formFields.email.val;
    tempObj.password = formFields.password.val; //{name, email, pass}{email, pass}
    if (type === "signup") {
      callAPI(
        "user",
        "post",
        this.handleSignUp.bind(this),
        this.handleError.bind(this),
        tempObj
      );
      return;
    }
    callAPI(
      "auth",
      "post",
      this.handleSignIn.bind(this),
      this.handleError.bind(this),
      tempObj
    );
  }

  render() {
    const { classes } = this.props;

    let {
      isAuthenticated,
      activeTabId,
      formFields,
      error,
      errMsg,
      isLoading,
    } = this.state;

    if (isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }

    return (
      <Grid container className={classes.container}>
        <div className={classes.logotypeContainer}>
          <img src={logo} alt='logo' className={classes.logotypeImage} />
          <Typography className={classes.logotypeText}>
            Asset Inventory
          </Typography>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => this.setState({ activeTabId: id })}
              indicatorColor='primary'
              textColor='primary'
              centered
            >
              <Tab label='Sign In' classes={{ root: classes.tab }} />
              <Tab label='Request Access' classes={{ root: classes.tab }} />
            </Tabs>

            {activeTabId === 0 && (
              <React.Fragment>
                <Typography variant='h5' className={classes.greeting}>
                  Sign in with your Lowe's account
                </Typography>
                <Fade in={error}>
                  <Typography
                    color='secondary'
                    className={classes.errorMessage}
                  >
                    {errMsg}
                  </Typography>
                </Fade>
                <form
                  onSubmit={e => {
                    this.formSubmit(e);
                  }}
                >
                  <div>
                    <TextField
                      type='text'
                      placeholder='Email Adress'
                      value={formFields.email.val}
                      onChange={e => {
                        this.changeFormFields(e, "email");
                      }}
                      InputProps={{
                        classes: {
                          underline: classes.textFieldUnderline,
                          input: classes.textField,
                        },
                      }}
                      margin='normal'
                      fullWidth
                    />
                    {formFields.email.err && (
                      <div className='err'>Please enter a valid email</div>
                    )}
                  </div>
                  <div>
                    <TextField
                      type='password'
                      InputProps={{
                        classes: {
                          underline: classes.textFieldUnderline,
                          input: classes.textField,
                        },
                      }}
                      placeholder='Password'
                      value={formFields.password.val}
                      onChange={e => {
                        this.changeFormFields(e, "password");
                      }}
                      margin='normal'
                      fullWidth
                    />
                    {formFields.password.err && (
                      <div className='err'>
                        Pass must be at-least 6 characters long
                      </div>
                    )}
                  </div>
                  <div className={classes.formButtons}>
                    {isLoading ? (
                      <CircularProgress
                        size={26}
                        className={classes.loginLoader}
                      />
                    ) : (
                      <Button
                        disabled={
                          formFields.email.err || formFields.password.err
                        }
                        variant='contained'
                        color='primary'
                        size='large'
                        type='submit'
                      >
                        Sign In
                      </Button>
                    )}
                    <Button
                      color='primary'
                      size='large'
                      className={classes.forgotButton}
                    >
                      Forgot Password ?
                    </Button>
                  </div>
                </form>
              </React.Fragment>
            )}
            {activeTabId === 1 && (
              <React.Fragment>
                <Typography variant='h5' className={classes.greeting}>
                  Welcome!
                </Typography>
                <Typography variant='h5' className={classes.subGreeting}>
                  Please fill up the form.
                </Typography>
                <Fade in={error}>
                  <Typography
                    color='secondary'
                    className={classes.errorMessage}
                  >
                    {errMsg}
                  </Typography>
                </Fade>

                <form
                  style={{ width: "100%", textAlign: "center" }}
                  onSubmit={e => {
                    this.formSubmit(e);
                  }}
                >
                  <div>
                    <TextField
                      type='text'
                      placeholder='Name'
                      value={formFields.name.val}
                      onChange={e => {
                        this.changeFormFields(e, "name");
                      }}
                      InputProps={{
                        classes: {
                          underline: classes.textFieldUnderline,
                          input: classes.textField,
                        },
                      }}
                      margin='normal'
                      fullWidth
                    />
                    {formFields.name.err && (
                      <div className='err'>Please enter a valid name</div>
                    )}
                  </div>
                  <div>
                    <TextField
                      type='text'
                      placeholder='Email Adress'
                      value={formFields.email.val}
                      onChange={e => {
                        this.changeFormFields(e, "email");
                      }}
                      InputProps={{
                        classes: {
                          underline: classes.textFieldUnderline,
                          input: classes.textField,
                        },
                      }}
                      margin='normal'
                      fullWidth
                    />
                    {formFields.email.err && (
                      <div className='err'>Please enter a valid email</div>
                    )}
                  </div>
                </form>
                <div className={classes.creatingButtonContainer}>
                  {isLoading ? (
                    <CircularProgress size={26} />
                  ) : (
                    <Button
                      type='submit'
                      disabled={formFields.email.err || formFields.name.err}
                      size='large'
                      variant='contained'
                      color='primary'
                      fullWidth
                      className={classes.createAccountButton}
                    >
                      Request Access
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
          <Typography color='primary' className={classes.copyright}>
            © Powered by ISG. All rights reserved.
          </Typography>
        </div>
      </Grid>
    );
  }
}

SignInPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SignInPage));
