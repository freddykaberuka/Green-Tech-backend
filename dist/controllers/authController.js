"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.resetPasswordController = exports.requestPasswordResetController = exports.loginUser = exports.registerUser = void 0;
const authService_1 = require("../services/authService");
const roles_1 = require("../utils/roles");
const jwt_1 = require("../utils/jwt");
function isError(error) {
    return error instanceof Error;
}
const registerUser = async (req, res) => {
    const { names, email, password, role } = req.body;
    try {
        const userRole = role === roles_1.Roles.Admin ? roles_1.Roles.Admin : roles_1.Roles.User;
        await (0, authService_1.register)(names, email, password, userRole);
        const token = (0, jwt_1.generateToken)(email, names, email, userRole); // Pass names and email
        res.status(201).send({ message: 'User registered successfully', token });
    }
    catch (error) {
        if (isError(error)) {
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(400).send({ error: 'Unknown error occurred' });
        }
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { names, email, password } = req.body;
    try {
        const user = await (0, authService_1.login)(names, email, password);
        const token = (0, jwt_1.generateToken)(user.id.toString(), user.names, user.email, user.role); // Pass names and email
        res.status(200).send({
            message: 'User logged in successfully',
            token,
        });
        console.log('user logged in');
    }
    catch (error) {
        if (isError(error)) {
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(400).send({ error: 'Unknown error occurred' });
        }
    }
};
exports.loginUser = loginUser;
const requestPasswordResetController = async (req, res) => {
    const { email } = req.body;
    try {
        await (0, authService_1.requestPasswordReset)(email);
        res.status(200).send({ message: 'Password reset link has been sent to your email' });
    }
    catch (error) {
        if (isError(error)) {
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(400).send({ error: 'Unknown error occurred' });
        }
    }
};
exports.requestPasswordResetController = requestPasswordResetController;
const resetPasswordController = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        await (0, authService_1.resetPassword)(token, newPassword);
        res.status(200).send({ message: 'Password reset successful' });
    }
    catch (error) {
        if (isError(error)) {
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(400).send({ error: 'Unknown error occurred' });
        }
    }
};
exports.resetPasswordController = resetPasswordController;
const logoutUser = (req, res) => {
    try {
        // Invalidate token on the frontend
        res.status(200).send({ message: 'User logged out successfully' });
    }
    catch (error) {
        if (isError(error)) {
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(400).send({ error: 'Unknown error occurred' });
        }
    }
};
exports.logoutUser = logoutUser;
