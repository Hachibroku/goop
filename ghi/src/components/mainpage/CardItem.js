import React from "react";
import "./CardItem.css";

function CardItem(props) {
  return (
    <div>
      <li className="cards__item" key={props.id}>
        <a className="cards__item__link" href={props.path}>
          <figure className="cards__item__pic-wrap" data-category={props.label}>
            <img
              className="cards__item__img"
              alt="Travel"
              src={props.src}
            />
          </figure>
          <div className="cards__item__info">
            <h5 className="cards__item__text">{props.text}</h5>
          </div>
        </a>
      </li>
    </div>
  );
}

export default CardItem;
