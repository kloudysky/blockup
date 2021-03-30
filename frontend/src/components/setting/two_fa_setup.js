import React from "react";
import qrcode from "qrcode";
import { withRouter } from "react-router-dom";

class TwoFASetup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      token: "",
      verified: this.props.verified,
    };
  }

  componentDidMount() {
    this.setState({ verified: this.props.verified });
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      token: this.state.token,
      userId: this.props.currentUser.id,
    };

    this.props.verifyTwoFA(data);
    this.setState({ token: "" });
    //this.props.history.push("/moneyform");
  }

  update() {
    return (e) =>
      this.setState({
        token: e.currentTarget.value,
      });
  }

  getQrCode() {
    let imgdata;
    if (this.props.verified) {
      return <h1>Your 2FA has been setup</h1>;
    } else {
      return (
        <div>
          <h1>Please setup with your Authenticator</h1>
          {qrcode.toDataURL(this.props.otpauth_url, function (err, data) {
            imgdata = data;
            console.log(imgdata);
          })}
          <img src={`${imgdata}`} alt="" />
          <form onSubmit={this.handleSubmit}>
            <label>Enter Token:</label>
            <input
              type="text"
              value={this.state.token}
              onChange={this.update()}
              placeholder="000000"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }

  render() {
    return <div>{this.getQrCode()}</div>;
  }
}

export default withRouter(TwoFASetup);
