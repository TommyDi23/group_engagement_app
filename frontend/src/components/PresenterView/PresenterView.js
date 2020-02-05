import React, { Component } from "react";
import "./PresenterView.css";
import * as api from "../api";
import PromptQuestionCard from "./PromptQuestionCard";

class PresenterView extends Component {
  state = {
    sessionData: {},
    isLoading: true
  };

  // const { sessionCode, signedInUser } = props;

  componentDidMount() {
    this.fetchSession();
  }
  // console.log(props, "<<<<<<<<");
  // console.log(">>>>", sessionCode);

  render() {
    const { isLoading, sessionData } = this.state;
    const { sessionCode, endpoint } = this.props;
    console.log(sessionData);
    console.log(endpoint);
    if (isLoading) {
      return <p>LoadingHIYA....</p>;
    }

    return (
      <div id="session-view-container">
        {/* <p className="component-identifier">PresenterView component</p> */}
        <div id="session-view-header">
          <h3>{sessionCode}</h3>
          <p>Abort Session</p>
        </div>
        <p>Connected users: _______</p>
        <div id="live-data-view">live-data-view</div>
        <ul>
          {sessionData.questions &&
            sessionData.questions.map(question => {
              console.log(sessionData);
              return (
                <PromptQuestionCard
                  endpoint={endpoint}
                  question={question}
                  answers={sessionData.questions[question]}
                  sessionData={this.state.sessionData}
                  key={question}
                />
              );
            })}
        </ul>
      </div>
    );
  }

  fetchSession = () => {
    // console.log("fething sessions...");
    const { session_name } = this.props;

    console.log("SESSION ", session_name);
    api.getSingleSession("JessJelly", session_name).then(data => {
      console.log(data, "an array?");
      this.setState({ sessionData: data, isLoading: false });
    });
  };
}

export default PresenterView;
