import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { get, callAPI } from "../../helpers/utility";
import Loader from "../Loader";

class Auth extends Component {
  constructor() {
    super();
    this.state = { waiting: true, authorised: false };
  }

  componentDidMount() {
    // Get authToken from Local Storage
    let authToken = get("auth");

    // if authToken isn't found in Local Storage
    if (!authToken) {
      this.setState({ waiting: false, authorised: false });
      return;
    }

    // Send auth token to /api/<version>/auth to validate user
    callAPI(
      "auth",
      "get",
      this.handleAuthorised.bind(this),
      this.handleError.bind(this)
    );
  }

  handleAuthorised(data) {
    // console.log("Authorised!", data.data.message);
    this.setState({ waiting: false, authorised: true });
  }

  handleError(err) {
    this.setState({ waiting: false, authorised: false });
  }

  render() {
    let { waiting, authorised } = this.state;

    if (waiting) return <Loader />;

    if (!waiting && !authorised) return <Redirect to='/' />;

    if (!waiting && authorised)
      return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
export default Auth;
