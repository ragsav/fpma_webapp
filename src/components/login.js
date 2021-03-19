import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";
import { withStyles } from "@material-ui/styles";

import { Form, Button, Container, Card } from "react-bootstrap";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import Container from "@material-ui/core/Container";

const styles = () => ({
  "@global": {
    body: {
      backgroundColor: "#fff",
    },
  },
  paper: {
    marginTop: 100,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f50057",
  },
  form: {
    marginTop: 1,
  },
  errorText: {
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center",
  },
});

class Login extends Component {
  state = { email: "", password: "" };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };

  render() {
    const { classes, loginError, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <Container
          style={{
            height: "100%",
            margin: "auto",
            padding: 0,
            justifyContent:    "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Card style={{ margin: "auto", padding: 20,    width:    400 }}>
            <Form>
              <p>FPMA login</p>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={this.handleEmailChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={this.handlePasswordChange}
                />
              </Form.Group>
              {/* <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group> */}
              <Button variant="dark" type="submit" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Form>
          </Card>
        </Container>

        // <Container component="main" maxWidth="xs">
        //   <Paper className={classes.paper}>
        //     <Avatar className={classes.avatar}>
        //       <LockOutlinedIcon />
        //     </Avatar>
        //     <Typography component="h1" variant="h5">
        //       Sign in
        //     </Typography>
        //     <TextField
        //       variant="outlined"
        //       margin="normal"
        //       fullWidth
        //       id="email"
        //       label="Email Address"
        //       name="email"
        //       onChange={this.handleEmailChange}
        //     />
        //     <TextField
        //       variant="outlined"
        //       margin="normal"
        //       fullWidth
        //       name="password"
        //       label="Password"
        //       type="password"
        //       id="password"
        //       onChange={this.handlePasswordChange}
        //     />
        //     {loginError && (
        //       <Typography component="p" className={classes.errorText}>
        //         Incorrect email or password.
        //       </Typography>
        //     )}
        //     <Button
        //       type="button"
        //       fullWidth
        //       variant="contained"
        //       color="primary"
        //       className={classes.submit}
        //       onClick={this.handleSubmit}
        //     >
        //       Sign In
        //     </Button>
        //   </Paper>
        // </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Login));
