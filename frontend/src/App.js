import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import socketIOClient from "socket.io-client";
import Header from "./components/Header/Header";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import Home from "./components/Home/Home";
import ViewSessions from "./components/ViewSessions/ViewSessions";
<<<<<<< HEAD
import CreateSession from "./components/CreateSession/CreateSession";
=======
import SessionView from "./components/SessionView/SessionView";
import Audience from "./components/Audience/Audience";
>>>>>>> 9753c5d0a281d4bd6e24116e8ed557c2ba6e19f1

class App extends Component {
  state = {
    signedInUser: false,
    endpoint: "http://localhost:5000"
  };

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("test event", data => {
      console.log(data, "data logged");
    });
  }

  render() {
    const { endpoint } = this.state;
    const { signedInUser } = this.state;
    console.log(signedInUser);
    return (
      <div className="App">
        {/* <p className="component-identifier">app component</p> */}
        <Header signedInUser={signedInUser} signUserOut={this.signUserOut} />
        <Router>
          <Home signUserIn={this.signUserIn} default />
          <RegisterUser path="/register" />
          <ViewSessions path="/sessions" signedInUser={signedInUser} />
<<<<<<< HEAD
          <CreateSession path="/create-session" signedInUser={signedInUser} />
=======
          <SessionView
            path="/sessions/:session_name"
            signedInUser={signedInUser}
          />
          <Audience path="/joined-session/:room_code" />
>>>>>>> 9753c5d0a281d4bd6e24116e8ed557c2ba6e19f1
        </Router>
      </div>
    );
  }

  socketTest = event => {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    socket.emit("btn click", "connected to react");
  };

  signUserIn = user => {
    this.setState({ signedInUser: user });
  };

  signUserOut = () => {
    this.setState({ signedInUser: false });
  };
}

export default App;

{
  /* <Router>
          <SignIn
            path="/signIn"
            signUserIn={this.signUserIn}
            signUserOut={this.signUserOut}
          />
          {/* <StudentSessionCode path="/join-session" endpoint={endpoint} /> */
}
{
  /* <AdminSetRoom path="/admin-set-room" endpoint={endpoint} />
          <ViewSessions path="/my-sessions" signedInUser={signedInUser} />
          <SessionView
            path="/my-sessions/:session_name"
            signedInUser={signedInUser}
          />
          <RegisterUser path="/register" />
          <CreateSession path="/create-session" />
        </Router>
        <button onClick={this.socketTest}>test socket</button> */
}
