// models/InboxEmail.js
import mongoose from "mongoose";

const inboxEmailSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
      },
  content: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
  },
  
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Inbox = mongoose.model('Inbox', inboxEmailSchema);

export default Inbox
