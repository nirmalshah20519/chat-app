import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { config } from "dotenv";

config();
// Create a transporter
export const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail'
  auth: {
    user: process.env.NODE_MAILER_EMAIL, // Your email address
    pass: process.env.NODE_MAILER_PASSWORD, // Your email password or app-specific password
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Error in nodemailer configuration:', error);
  } else {
    console.log('Server is ready to take messages:', success);
  }
});

export const sendEmailWithOtp = (to, otp, templateName) => {
    const templatePath = path.join(__dirname, 'emailTemplates', templateName);
  
    // Read the HTML template
    fs.readFile(templatePath, 'utf-8', (err, htmlContent) => {
      if (err) {
        console.error('Error loading the email template:', err);
        return;
      }
  
      // Replace placeholders with actual values
      const htmlToSend = htmlContent.replace(/{{OTP}}/g, otp);
  
      // Define email options
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to, // Recipient email address
        subject: templateName === 'verifyAccount.html' ? 'Verify Your QuickChat Account' : 'Your QuickChat Login OTP',
        html: htmlToSend,
      };
  
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent successfully:', info.response);
        }
      });
    });
  };

// module.exports = transporter;
