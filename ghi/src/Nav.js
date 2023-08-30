import React, {useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useToken, { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import './Nav.css';


function Nav() {
    const { logout } = useToken();

    const handleLogout = () => {
        logout();
        // window.location.reload();
    }

    const { token } = useAuthContext();
    const [username, setUsername] = useState("")

const fetchData = async () => {
    try {
    const url = "http://localhost:8000/token";
    const response = await fetch(url, {
        credentials: "include",
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsername(data.account.username)
    } else {
        console.log("Error fetching data");
    }
  } catch (error) {}
};
    useEffect(() => {
        fetchData();
    }, []);


    return (
      <nav className="Navbar">
        <img
          src="https://imgur.com/tCGZNdq.jpg"
          alt="logo"
          width="100"
          height="100"
        />

        {username ? (
          <h1 className="token-user">Hello, {username}</h1>
        ) : (
          <h1 className="token-user">Please log in</h1>
        )}

        <ul>
          <li className="nav-item">
            <NavLink to="/create_account">Create Account</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/account">Account</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/main">Home</NavLink>
          </li>

          {/* <li className='nav-item'>
                    <NavLink to='/login'>Login</NavLink>
                </li> */}

          <li className="nav-item">
            <NavLink to="/token">Token</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/comment">Comment</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/about">About</NavLink>
          </li>

          {username ? (
            <li className="nav-item">
              <NavLink to="/login" onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    );
}

export default Nav;
