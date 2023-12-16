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

  const markAsRead = async (emailId) => {
    try {
      // Call an API endpoint to mark the email as read
      const response = await axios.put(
        `http://localhost:6500/mail/read/${emailId}`,
        null,  // Set the request body to null if not sending data
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual access token
          },
        }
      );
  
      if (response.status === 200) {
        // Update the local state accordingly
        setInboxEmails(prevEmails =>
          prevEmails.map(email =>
            email._id === emailId ? { ...email, unread: false } : email
          )
        );
      } else {
        console.error('Error marking email as read:', response.statusText);
      }
    } catch (error) {
      console.error('Error marking email as read:', error);
    }
  };
  

  return (
    <div className="container mt-5">
  <h2>Inbox</h2>
  <ul className="list-group">
    {inboxEmails.map((email) => (
      <li key={email._id} className="list-group-item d-flex justify-content-between align-items-center">
        <Link
          to={`/email/${email._id}`}
          className={`text-dark text-decoration-none d-flex align-items-center ${email.unread ? 'unread' : ''}`}
          onClick={() => markAsRead(email._id)}
        >
          {email.unread && <span className="badge bg-primary me-2">●</span>}
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
