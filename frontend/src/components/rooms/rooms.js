import React from "react";
import { withRouter } from "react-router-dom";

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.signedIn === true) {
    //   this.props.history.push("/login");
    // }

    // this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let room = {
        name: this.state.name,
    }
    this.props.createRoom(room);
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
      <div className="rooms">
          <form onSubmit={this.handleSubmit}>
              <input 
              className="new-room"
              placeholder="Room name"
              value={this.state.name}
              onChange={this.update("name")}>
              </input>
          </form>
      </div>
    );
  }
}

export default withRouter(Rooms);