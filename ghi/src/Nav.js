import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';
import './Nav.css';


function Nav({ currentUser, setCurrentUser }) {
    const { logout } = useToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setCurrentUser(null);
        navigate("/login");
    }


    return (
        <nav className='Navbar'>
            <img src='https://imgur.com/tCGZNdq.jpg' alt='logo' width='100' height='100' />

            {currentUser ? (
            <h1 className="token-user">Hello, {currentUser}</h1> ) : (
            <h1 className="token-user">Please log in</h1>
            )}

            <ul>
                <li className='nav-item'>
                    <NavLink to='/create_account'>Create Account</NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink to='/account'>Account</NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink to='/main'>Home</NavLink>
                </li>

                {currentUser ? (
                <li className='nav-item'>
                    <NavLink to='/login' onClick={handleLogout}>Logout</NavLink>
                </li> ) : (  <li className='nav-item'>
                    <NavLink to='/login'>Login</NavLink>
                </li> )}

            </ul>
        </nav>
    );
}

export default Nav;
