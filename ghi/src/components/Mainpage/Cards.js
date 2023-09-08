import React, { useEffect, useState } from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import { Link } from "react-router-dom";

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
        {topics.length > 0 && (
          <div className="cards__wrapper">
            {topics.map((topic, index) => (
              <ul className="cards__items" key={index}>
                <Link to={`/topics/${topic.id}`}></Link>
                <CardItem
                  src={topic.image_url}
                  text={topic.description}
                  label={topic.title}
                  path={`/topics/${topic.id}`}
                />
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cards;



//   return (
//     <div className="cards">
//       <h1>Catch up with previous topics!</h1>
//       <div className="cards__container">
//         {topics &&(
//           <div className="cards__wrapper">
//             <ul className="cards__items">
//               <CardItem
//                 src={topics.image_url}
//                 text={topics.description}
//                 label={topics.title}
//                 path=""
//               />
//               <CardItem
//                 src={topics.image_url}
//                 text={topics.description}
//                 label={topics.title}
//                 path=""
//               />
//             </ul>
//             <ul className="cards__items">
//               <CardItem
//                 src={topics.image_url}
//                 text={topics.description}
//                 label={topics.title}
//                 path=""
//               />
//               <CardItem
//                 src={topics.image_url}
//                 text={topics.description}
//                 label={topics.title}
//                 path=""
//               />
//               <CardItem
//                 src={topics.image_url}
//                 text={topics.description}
//                 label={topics.title}
//                 path=""
//               />
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Cards;
