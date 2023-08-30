import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Create from "./AccountForm";
import About from "./About";
import Login from "./Login";
import AccountPage from "./AccountPage";

import ErrorNotification from "./ErrorNotification";
import "./App.css";


import Navbar from "./MySrc/Navbar";
import Home from "./components/pages/Home";
import Comment from "./comments/Comments";

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
        {/* <Navbar /> */}

        <ErrorNotification error={error} />

        <Routes>
          <Route
            path="/create_account"
            element={<Create info={launchInfo} />}
          />
        </Routes>

        <Routes>
          <Route path="/login" element={<Login info={launchInfo} />} />
        </Routes>

        <Routes>
          <Route path="/about" element={<About info={launchInfo} />} />
        </Routes>

        <Routes>
          <Route path="/main" element={<Home info={launchInfo} />} />
        </Routes>

        <Routes>
          <Route path="/account" element={<AccountPage info={launchInfo} />} />
        </Routes>

        <Routes>
          <Route path="/comment" element={<Comment info={launchInfo} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
