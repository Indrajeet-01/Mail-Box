import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/auth';

const CreateMail = () => {
  const { authState } = useAuth();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [receiverEmail, setReceiverEmail] = useState('');
  const [subject, setSubject] = useState('');

  // Import necessary libraries and dependencies
  const handleSend = async () => {
    const { user } = authState;
    if (!user || !user.email) {
      console.error('User or user.email is undefined');
      return;
    }

    try {
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);

      // Save email to 'emails' collection
      const senderEmail = user.email.replace(/[@.]/g, '');
      const senderEmailRef = encodeURIComponent(senderEmail);
      const receiverEmailRef = encodeURIComponent(receiverEmail);

      // Sending to SentMail in the Realtime Database
      const sentMailResponse = await fetch(
        `https://mail-box-1415b-default-rtdb.asia-southeast1.firebasedatabase.app/${senderEmailRef}/SentMail.json`,
        {
          method: 'POST',
          body: JSON.stringify({
            content: rawContentState,
            receiverEmail: receiverEmail,
            subject: subject,
            timestamp: new Date().toISOString(),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const sentMailData = await sentMailResponse.json();
      console.log('SentMail Response:', sentMailData);

      // Sending to Inbox in the Realtime Database
      const inboxResponse = await fetch(
        `https://mail-box-1415b-default-rtdb.asia-southeast1.firebasedatabase.app/${receiverEmailRef}/Inbox.json`,
        {
          method: 'POST',
          body: JSON.stringify({
            content: rawContentState,
            senderEmail: user.email,
            subject: subject,
            timestamp: new Date().toISOString(),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const inboxData = await inboxResponse.json();
      console.log('Inbox Response:', inboxData);

      console.log('Email sent successfully!');
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
