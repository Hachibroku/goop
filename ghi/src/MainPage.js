import React, {useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useToken, { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { AuthProvider } from './AuthContext';


function MainPage({ currentUser }) {
  useEffect(() => {

  })

  return (
    <AuthProvider>
    <div className="App">
      <header className="App-header">
        <h1>
            If you are seeing this page, {currentUser} is logged in.
        </h1>

      </header>
    </div>
    </AuthProvider>
  );
}

export default MainPage;
