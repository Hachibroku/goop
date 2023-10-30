import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TopicDetail.css";

function TopicDetail() {
  const [topic, setTopic] = useState(null);
  const { topicId } = useParams();

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
    console.log("useEffect Triggered");
    fetchTopic();
  }, [topicId]);

  console.log("Current Topic State:", topic);

  return (
    <>
      {topic && (
        <div className="topic-detail-container">
          <img className="img-box" src={topic.image_url} alt={topic.title} />
          <div className="topic-title">{topic.title}</div>
          <div className="topic-content">{topic.description}</div>
        </div>
      )}
    </>
  );
}

export default TopicDetail;
