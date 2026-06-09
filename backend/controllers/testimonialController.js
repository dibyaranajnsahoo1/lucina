const Testimonial = require('../models/Testimonial');

// @desc Get testimonials (public)
// @route GET /api/testimonials
// @access Public
const getTestimonials = async (req, res) => {
  try {
    const { displayOn, limit = 10, role } = req.query;
    
    const query = { isActive: true };
    if (displayOn) {
      query.displayOn = { $in: [displayOn, 'both'] };
    }
    if (role) query.role = role;

    const testimonials = await Testimonial
      .find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(parseInt(limit));

    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all testimonials (admin)
// @route GET /api/testimonials/admin
// @access Private
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create testimonial (admin)
// @route POST /api/testimonials
// @access Private
const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update testimonial (admin)
// @route PUT /api/testimonials/:id
// @access Private
const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    
    res.json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete testimonial (admin)
// @route DELETE /api/testimonials/:id
// @access Private
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
