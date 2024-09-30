"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.getPasswordResetToken = exports.storePasswordResetToken = exports.createUser = exports.findUserByEmail = void 0;
const db_1 = __importDefault(require("../config/db"));
const findUserByEmail = async (email) => {
    const [rows] = await db_1.default.query('SELECT * FROM users WHERE email = ?', [email]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0];
    }
    return null;
};
exports.findUserByEmail = findUserByEmail;
const createUser = async (names, email, hashedPassword, role) => {
    await db_1.default.query('INSERT INTO users (names, email, password, role) VALUES (?, ?, ?, ?)', [names, email, hashedPassword, role]);
};
exports.createUser = createUser;
const storePasswordResetToken = async (userId, token) => {
    await db_1.default.query(`UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?`, [token, Date.now() + 3600000, userId] // Token expires in 1 hour
    );
};
exports.storePasswordResetToken = storePasswordResetToken;
const getPasswordResetToken = async (token) => {
    const [rows] = await db_1.default.query(`SELECT id FROM users WHERE reset_token = ? AND reset_token_expiry > ?`, [token, Date.now()]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0]; // Assuming you expect a single user object with an id
    }
    return null;
};
exports.getPasswordResetToken = getPasswordResetToken;
const updateUserPassword = async (userId, hashedPassword) => {
    const [result] = await db_1.default.query(`UPDATE users SET password = ? WHERE id = ?`, [hashedPassword, userId]);
    return result;
};
exports.updateUserPassword = updateUserPassword;
