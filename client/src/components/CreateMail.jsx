import React, { useState } from 'react';
import axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';

const CreateMail = () => {
  const dispatch = useDispatch();
  const {token,email} = useSelector(state => state.user);
  console.log(token,email)

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [receiverEmail, setReceiverEmail] = useState('');
  const [subject, setSubject] = useState('');

  // Import necessary libraries and dependencies
  const handleSend = async () => {
    
    if ( !token) {
      console.error('User, user.email, or token is undefined');
      return;
    }

    try {
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);

      // Create an object with email data
      const emailData = {
        content: rawContentState,
        receiverEmail,
        subject,
      };

      // Use Axios to send the email data to your Node.js backend
      const response = await axios.post('http://localhost:6500/mail/create-send', emailData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        console.log('Email sent successfully!');
        
        // You may want to redirect the user or show a success message here
      } else {
        console.error('Error sending email:', response.statusText);
        // Handle the error, show an error message, or redirect the user
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <label className="form-label">To:</label>
        <input
          type="email"
          className="form-control"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Subject:</label>
        <input
          type="text"
          className="form-control"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-3" style={{ border: '1px solid #ccc', borderRadius: '4px', minHeight: '400px', overflow: 'auto' }}>
          <label className="form-label">Email Content:</label>
          <Editor
            editorState={editorState}
            onEditorStateChange={(newEditorState) => setEditorState(newEditorState)}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'remove', 'history'],
            }}
          />
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleSend}>
        Send Email
      </button>
    </div>
  );
};

export default CreateMail;
