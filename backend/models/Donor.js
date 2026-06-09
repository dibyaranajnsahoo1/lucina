const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  donorId: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: 19,
    max: 31
  },
  height: {
    feet: { type: Number },
    inches: { type: Number }
  },
  weight: {
    type: Number
  },
  eyeColor: {
    type: String,
    enum: ['Blue', 'Light Blue', 'Dark Blue', 'Brown', 'Light Brown', 'Dark Brown', 'Green', 'Hazel']
  },
  hairColor: {
    type: String,
    enum: ['Black', 'Blonde', 'Light Blonde', 'Dark Blonde', 'Strawberry Blonde', 'Brown', 'Light Brown', 'Dark Brown', 'Red']
  },
  racialBackground: {
    type: String,
    enum: ['Chinese', 'Japanese', 'Other Asian', 'American Indian or Alaska Native', 'Black or African American', 'Hispanic or Latina', 'Native Hawaiian or other Pacific Islander', 'White'],
    required: [true, 'Racial background is required']
  },
  ethnicOrigin: {
    type: String
  },
  education: {
    type: String,
    enum: [
      'High school completed',
      'College enrolled',
      'College in progress',
      'College completed',
      'Masters completed',
      'PhD completed',
      'Other'
    ]
  },
  religiousAffiliation: {
    type: String
  },
  profileImages: [{
    type: String
  }],
  profileImage: {
    type: String
  },
  bio: {
    type: String,
    maxlength: 1000
  },
  hobbies: {
    type: String
  },
  availability: {
    type: String,
    enum: ['Available', 'Reserved', 'Unavailable'],
    default: 'Available'
  },
  previousDonations: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Donor', donorSchema);
