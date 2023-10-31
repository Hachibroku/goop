import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../mainpage/Button";

import "./TopicDetail.css";

function TopicDetail() {
  const [topic, setTopic] = useState(null);
  const { topicId } = useParams();
  const [userId, setUserId] = useState(null);

  console.log("Current TopicId from useParams:", topicId);

  const fetchTopic = async () => {
    try {
      const url = `http://localhost:8000/api/topics/${topicId}/by_id`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length === 0) {
          console.log("Received empty array from API");
        } else {
          console.log("Data from API:", data);
          setTopic(data[0]);
        }
      } else {
        console.log("API Response not OK");
      }
    } catch (error) {
      console.log("Fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchTopic();
  }, [topicId]);

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
    }
  };

  useEffect(() => {
    fetchTopic();
  }, [topicId]);

  return (
    <>
      {topic && (
        <div className="topic-detail-container">
          <img className="img-box" src={topic.image_url} alt={topic.title} />
          <div className="topic-title">{topic.title}</div>
          <div className="topic-content">{topic.description}</div>

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
      )}
    </>
  );
}

export default TopicDetail;
