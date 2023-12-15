import mongoose from "mongoose";

const allEmailSchema = new mongoose.Schema({
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
  receiverEmail: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Emails = mongoose.model('Emails', allEmailSchema);

export default Emails