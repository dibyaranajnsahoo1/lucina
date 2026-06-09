const mongoose = require('mongoose');

const findDonorFormSchema = new mongoose.Schema({
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
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required']
  },
  howDidYouHear: {
    type: String,
    enum: ['Google', 'Social Media', 'Friend/Relatives', 'Yelp', 'Other'],
    required: true
  },
  howDidYouHearSpecify: {
    type: String
  },
  needsSurrogate: {
    type: String,
    enum: ['Yes', 'No', '']
  },
  message: {
    type: String
  },
  userType: {
    type: String,
    enum: ['Intended Parent', 'Egg Donor'],
    default: 'Intended Parent'
  },
  utmSource: String,
  utmMedium: String,
  utmCampaign: String,
  status: {
    type: String,
    enum: ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'],
    default: 'New'
  },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('FindDonorForm', findDonorFormSchema);
