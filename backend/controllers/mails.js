

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

export const inbox = async (req, res) => {
  try {
    const userEmail = req.user.email; 

    // Find emails where the receiverEmail matches the logged-in user's email
    const inboxEmails = await Emails.find({ receiverEmail: userEmail });

    res.status(200).json({ inboxEmails });
  } catch (error) {
    console.error('Error retrieving inbox emails:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const sentbox = async (req, res) => {
  try {
    const userEmail = req.user.email; 

    // Find emails where the receiverEmail matches the logged-in user's email
    const sentboxEmails = await Emails.find({ senderEmail: userEmail });

    res.status(200).json({ sentboxEmails });
  } catch (error) {
    console.error('Error retrieving inbox emails:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getEmailById = async (req, res) => {
  try {
    const emailId = req.params.emailId;

    // Find the email by its ID
    const email = await Emails.findById(emailId);

    if (!email) {
      return res.status(404).json({ message: 'Email not found' });
    }

    res.status(200).json({ email });
  } catch (error) {
    console.error('Error retrieving email details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};