
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Sentbox = () => {
  const [sentboxEmails, setSentboxEmails] = useState([]);
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    const fetchSentboxEmails = async () => {
      try {
        const response = await axios.get('http://localhost:6500/mail/sentbox', {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual access token
          },
        });

        setSentboxEmails(response.data.sentboxEmails);
      } catch (error) {
        console.error('Error fetching inbox emails:', error);
      }
    };

    fetchSentboxEmails();
  }, [token]);

  return (
    <div className="container mt-5">
      <h2>Sentbox</h2>
      <ul className="list-group">
        {sentboxEmails.map((email) => (
          <li key={email._id} className="list-group-item">
            <Link to={`/email/${email._id}` } className="text-dark text-decoration-none">
              <strong>{email.subject}</strong>  to {email.receiverEmail}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sentbox;
