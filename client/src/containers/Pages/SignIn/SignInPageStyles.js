export const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  logotypeContainer: {
    backgroundColor: "#002e66",
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logotypeImage: {
    width: 165,
    marginBottom: "32px",
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
  },
  formContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: 320,
  },
  tab: {
    fontWeight: 400,
    fontSize: 18,
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: "32px",
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: "16px",
  },
  googleButton: {
    marginTop: "48px",
    boxShadow:
      "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    backgroundColor: "white",
    width: "100%",
    textTransform: "none",
  },
  googleButtonCreating: {
    marginTop: 0,
  },
  googleIcon: {
    width: 30,
    marginRight: "16px",
  },
  creatingButtonContainer: {
    marginTop: "20px",
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },
  formDividerContainer: {
    marginTop: "32px",
    marginBottom: "32px",
    display: "flex",
    alignItems: "center",
  },
  formDividerWord: {
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: "#B9B9B940",
  },
  errorMessage: {
    textAlign: "center",
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: "#536DFE",
    },
    "&:after": {
      borderBottomColor: "#536DFE",
    },
    "&:hover:before": {
      borderBottomColor: `${"#536DFE"} !important`,
    },
  },
  textField: {
    borderBottomColor: "#F3F5FF",
  },
  formButtons: {
    width: "100%",
    marginTop: "32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotButton: {
    textTransform: "none",
    fontWeight: 400,
  },
  loginLoader: {
    marginLeft: "32px",
  },
  copyright: {
    marginTop: "32px",
    whiteSpace: "nowrap",
  },
};
