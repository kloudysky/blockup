import React from "react";
import { withRouter } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/login");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.signup(user, this.props.history);
  }

  handleDemoUser(user){

    return()=>{

      window.open("http://localhost:3000/#/login","newwindow", "width=810, height=800, top=0 left=600")
      this.props.login(user)
    }

  }

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
          <p className="login-noti">Note: by clicking demo_user_1, you will log in as demo_user_1, and a new window will pop up, so you can login as demo_user_2 by Clicking the button, or you can log in with your existing account or sign up another account to experience two accounts interaction. The same applies to clicking demo_user_2.</p>

        </div>

        <div className="signup-form-container">
    
          <div className="slogan">
            <h3>Why use Blockup?</h3>
            <p>
              You get the peace of mind
              <br /> knowing your messages are safe,
              <br />
              while bots, are Blocked Up
            </p>
          </div>
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
                type="text"
                value={this.state.username}
                onChange={this.update("username")}
                placeholder="Username"
                className="input"
              />
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
                className="input"
              />
              <input
                type="password"
                value={this.state.password2}
                onChange={this.update("password2")}
                placeholder="Confirm Password"
                className="input"
              />
              <button type="submit" className="btn-session">
                Register
              </button>
              <div className="error-msg">{this.renderErrors()}</div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
