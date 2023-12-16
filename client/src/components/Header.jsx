// Header.jsx

import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logoutUser } from '../context/actions/auth';


const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser(token));
    navigate('/auth')
  };

  useEffect(() => {
    
    return () => {
      
    };
  }, [token, dispatch]);


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
            {token ? (
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
