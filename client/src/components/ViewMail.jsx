// EmailDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewMail = () => {
  const { emailId } = useParams(); // Assuming you have React Router set up for navigation
  const [email, setEmail] = useState(null);
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    const fetchEmailDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:6500/mail/${emailId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual access token
          },
        });

        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching email details:', error);
      }
    };

    fetchEmailDetails();
  }, [emailId,token]);

  if (!email) {
    return <div>Loading...</div>;
  }

  const formattedTimestamp = new Date(email.timestamp).toLocaleString('en-US', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  console.log('Content:', email.content);

  const textContent = email.content?.blocks
    ? email.content.blocks.map(block => block.text).join('\n')
    : '';

  return (
    <div className="container mt-5">
      <h2>Email Details</h2>
      <div>
        <strong>Subject:</strong> {email.subject}
      </div>
      <div>
        <strong>Sender:</strong> {email.senderEmail}
      </div>
      <div>
        <strong>Receiver:</strong> {email.receiverEmail}
      </div>
      <div>
        <strong>Timestamp:</strong> {formattedTimestamp}
      </div>
      <div className="mt-3">
        <strong>Content:</strong>
        <pre>{textContent}</pre>
      </div>
    </div>
  );
};

export default ViewMail;
