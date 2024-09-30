"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized, no token provided' });
    }
    const token = authHeader.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden, invalid token' });
            }
            req.user = decoded; // Cast the decoded token to JWTPayload
            next();
        });
    }
    else {
        res.status(401).json({ message: 'Unauthorized, token missing' });
    }
};
exports.authenticateJWT = authenticateJWT;
