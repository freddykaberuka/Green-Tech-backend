"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const coldroomRoutes_1 = __importDefault(require("./routes/coldroomRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const notificationsRoutes_1 = __importDefault(require("./routes/notificationsRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use('/api/auth', authRoutes_1.default);
app.use('/coldroom', coldroomRoutes_1.default);
app.use('/book', bookingRoutes_1.default);
app.use('/notifications', notificationsRoutes_1.default);
exports.default = app;
