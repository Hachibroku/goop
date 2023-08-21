import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Nav';
import Main from './MainPage';
import Construct from "./Construct.js";

import ErrorNotification from "./ErrorNotification";
import "./App.css";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Nav />

        <ErrorNotification error={error} />

        <Routes>
          <Route path="/construct" element={<Construct info={launchInfo} />} />
        </Routes>

        <Routes>
          <Route path="/main" element={<Main info={launchInfo} />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
