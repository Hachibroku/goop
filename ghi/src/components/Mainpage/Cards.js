import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <h1>Catch up with previous topics!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="Murpheyimage.png"
              text="Explore my dribbble profile where underlying are my illustrations and more"
              label="Adventure"
              path=""
            />
            <CardItem
              src="Murpheyimage.png"
              text="Travel through the Islands of Bali in a Private Cruise"
              label="Roleplaying"
              path=""
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="Murpheyimage.png"
              text="Set Sail in the Atlantic Ocean visiting Uncharted Waters"
              label="Mystery"
              path=""
            />
            <CardItem
              src="Murpheyimage.png"
              text="Experience Football on Top of the Himilayan Mountains"
              label="Adventure"
              path=""
            />
            <CardItem
              src="Murpheyimage.png"
              text="Ride through the Sahara Desert on a guided camel tour"
              label="Shooter"
              path=""
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
