import { Button } from "./Button";
import "./TopicSection.css";
import React, { useEffect, useState } from "react";

function TopicSection() {
  const [topic, setTopics] = useState(null);

  async function loadTopics() {
    const url = "http://localhost:8000/api/topic-of-the-day";
    const response = await fetch(url);
    console.log(response)
    if (response.ok) {
      const data = await response.json();
      setTopics(data);
      console.log("here is our data",data);
    }
  }

  useEffect(() => {
    loadTopics();
  }, []);

  return (
    <>
      <div>
        {topic &&(
          <div className="topic-container">
            <img className="img-box" src={topic.image_url} alt={topic.title} />
            <div className="text-title">{topic.title}</div>
            <div className="text-description">
              {topic.description}
            </div>
          </div>
        )}
      </div>
      <div className="buttons">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          AGREE
        </Button>
      {/* </div>
      <div className="disagree"> */}
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          DISAGREE
        </Button>
      {/* </div>
      <div className="vote-here"> */}
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          VOTE HERE
        </Button>
      </div>
    </>
  );
}


export default TopicSection;
