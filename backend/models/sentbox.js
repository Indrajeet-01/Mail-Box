import mongoose from "mongoose";

const sentboxEmailSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
      },
  content: {
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

const Sentbox = mongoose.model('Sentbox', sentboxEmailSchema);

export default Sentbox