import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./TopicSection.css";

function TopicSection() {
  return (
    <div className="topic-container">
      <h1>THIS IS WHERE TOPIC OF THE DAY DESCRIPTION WOULD GO</h1>
      <div className="topic-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          AGREE
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          DISAGREE
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          VOTE HERE
        </Button>
      </div>
    </div>
  );
}

export default TopicSection;
