import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, // Client ID
    process.env.CLIENT_SECRET, // Client Secret
    'https://developers.google.com/oauthplayground' // Redirect URL
  );

  // Ensure the refresh token is available
  if (!process.env.REFRESH_TOKEN) {
    throw new Error('Missing REFRESH_TOKEN');
  }

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  // Get a new access token using the refresh token
  const accessToken = await oauth2Client.getAccessToken();
  
  if (!accessToken.token) {
    throw new Error('Failed to retrieve access token');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER, // Gmail address
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  } as SMTPTransport.Options);

  return transporter;
};

export const sendResetEmail = async (email: string, resetToken: string) => {
  const resetUrl = `http://yourfrontend.com/reset-password?token=${resetToken}`;

  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click here to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
