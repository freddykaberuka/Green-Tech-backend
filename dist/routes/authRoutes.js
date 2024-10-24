"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/register', authController_1.registerUser);
router.post('/login', authController_1.loginUser);
router.post('/logout', authController_1.logoutUser);
router.post('/forgot-password', authController_1.requestPasswordResetController);
router.post('/reset-password', authController_1.resetPasswordController);
exports.default = router;
