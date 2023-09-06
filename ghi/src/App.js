import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Create from "./AccountForm";
<<<<<<< HEAD
import Main from "./MainPage";
=======
import About from "./About";
import Login from "./Login";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import Main from "./components/Mainpage/Main";
import Comment from "./components/comments/Comments";
import AccountPage from "./AccountPage";


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
<<<<<<< HEAD
          <Route path="/main" element={<Main currentUser={currentUser} />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} currentUser={currentUser} />} />
=======
          <Route path="/main" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/token" element={<TokenPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/comment" element={<Comment />} />
        </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
  );
}

export default App;
