// Inbox.js

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Inbox = () => {
  const [inboxEmails, setInboxEmails] = useState([]);
  const token = useSelector(state => state.user.token);

  const handleDelete = async (emailId) => {
    try {
      const response = await axios.delete(`http://localhost:6500/mail/delete/${emailId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // If the deletion is successful, update the inboxEmails state
        setInboxEmails((prevEmails) => prevEmails.filter((email) => email._id !== emailId));
      } else {
        console.error('Error deleting email:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };


  useEffect(() => {
    const fetchInboxEmails = async () => {
      try {
        const response = await axios.get('http://localhost:6500/mail/inbox', {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual access token
          },
        });

        setInboxEmails(response.data.inboxEmails);
      } catch (error) {
        console.error('Error fetching inbox emails:', error);
      }
    };

    fetchInboxEmails();
  }, [token]);

  return (
    <div className="container mt-5">
      <h2>Inbox</h2>
      <ul className="list-group">
      {inboxEmails.map((email) => (
          <li key={email._id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/email/${email._id}`} className="text-dark text-decoration-none">
              <strong>{email.subject}</strong> from {email.senderEmail}
            </Link>
            <span
              className="badge bg-danger rounded-pill"
              onClick={() => handleDelete(email._id)}
              style={{ cursor: 'pointer' }}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
