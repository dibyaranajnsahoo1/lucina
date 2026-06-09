const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  category: {
    type: String,
    enum: ['Egg Donation', 'Intended Parents', 'Fertility', 'Success Stories', 'Health', 'News'],
    default: 'Egg Donation'
  },
  author: {
    type: String,
    default: 'Lucina Egg Bank Team'
  },
  tags: [String],
  isPublished: {
    type: Boolean,
    default: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  readTime: {
    type: Number,
    default: 5
  }
}, { timestamps: true });

// Auto-generate slug
blogSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
