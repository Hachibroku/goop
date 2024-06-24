import React, { useEffect, useState } from "react";
import { Button } from "./Button.js";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import CardItem from "./CardItem.js";
import "./TopicSection.css";

function TopicSection() {
  const [topic, setTopics] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = document.cookie
      .split("; ")
      .find((row) => row.startsWith("yourCookieName="));
    if (jwt) {
      const decodedJwt = jwt_decode(jwt.split("=")[1]);
      setUserId(decodedJwt.id);
    }

    loadTopics();
  }, []);

  const loadTopics = async () => {
    const url = "http://localhost:8000/api/topic-of-the-day";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTopics(data);
    }
  };

  const handleAgreeClick = () => {
    recordVote("agree");
  };

  const handleDisagreeClick = () => {
    recordVote("disagree");
  };

  const recordVote = async (voteType) => {
    if (topic && topic.id && userId) {
      const url = `http://localhost:8000/api/topics/${topic.id}/vote`;
      const payload = {
        user_id: userId,
        vote_type: voteType,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate(`/comments/${topic.id}`);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div onClick={() => navigate(`/comments/${topic?.id}`)}>
          <h2>Promoted Topic</h2>
          {topic && (
            <CardItem
              promoted
              src={topic.image_url}
              text={topic.description}
              label={topic.title}
              path={`/comments/${topic.id}`}
              id={topic.id}
            />
          )}
        </div>
        <div className="buttons">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            onClick={handleAgreeClick}
          >
            AGREE
          </Button>
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            onClick={handleDisagreeClick}
          >
            DISAGREE
          </Button>
        </div>
      </div>
    </>
  );
}

export default TopicSection;
