// Inbox.js

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Inbox = () => {
  const [inboxEmails, setInboxEmails] = useState([]);
  const token = useSelector(state => state.user.token);

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
          <li key={email._id} className="list-group-item">
            <Link to={`/email/${email._id}`} className="text-dark text-decoration-none">
              <strong>{email.subject}</strong> from {email.senderEmail}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
