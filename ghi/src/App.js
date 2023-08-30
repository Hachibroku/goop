import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Construct from "./Construct";
import Create from "./AccountForm";
import Main from "./MainPage";
import Trending from "./Trending";
import Archive from "./Archive";
import About from "./About";
import Login from "./Login";
import TokenPage from "./TokenPage";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
// import ErrorNotification from "./ErrorNotification";
import "./App.css";

const baseUrl="http://localhost:8000"


function App() {
  // const [launchInfo, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
  //     console.log("fastapi url: ", url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, []);


  return (
    <AuthProvider baseUrl={baseUrl}>
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/construct" element={<Construct />} />
          <Route path="/create_account" element={<Create />} />
          <Route path="/main" element={<Main />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/token" element={<TokenPage />} />
        </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
  );
}

export default App;
