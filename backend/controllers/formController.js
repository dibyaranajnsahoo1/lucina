const DonorApplication = require('../models/DonorApplication');
const FindDonorForm = require('../models/FindDonorForm');
const ContactForm = require('../models/ContactForm');
const { sendDonorApplicationConfirmation, sendContactConfirmation, notifyAdmin } = require('../utils/email');
const { verifyRecaptchaToken } = require('../utils/recaptcha');
const fs = require('fs');
const path = require('path');

const removeUploadedFiles = (files = []) => {
  files.forEach((file) => {
    if (file.path) {
      fs.unlink(file.path, (error) => {
        if (error) {
          console.error('Failed to remove uploaded file:', file.path, error);
        }
      });
    }
  });
};

// ====================== DONOR APPLICATION ======================

// @desc Submit donor application
// @route POST /api/forms/donor-application
// @access Public
const submitDonorApplication = async (req, res) => {
  let application;

  try {
    const {
      recaptchaToken, captchaToken, 'g-recaptcha-response': googleRecaptchaToken,
      firstName, lastName, email, cellNumber, dateOfBirth,
      country, street, city, state, zipCode, province,
      heightFt, heightIn, weight, eyeColor, hairColor,
      religiousAffiliation, racialBackground, education,
      educationHighlights, hasDonatedBefore, ethnicOrigin, agreedToAnonymous,
      referralCode, utmSource, utmMedium, utmCampaign
    } = req.body;

    const captcha = await verifyRecaptchaToken(
      recaptchaToken || captchaToken || googleRecaptchaToken,
      req.ip
    );

    if (!captcha.success) {
      removeUploadedFiles(req.files);
      return res.status(captcha.status || 400).json({
        success: false,
        message: captcha.message
      });
    }

    // Process uploaded files
    const uploadedFiles = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        uploadedFiles.push({
          filename: file.filename,
          originalName: file.originalname,
          path: `/uploads/applications/${file.filename}`,
          size: file.size,
          mimetype: file.mimetype
        });
      });
    }

    application = await DonorApplication.create({
      firstName, lastName, email, cellNumber,
      dateOfBirth: new Date(dateOfBirth),
      country,
      address: { street, city, state, zipCode, province },
      heightFt: parseInt(heightFt),
      heightIn: parseInt(heightIn),
      weight: parseInt(weight),
      eyeColor, hairColor, religiousAffiliation,
      racialBackground, education, educationHighlights, hasDonatedBefore,
      ethnicOrigin,
      uploadedFiles,
      agreedToAnonymous: agreedToAnonymous === 'true' || agreedToAnonymous === true,
      referralCode, utmSource, utmMedium, utmCampaign
    });

    // Send confirmation email
    const emailResult = await sendDonorApplicationConfirmation(application);
    await DonorApplication.findByIdAndUpdate(application._id, { emailSent: emailResult.success });

    // Notify admin
    notifyAdmin('donorApplication', { firstName, lastName, email, caseId: application.caseId });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! Check your email for confirmation.',
      caseId: application.caseId,
      applicationId: application._id
    });
  } catch (error) {
    if (!application) {
      removeUploadedFiles(req.files);
    }

    console.error('Donor application error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all donor applications (admin)
// @route GET /api/forms/donor-applications
// @access Private
const getDonorApplications = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { caseId: new RegExp(search, 'i') }
      ];
    }

    const total = await DonorApplication.countDocuments(query);
    const applications = await DonorApplication
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: applications,
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

// @desc Get single donor application
// @route GET /api/forms/donor-applications/:id
// @access Private
const getDonorApplication = async (req, res) => {
  try {
    const application = await DonorApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Download donor application file (admin)
// @route GET /api/forms/donor-applications/:id/files/:filename
// @access Private
const downloadDonorApplicationFile = async (req, res) => {
  try {
    const application = await DonorApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const uploadedFile = application.uploadedFiles.find(
      (file) => file.filename === req.params.filename
    );

    if (!uploadedFile) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    const filePath = path.join(__dirname, '../uploads/applications', uploadedFile.filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'File is missing from storage' });
    }

    return res.download(filePath, uploadedFile.originalName || uploadedFile.filename);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update donor application status
// @route PUT /api/forms/donor-applications/:id
// @access Private
const updateDonorApplicationStatus = async (req, res) => {
  try {
    const application = await DonorApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, notes: req.body.notes },
      { new: true }
    );
    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete donor application
// @route DELETE /api/forms/donor-applications/:id
// @access Private
const deleteDonorApplication = async (req, res) => {
  try {
    await DonorApplication.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== FIND DONOR FORM ======================

// @desc Submit find donor form
// @route POST /api/forms/find-donor
// @access Public
const submitFindDonorForm = async (req, res) => {
  try {
    const {
      recaptchaToken,
      captchaToken,
      'g-recaptcha-response': googleRecaptchaToken,
      name,
      email,
      phoneNumber,
      howDidYouHear,
      howDidYouHearSpecify,
      needsSurrogate,
      message,
      userType,
      utmSource,
      utmMedium,
      utmCampaign
    } = req.body;

    const captcha = await verifyRecaptchaToken(
      recaptchaToken || captchaToken || googleRecaptchaToken,
      req.ip
    );

    if (!captcha.success) {
      return res.status(captcha.status || 400).json({
        success: false,
        message: captcha.message
      });
    }

    const payload = {
      name,
      email,
      phoneNumber,
      howDidYouHear,
      howDidYouHearSpecify: howDidYouHear === 'Other' ? howDidYouHearSpecify : undefined,
      needsSurrogate,
      message,
      userType,
      utmSource,
      utmMedium,
      utmCampaign
    };

    const form = await FindDonorForm.create(payload);
    notifyAdmin('findDonor', payload);
    res.status(201).json({
      success: true,
      message: 'Thank you! We will contact you soon to provide donor gallery access.',
      id: form._id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all find donor forms (admin)
// @route GET /api/forms/find-donor
// @access Private
const getFindDonorForms = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }

    const total = await FindDonorForm.countDocuments(query);
    const forms = await FindDonorForm
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: forms,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update find donor form status
// @route PUT /api/forms/find-donor/:id
// @access Private
const updateFindDonorStatus = async (req, res) => {
  try {
    const form = await FindDonorForm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: form });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete find donor form
// @route DELETE /api/forms/find-donor/:id
// @access Private
const deleteFindDonorForm = async (req, res) => {
  try {
    await FindDonorForm.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Form deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== CONTACT FORM ======================

// @desc Submit contact form
// @route POST /api/forms/contact
// @access Public
const submitContactForm = async (req, res) => {
  try {
    const form = await ContactForm.create(req.body);
    await sendContactConfirmation(req.body);
    notifyAdmin('contact', req.body);
    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you within 1-2 business days.',
      id: form._id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all contact forms (admin)
// @route GET /api/forms/contact
// @access Private
const getContactForms = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { subject: new RegExp(search, 'i') }
      ];
    }

    const total = await ContactForm.countDocuments(query);
    const forms = await ContactForm
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: forms,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update contact form status
// @route PUT /api/forms/contact/:id
// @access Private
const updateContactStatus = async (req, res) => {
  try {
    const form = await ContactForm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: form });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete contact form
// @route DELETE /api/forms/contact/:id
// @access Private
const deleteContactForm = async (req, res) => {
  try {
    await ContactForm.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Form deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get dashboard stats
// @route GET /api/forms/stats
// @access Private
const getDashboardStats = async (req, res) => {
  try {
    const [applications, findDonorForms, contactForms] = await Promise.all([
      DonorApplication.countDocuments(),
      FindDonorForm.countDocuments(),
      ContactForm.countDocuments()
    ]);

    const recentApplications = await DonorApplication.find()
      .sort({ createdAt: -1 }).limit(5)
      .select('firstName lastName email status createdAt caseId');

    const recentLeads = await FindDonorForm.find()
      .sort({ createdAt: -1 }).limit(5)
      .select('name email status createdAt');

    res.json({
      success: true,
      stats: {
        totalApplications: applications,
        totalFindDonorLeads: findDonorForms,
        totalContactForms: contactForms
      },
      recentApplications,
      recentLeads
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitDonorApplication,
  getDonorApplications,
  getDonorApplication,
  downloadDonorApplicationFile,
  updateDonorApplicationStatus,
  deleteDonorApplication,
  submitFindDonorForm,
  getFindDonorForms,
  updateFindDonorStatus,
  deleteFindDonorForm,
  submitContactForm,
  getContactForms,
  updateContactStatus,
  deleteContactForm,
  getDashboardStats
};
