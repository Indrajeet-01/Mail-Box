
import Inbox from '../models/inbox.js'
import Sentbox from '../models/sentbox.js';

// Create and send email
export const createAndSendEmail = async (req, res) => {
  try {
    const { content, receiverEmail, subject } = req.body;
    const senderEmail = req.user.email; 
    console.log(senderEmail)

    // Save email to Inbox
    const inboxEmail = new Inbox({
      content,
      senderEmail,
      subject,
    });
    await inboxEmail.save();

    // Save email to Sentbox
    const sentboxEmail = new Sentbox({
      content,
      receiverEmail,
      subject,
    });
    await sentboxEmail.save();

    res.status(201).json({ message: 'Email created and sent successfully' });
  } catch (error) {
    console.error('Error creating and sending email:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
