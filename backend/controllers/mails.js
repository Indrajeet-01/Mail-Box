

import Emails from '../models/emails.js';

// Create and send email
export const createAndSendEmail = async (req, res) => {
  try {
    const { content, receiverEmail, subject } = req.body;
    const senderEmail = req.user.email; 
    console.log(senderEmail)

    const contentString = JSON.stringify(content);

    const Email = new Emails({
      content: contentString,
      receiverEmail,  
      senderEmail,
      subject,
    });
    await Email.save();

    res.status(201).json({ message: 'Email created and sent successfully' });
  } catch (error) {
    console.error('Error creating and sending email:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
