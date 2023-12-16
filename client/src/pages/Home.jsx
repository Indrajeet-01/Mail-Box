import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="display-4 mb-4">Welcome to Mailbox App</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Compose Email</h5>
              <p className="card-text">Create and send new emails to your contacts.</p>
              <Link to="/create-mail" className="btn btn-primary">
                Compose
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Inbox</h5>
              <p className="card-text">View and manage your received emails.</p>
              <Link to="/inbox" className="btn btn-success">
                Go to Inbox
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
