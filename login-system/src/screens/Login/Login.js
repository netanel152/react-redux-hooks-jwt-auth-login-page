import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ActionCreators } from "../../actions/profile";
import { getStore, setStore, isValidEmail, isValidPassword } from "../../utils";

import "./style.css";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
      },
      errors: {
        email: "Enter Email Address!",
        password: "Enter Password!",
      },
      loginStatus: "",
      submitted: false,
    };
  }

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.validationErrorMessage(event);
  };

  validationErrorMessage = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "email":
        errors.user.email = isValidEmail(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.user.password = isValidPassword(value) ? "Enter Password" : "";
        break;
      default:
        break;
    }
    this.setState({ errors });
  };

  // validateForm = (errors) => {
  //   let valid = true;
  //   console.log(errors);
  //   Object.entries(errors).forEach((item) => {
  //     console.log(item);
  //     item && item[1].length > 0 && (valid = false);
  //   });
  //   console.log(valid);
  //   return valid;
  // };

  loginForm = async (event) => {
    this.setState({ submitted: true });
    event.preventDefault();

    console.info("Valid Form");
    const userExist = getStore("user");
    if (userExist) {
      this.props.dispatch(ActionCreators.login(userExist));
      this.props.history.push("/info");
    } else if (!userExist) {
      console.log("this.user", this.props.user);
      const newUser = setStore("user", this.props.user);
      this.props.dispatch(ActionCreators.login(newUser));
      this.props.history.push("/info");
    } else {
      this.setState({
        loginStatus: "Login Failed! Invalid Email and Password",
      });
    }
  };

  render() {
    const { email, password, errors, submitted, loginStatus } = this.state;
    return (
      <div className="pagecenter loginForm">
        <form>
          <div className="row">
            <div className="col-sm-3"></div>
            <label htmlFor="username" className="col-sm-2 col-form-label">
              User Name:
            </label>
            <div className="col-sm-3 mb-2">
              <input
                type="text"
                value={email}
                name="email"
                onChange={(e) => {
                  this.inputChange(e);
                }}
                className="form-control"
                id="email"
                placeholder="example@gmail.com"
              />
              {submitted && errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
            </div>
            <div className="col-sm-4"></div>
          </div>
          <div className="row">
            <div className="col-sm-3"></div>
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password:
            </label>
            <div className="col-sm-3 mb-2">
              <input
                type="password"
                value={password}
                autoComplete="on"
                name="password"
                onChange={(e) => {
                  this.inputChange(e);
                }}
                className="form-control"
                id="password"
                placeholder="Password"
              />
              {submitted && errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="col-sm-4"></div>
          </div>
          <div className="row">
            <div className="col-sm-12 center mt-1">
              {submitted && loginStatus.length > 0 && (
                <span className="error">{loginStatus}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 center mt-2">
              <button type="submit" className="button" onClick={this.loginForm}>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
};

export default connect(mapStateToProps)(withRouter(Login));
