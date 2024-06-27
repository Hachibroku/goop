import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Nav from "./Nav";
import Create from "./AccountForm";
import About from "./About";
import Login from "./Login";
import Home from "./components/mainpage/Home";
import Detail from "./components/detail/Detail";
import AccountPage from "./AccountForm";

const baseUrl = "http://localhost:8000";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AuthProvider baseUrl={baseUrl}>
      <div>
        <BrowserRouter>
          <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
          <Routes>
            <Route path="/create_account" element={<Create />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/login"
              element={
                <Login
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<AccountPage />} />
            <Route
              path="/comments/:topicId"
              element={<Detail currentUser={currentUser} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
