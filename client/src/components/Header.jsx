// Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
  const { authState, dispatch } = useAuth();

  const handleLogout = () => {
     dispatch({ type: 'SIGN_OUT' });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center align-items-between ">
      <div className="container d-flex justify-content-evenly">
        <Link to="/" className="navbar-brand">
          Mailer App
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/inbox" className="nav-link">
                Inbox
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sentbox" className="nav-link">
                Sent Mail
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create-mail" className="nav-link">
                Create Mail
              </Link>
            </li>
          </ul>

          <div className="navbar-nav ml-auto">
            {authState.token ? (
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/auth" className="btn btn-outline-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
