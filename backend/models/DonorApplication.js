const mongoose = require('mongoose');

const donorApplicationSchema = new mongoose.Schema({
  caseId: {
    type: String,
    unique: true
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true
  },
  cellNumber: {
    type: String,
    required: [true, 'Cell number is required']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  country: {
    type: String,
    required: true,
    enum: ['USA', 'Outside of USA']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    province: String
  },
  heightFt: {
    type: Number,
    required: true
  },
  heightIn: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  eyeColor: {
    type: String,
    required: true
  },
  hairColor: {
    type: String,
    required: true
  },
  religiousAffiliation: {
    type: String,
    required: true
  },
  racialBackground: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  educationHighlights: {
    type: String,
    required: true,
    trim: true
  },
  hasDonatedBefore: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  ethnicOrigin: {
    type: String,
    required: true
  },
  uploadedFiles: [{
    filename: String,
    originalName: String,
    path: String,
    size: Number,
    mimetype: String
  }],
  agreedToAnonymous: {
    type: Boolean,
    required: true
  },
  agreedToTerms: {
    type: Boolean,
    default: true
  },
  referralCode: {
    type: String
  },
  utmSource: String,
  utmMedium: String,
  utmCampaign: String,
  status: {
    type: String,
    enum: ['Pending', 'Pre-Qualified', 'Accepted', 'Rejected', 'In Progress'],
    default: 'Pending'
  },
  notes: {
    type: String
  },
  emailSent: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Auto-generate case ID
donorApplicationSchema.pre('save', async function(next) {
  if (!this.caseId) {
    const count = await this.constructor.countDocuments();
    this.caseId = `LEB-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('DonorApplication', donorApplicationSchema);
