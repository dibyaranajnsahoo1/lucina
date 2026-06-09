const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true
  },
  phone: {
    type: String
  },
  subject: {
    type: String,
    required: [true, 'Subject is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  inquiryType: {
    type: String,
    enum: ['Intended Parent', 'Egg Donor', 'Clinic Partner', 'General', 'Other'],
    default: 'General'
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Replied', 'Closed'],
    default: 'New'
  },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('ContactForm', contactFormSchema);
