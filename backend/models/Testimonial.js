const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  role: {
    type: String,
    enum: ['Intended Parent', 'Egg Donor', 'Clinic Partner'],
    required: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  shortContent: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  image: {
    type: String
  },
  date: {
    type: String
  },
  location: {
    type: String
  },
  displayOn: {
    type: [String],
    enum: ['homepage', 'donor-page', 'both'],
    default: ['homepage']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
