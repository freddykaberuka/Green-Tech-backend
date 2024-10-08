"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactQuery = void 0;
const db_1 = __importDefault(require("../config/db"));
const createContactQuery = async (names, email, phone, question) => {
    await db_1.default.query(`INSERT INTO contact_queries (names, email, phone, question) VALUES (?, ?, ?, ?)`, [names, email, phone, question]);
};
exports.createContactQuery = createContactQuery;
