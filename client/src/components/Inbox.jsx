import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/auth';
// Import statements...

const Inbox = () => {
    const { authState } = useAuth();
    const [inboxEmails, setInboxEmails] = useState([]);
  
    useEffect(() => {
      const fetchInboxEmails = async () => {
        const { user } = authState;
        if (!user || !user.email) {
          console.error('User or user.email is undefined');
          return;
        }
  
        try {
          const receiverEmailRef = encodeURIComponent(user.email.replace(/[@.]/g, ''));
          const inboxResponse = await fetch(
            `https://mail-box-1415b-default-rtdb.asia-southeast1.firebasedatabase.app/${receiverEmailRef}/Inbox.json`
          );
  
          if (inboxResponse.ok) {
            const inboxData = await inboxResponse.json();
            if (inboxData) {
              const inboxEmailsArray = Object.entries(inboxData).map(([emailId, emailData]) => ({
                id: emailId,
                ...emailData,
              }));
              setInboxEmails(inboxEmailsArray);
            }
          } else {
            console.error('Failed to fetch inbox emails:', inboxResponse.statusText);
          }
        } catch (error) {
          console.error('Error fetching inbox emails:', error);
        }
      };
  
      fetchInboxEmails();
    }, [authState]);
  
    const handleDeleteEmail = async (emailId) => {
      const { user } = authState;
      if (!user || !user.email) {
        console.error('User or user.email is undefined');
        return;
      }
  
      try {
        const receiverEmailRef = encodeURIComponent(user.email.replace(/[@.]/g, ''));
        const inboxDeleteResponse = await fetch(
          `https://mail-box-1415b-default-rtdb.asia-southeast1.firebasedatabase.app/${receiverEmailRef}/Inbox/${emailId}.json`,
          { method: 'DELETE' }
        );
  
        if (inboxDeleteResponse.ok) {
          const updatedEmails = inboxEmails.filter((email) => email.id !== emailId);
          setInboxEmails(updatedEmails);
          console.log('Email deleted successfully!');
        } else {
          console.error('Failed to delete email from Inbox:', inboxDeleteResponse.statusText);
        }
      } catch (error) {
        console.error('Error deleting email:', error);
      }
    };
  
    return (
      <div className="container mt-3">
        <h2>Inbox</h2>
        <ul className="list-group">
          {inboxEmails.map((email) => (
            <li key={email.id} className="list-group-item d-flex justify-content-between align-items-center">
              <Link to={`/inbox/${email.id}`}>{email.subject}</Link>
              <button className="btn btn-danger" onClick={() => handleDeleteEmail(email.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Inbox;
  