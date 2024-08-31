import fs from 'fs/promises'; // Use the Promise-based version of fs
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

// Use `fileURLToPath` to get the current file path and `path.dirname` to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

/**
 * Function to send an email with OTP using a specified template
 * @param {string} to - The recipient's email address
 * @param {string} otp - The OTP to include in the email
 * @param {string} templateName - The name of the HTML template file
 */
export const sendEmailWithOtp = async (to, otp, templateName) => {
  try {
    const templatePath = path.join(__dirname, 'templetes', templateName);

    // Read the HTML template
    const htmlContent = await fs.readFile(templatePath, 'utf-8');

    // Replace placeholders with actual values
    const htmlToSend = htmlContent.replace(/{{OTP}}/g, otp);

    // Define email options
    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL, // Sender address
      to, // Recipient email address
      subject: templateName === 'verifyAccount.html' ? 'Verify Your QuickChat Account' : 'Your QuickChat Login OTP',
      html: htmlToSend,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Make sure your server listens after sending the email
