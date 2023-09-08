import React, { useEffect, useState } from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import axios from "axios";

function Cards() {
  const [topics, setTopics] = useState([]);

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

  return (
    <div className="cards">
      <h1>Catch up with previous topics!</h1>
      <div className="cards__container">
        {topics.map((topic) => (
          <div className="cards__wrapper">
            <ul className="cards__items">
              <CardItem
                src={topic.image_url}
                text={topic.description}
                label={topic.title}
                path={topic.id}
              />
              <CardItem
                src={topic.image_url}
                text={topic.description}
                label={topic.title}
                path=""
              />
            </ul>
            <ul className="cards__items">
              <CardItem
                src={topic.image_url}
                text={topic.description}
                label={topic.title}
                path=""
              />
              <CardItem
                src={topic.image_url}
                text={topic.description}
                label={topic.title}
                path=""
              />
              <CardItem
                src={topic.image_url}
                text={topic.description}
                label={topic.title}
                path=""
              />
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
