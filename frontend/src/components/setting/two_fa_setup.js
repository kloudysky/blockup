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
    const errors = this.props.errors.message;
    if (this.props.verified) {
      return <h1>Your 2FA has been setup</h1>;
    } else {
      return (
        <div className="twofa-container">
          <h1>Please setup Two-Factor Authentication</h1>
          <p>Use this QR code with your Authenticator</p>
          {qrcode.toDataURL(this.props.otpauth_url, function (err, data) {
            imgdata = data;
            console.log(imgdata);
          })}
          <img src={`${imgdata}`} alt="" />
          <form onSubmit={this.handleSubmit}>
            <input
              className="input input-token"
              type="text"
              value={this.state.token}
              onChange={this.update()}
              placeholder="000000"
            />
            <input className="btn-session" type="submit" value="Submit Token" />
          </form>
          <div>
            <p>{errors ? `${errors}` : ""}</p>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.getQrCode()}</div>;
  }
}

export default withRouter(TwoFASetup);
