import React from "react";
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoUser = this.handleDemoUser.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect to the Tweets page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/tweets");
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user);
  }

  handleDemoUser(user){

    return()=>{

      window.open("http://localhost:3000/#/login","newwindow", "width=810, height=800, top=0 left=600")
      this.props.login(user)
    }

  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>

        <div className="demo-users">
          <p>Log in as: </p>

          <button className="demouser1" onClick={this.handleDemoUser({email: "demo_user_1@gmail.com", password: "aaaaaa"})}>demo_user_1</button>
          <br></br>
          <button className="demouser2" onClick={this.handleDemoUser({email: "demo_user_2@gmail.com",password: "aaaaaa"})}>demo_user_2</button>
          <p className="login-noti">Note: by clicking demo_user_1, you will log in as demo_user_1, and a new window will pop up, so you can login as demo_user_2 by Clicking the button, or you can log in with your existing account or sign up another account to experience two accounts interaction. The same applies to clicking demo_user_2 .</p>
        </div>
        
        <div className="login-form-container">

          <h3 className="logo-text">up</h3>
          <i className="fas fa-cubes"></i>
          <h3 className="logo-text">block</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="signup-form">
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
                className="input"
              />
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
                className="input"
              />
              <button type="submit" className="btn-session">
                Login
              </button>
              <div className="error-msg">{this.renderErrors()}</div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
