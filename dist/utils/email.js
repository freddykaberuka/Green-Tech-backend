"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const OAuth2 = googleapis_1.google.auth.OAuth2;
const createTransporter = async () => {
    const oauth2Client = new OAuth2(process.env.CLIENT_ID, // Client ID
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
    const transporter = nodemailer_1.default.createTransport({
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
    });
    return transporter;
};
const sendResetEmail = async (email, resetToken) => {
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
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
exports.sendResetEmail = sendResetEmail;
