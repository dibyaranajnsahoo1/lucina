const Donor = require('../models/Donor');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// @desc Get all donors (public)
// @route GET /api/donors
// @access Public
const getDonors = async (req, res) => {
  try {
    const { 
      page = 1, limit = 12, 
      racialBackground, eyeColor, hairColor, 
      education, availability, search,
      featured 
    } = req.query;
    
    const query = { isActive: true };
    
    if (racialBackground) query.racialBackground = racialBackground;
    if (eyeColor) query.eyeColor = eyeColor;
    if (hairColor) query.hairColor = hairColor;
    if (education) query.education = education;
    if (availability) query.availability = availability;
    if (featured === 'true') query.featured = true;
    if (search) {
      query.$or = [
        { donorId: new RegExp(search, 'i') },
        { firstName: new RegExp(search, 'i') }
      ];
    }

    const total = await Donor.countDocuments(query);
    const donors = await Donor
      .find(query)
      .sort({ featured: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-__v');

    // Group by racial background
    const groupedDonors = {};
    donors.forEach(donor => {
      const race = donor.racialBackground;
      if (!groupedDonors[race]) groupedDonors[race] = [];
      groupedDonors[race].push(donor);
    });

    res.json({
      success: true,
      data: donors,
      grouped: groupedDonors,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single donor
// @route GET /api/donors/:id
// @access Public
const getDonor = async (req, res) => {
  try {
    const lookup = [{ donorId: req.params.id }];
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      lookup.push({ _id: req.params.id });
    }

    const donor = await Donor.findOne({
      $or: lookup,
      isActive: true
    });
    
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }
    
    res.json({ success: true, data: donor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create donor (admin)
// @route POST /api/donors
// @access Private
const createDonor = async (req, res) => {
  try {
    const donorData = { ...req.body };
    
    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map(file => `/uploads/donor-images/${file.filename}`);
      donorData.profileImages = imagePaths;
      donorData.profileImage = imagePaths[0];
    }

    // Auto-generate donor ID if not provided
    if (!donorData.donorId) {
      const count = await Donor.countDocuments();
      donorData.donorId = `LEB-D${String(count + 1001).padStart(4, '0')}`;
    }

    const donor = await Donor.create(donorData);
    res.status(201).json({ success: true, data: donor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update donor (admin)
// @route PUT /api/donors/:id
// @access Private
const updateDonor = async (req, res) => {
  try {
    const donorData = { ...req.body };
    
    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map(file => `/uploads/donor-images/${file.filename}`);
      donorData.profileImages = imagePaths;
      donorData.profileImage = imagePaths[0];
    }

    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      donorData,
      { new: true, runValidators: true }
    );
    
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }
    
    res.json({ success: true, data: donor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete donor (admin)
// @route DELETE /api/donors/:id
// @access Private
const deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }

    // Delete associated images
    if (donor.profileImages && donor.profileImages.length > 0) {
      donor.profileImages.forEach(imagePath => {
        const fullPath = path.join(__dirname, '..', imagePath.replace(/^\/+/, ''));
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    }

    await Donor.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Donor deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all donors for admin (including inactive)
// @route GET /api/donors/admin/all
// @access Private
const getAllDonorsAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, racialBackground, availability } = req.query;
    
    const query = {};
    if (racialBackground) query.racialBackground = racialBackground;
    if (availability) query.availability = availability;
    if (search) {
      query.$or = [
        { donorId: new RegExp(search, 'i') },
        { firstName: new RegExp(search, 'i') }
      ];
    }

    const total = await Donor.countDocuments(query);
    const donors = await Donor
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: donors,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDonors,
  getDonor,
  createDonor,
  updateDonor,
  deleteDonor,
  getAllDonorsAdmin
};
