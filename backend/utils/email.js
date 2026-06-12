const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

const sendEmail = async ({ to, subject, html, fromOverride }) => {
  try {
    // 1. USE BREVO HTTP API (Preferred for production to bypass Render SMTP blocks)
    if (process.env.BREVO_API_KEY) {
      const fromName = process.env.FROM_NAME || "Lucina Egg Bank";
      const fromEmail = process.env.FROM_EMAIL || "hello.nexkarya@gmail.com";
      
      const payload = {
        sender: { name: fromName, email: fromEmail },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html
      };

      if (process.env.BREVO_TAGS) {
        payload.tags = [process.env.BREVO_TAGS];
      }

      if (process.env.REPLY_TO_EMAIL) {
        payload.replyTo = { 
          email: process.env.REPLY_TO_EMAIL, 
          name: process.env.REPLY_TO_NAME || fromName 
        };
      }

      const apiUrl = process.env.BREVO_API_URL ? `${process.env.BREVO_API_URL}/smtp/email` : 'https://api.brevo.com/v3/smtp/email';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
          'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Brevo API Error: ${response.status} ${errorData}`);
      }

      console.log(`Email successfully sent to ${to} via Brevo`);
      return { success: true };
    }

    // 2. FALLBACK TO NODEMAILER
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('No email credentials configured. Skipping email send.');
      return { success: false, message: 'Email not configured' };
    }

    const transporter = createTransporter();
    const mailOptions = {
      from: fromOverride || process.env.EMAIL_FROM || `"Lucina Egg Bank" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${to} via Nodemailer`);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send donor application confirmation
const sendDonorApplicationConfirmation = async (applicant) => {
  const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #009a93, #00b4aa); padding: 40px 30px; text-align: center; }
          .header img { width: 150px; margin-bottom: 15px; }
          .header h1 { color: white; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 1px; }
          .body { padding: 40px 30px; }
          .greeting { font-size: 18px; color: #1a1a2e; margin-bottom: 20px; font-weight: 500; }
          .message { color: #555; line-height: 1.7; margin-bottom: 20px; font-size: 15px; }
          .case-id { background: #f0fafa; border: 1px solid #b2dfdb; border-radius: 8px; padding: 15px 20px; text-align: center; margin: 25px 0; }
          .case-id span { font-size: 22px; color: #009a93; font-weight: bold; letter-spacing: 2px; }
          .steps { background: #f9f9f9; border-radius: 8px; padding: 20px 25px; margin: 25px 0; }
          .step { display: flex; align-items: flex-start; margin-bottom: 15px; }
          .step-num { background: #009a93; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: bold; flex-shrink: 0; margin-right: 12px; margin-top: 2px; }
          .step-text { color: #555; font-size: 14px; line-height: 1.5; }
          .cta { text-align: center; margin: 30px 0; }
          .btn { background: linear-gradient(135deg, #009a93, #00b4aa); color: white; padding: 14px 35px; border-radius: 30px; text-decoration: none; font-size: 15px; font-weight: 500; display: inline-block; }
          .footer { background: #1a1a2e; padding: 25px 30px; text-align: center; }
          .footer p { color: #aaa; font-size: 13px; margin: 5px 0; }
          .footer a { color: #009a93; text-decoration: none; }
          .highlight { color: #009a93; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌸 Application Received!</h1>
          </div>
          <div class="body">
            <div class="greeting">Dear ${applicant.firstName} ${applicant.lastName},</div>
            <p class="message">
              Thank you for applying to become an egg donor with <span class="highlight">Lucina Egg Bank</span>! 
              We're thrilled that you've taken this meaningful step toward helping families create the lives they've always dreamed of.
            </p>
            <p class="message">
              Your application has been received and is currently under review. Your reference number is:
            </p>
            <div class="case-id">
              Application ID: <span>${applicant.caseId}</span>
            </div>
            <div class="steps">
              <h3 style="color: #1a1a2e; margin-top: 0; font-size: 16px;">What happens next?</h3>
              <div class="step">
                <div class="step-num">1</div>
                <div class="step-text"><strong>Application Review</strong> — Our team will review your application within 2-3 business days.</div>
              </div>
              <div class="step">
                <div class="step-num">2</div>
                <div class="step-text"><strong>Pre-Qualification Notification</strong> — You'll receive an instant notification about your eligibility status.</div>
              </div>
              <div class="step">
                <div class="step-num">3</div>
                <div class="step-text"><strong>Phone Interview</strong> — If pre-qualified, we'll schedule a brief call to discuss the process and answer your questions.</div>
              </div>
              <div class="step">
                <div class="step-num">4</div>
                <div class="step-text"><strong>Medical Screening</strong> — Comprehensive screenings arranged conveniently near you.</div>
              </div>
            </div>
            <p class="message">
              If you have any questions in the meantime, please don't hesitate to reach out to our friendly team. 
              We're here for you every step of the way!
            </p>
            <div class="cta">
              <a href="mailto:info@lucinaeggbank.com" class="btn">Contact Our Team</a>
            </div>
          </div>
          <div class="footer">
            <p><strong style="color: white;">Lucina Egg Bank</strong></p>
            <p>3661 Valley Centre Dr., Suite 160, San Diego, CA 92130</p>
            <p><a href="tel:8583453274">Tel: 858-345-3274</a> | <a href="mailto:info@lucinaeggbank.com">info@lucinaeggbank.com</a></p>
            <p style="margin-top: 15px; font-size: 11px; color: #777;">
              © ${new Date().getFullYear()} Lucina Egg Bank. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

  return await sendEmail({
    to: applicant.email,
    subject: 'Your Egg Donor Application Has Been Received - Lucina Egg Bank',
    html: html
  });
};

// Send contact form confirmation  
const sendContactConfirmation = async (contact) => {
  const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
          .container { max-width: 600px; margin: 30px auto; background: white; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #009a93, #00b4aa); padding: 35px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 22px; }
          .body { padding: 35px; }
          .footer { background: #1a1a2e; padding: 25px; text-align: center; color: #aaa; font-size: 13px; }
          .footer a { color: #009a93; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Message Received! ✉️</h1>
          </div>
          <div class="body">
            <p>Dear ${contact.name},</p>
            <p>Thank you for reaching out to Lucina Egg Bank! We've received your message and a member of our team will get back to you within 1-2 business days.</p>
            <p><strong>Your inquiry:</strong> ${contact.subject}</p>
            <p>If you have urgent questions, please call us at <strong>858-345-3274</strong>.</p>
            <p>Warm regards,<br><strong>The Lucina Egg Bank Team</strong></p>
          </div>
          <div class="footer">
            <p>Lucina Egg Bank | 3661 Valley Centre Dr., Suite 160, San Diego, CA 92130</p>
            <p><a href="mailto:info@lucinaeggbank.com">info@lucinaeggbank.com</a> | Tel: 858-345-3274</p>
          </div>
        </div>
      </body>
      </html>
    `;

  return await sendEmail({
    to: contact.email,
    subject: 'We Received Your Message - Lucina Egg Bank',
    html: html
  });
};

// Notify admin of new submission
const notifyAdmin = async (type, data) => {
  if (!process.env.ADMIN_EMAIL && !process.env.EMAIL_USER) {
    return { success: false, message: 'Admin Email not configured' };
  }

  const subjects = {
    donorApplication: `New Egg Donor Application - ${data.firstName} ${data.lastName}`,
    findDonor: `New Find Donor Lead - ${data.name}`,
    contact: `New Contact Form Submission - ${data.name}`
  };

  const html = `
      <h2>New ${type} Submission</h2>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;

  return await sendEmail({
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: subjects[type] || 'New Form Submission',
    html: html
  });
};

module.exports = {
  sendDonorApplicationConfirmation,
  sendContactConfirmation,
  notifyAdmin
};
