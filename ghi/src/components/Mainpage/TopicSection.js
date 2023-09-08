import { Button } from "./Button";
// import { Link } from "react-router-dom";
import "./TopicSection.css";
import React, { useEffect, useState } from "react";


function TopicSection() {
  const [topic, setTopic] = useState(null);
   
  async function loadTopics() {
    const url = "http://localhost:8000/api/topic-of-the-day";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTopic(data);
    }
  }

  useEffect(() => {
    loadTopics();
  }, []);

  return (
    <>
      <div>
        {topic && (
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
    </>
  );
}

export default TopicSection;
