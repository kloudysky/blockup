import React from "react";
import qrcode from "qrcode";
import { withRouter } from "react-router-dom";

class TwoFASetup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Please setup with your Authenticator</h1>
        {qrcode.toDataURL(this.props.otpauth_url, function (err, data) {
          console.log(data);
        })}
      </div>
    );
  }
}

export default withRouter(TwoFASetup);
