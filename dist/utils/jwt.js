"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
    throw new Error('JWT_SECRET environment variable is not set');
}
const generateToken = (userId, names, email, role) => {
    return jsonwebtoken_1.default.sign({ userId, names, email, role }, secretKey, { expiresIn: '1d' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
