import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Create from "./AccountForm";
import Main from "./MainPage";
import Login from "./Login";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";


const baseUrl="http://localhost:8000"


function App() {
  const [currentUser, setCurrentUser] = useState(null);


  return (
    <AuthProvider baseUrl={baseUrl}>
    <div>
      <BrowserRouter>
        <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Routes>
          <Route path="/create_account" element={<Create />} />
          <Route path="/main" element={<Main currentUser={currentUser} />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} currentUser={currentUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
  );
}

export default App;
