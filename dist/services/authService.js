"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestPasswordReset = exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const hash_1 = require("../utils/hash");
const email_1 = require("../utils/email");
const crypto_1 = __importDefault(require("crypto"));
const register = async (names, email, password, role) => {
    const user = await (0, User_1.findUserByEmail)(email);
    if (user) {
        throw new Error('User already exists');
    }
    const hashedPassword = await (0, hash_1.hashPassword)(password);
    await (0, User_1.createUser)(names, email, hashedPassword, role);
};
exports.register = register;
const login = async (names, email, password) => {
    const user = await (0, User_1.findUserByEmail)(email);
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await (0, hash_1.comparePassword)(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    return user;
};
exports.login = login;
const requestPasswordReset = async (email) => {
    const user = await (0, User_1.findUserByEmail)(email);
    if (!user) {
        throw new Error('User not found');
    }
    const resetToken = crypto_1.default.randomBytes(32).toString('hex'); // Generate a token
    await (0, User_1.storePasswordResetToken)(user.id, resetToken); // Store the token in the DB
    await (0, email_1.sendResetEmail)(email, resetToken); // Send an email with the reset link
};
exports.requestPasswordReset = requestPasswordReset;
const resetPassword = async (token, newPassword) => {
    const resetTokenData = await (0, User_1.getPasswordResetToken)(token);
    if (!resetTokenData || !('id' in resetTokenData)) {
        throw new Error('Invalid or expired token');
    }
    const hashedPassword = await (0, hash_1.hashPassword)(newPassword);
    await (0, User_1.updateUserPassword)(resetTokenData.id, hashedPassword);
    return { message: 'Password reset successful' };
};
exports.resetPassword = resetPassword;
