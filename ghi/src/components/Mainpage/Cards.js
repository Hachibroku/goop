import React, { useEffect, useState } from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Cards() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  async function loadTopics() {
    const url = "http://localhost:8000/api/topics";
    const response = await fetch(url);
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      setTopics(data);
      console.log("here is our data", data);
    }
  }

  useEffect(() => {
    loadTopics();
  }, []);

  function goToTopicDetail(topicId) {
    navigate(`/comments/${topicId}`);
  }

  return (
    <div className="cards">
      <h1>Check out today's topics!</h1>
      <div className="cards__container">
        {topics.length > 0 && (
          <div className="cards__wrapper">
            {topics.map((topic, index) => (
              <ul
                className="cards__items"
                key={index}
                onClick={() => goToTopicDetail(topic.id)}
              >
                <Link to={`/comment/${topic.id}`}>
                  <CardItem
                    src={topic.image_url}
                    text={topic.description}
                    label={topic.title}
                    path={`/comment/${topic.id}`}
                  />
                </Link>
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Cards;
