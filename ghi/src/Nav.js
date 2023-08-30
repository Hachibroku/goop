import React from 'react';
import { NavLink } from 'react-router-dom';
// import './Nav.css';
function Nav() {
    return (
      <nav className="Navbar">
        <img
          src="https://imgur.com/tCGZNdq.jpg"
          alt="logo"
          width="100"
          height="100"
        />
        <ul>
          <li className="nav-item">
            <NavLink to="/create_account">Create Account</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/account">Account</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/main">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/comment">Comment</NavLink>
          </li>
        </ul>
      </nav>
    );
}
export default Nav;
