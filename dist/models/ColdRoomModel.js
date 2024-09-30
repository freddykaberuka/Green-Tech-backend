"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteColdRoom = exports.updateColdRoom = exports.getColdRoomById = exports.getColdRooms = exports.createColdRoom = void 0;
const db_1 = __importDefault(require("../config/db"));
const createColdRoom = async (coldRoom) => {
    const query = `INSERT INTO cold_rooms (name, price, location, capacity, unit, status, size, feature, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db_1.default.execute(query, [
        coldRoom.name,
        coldRoom.price,
        coldRoom.location,
        coldRoom.capacity,
        coldRoom.unit,
        coldRoom.status,
        coldRoom.size,
        JSON.stringify(coldRoom.feature),
        coldRoom.image
    ]);
    return result.insertId;
};
exports.createColdRoom = createColdRoom;
const getColdRooms = async () => {
    const [rows] = await db_1.default.query('SELECT * FROM cold_rooms');
    if (!Array.isArray(rows)) {
        throw new Error("Expected an array of rows from the database");
    }
    return rows.map((row) => ({
        ...row,
        feature: parseFeature(row.feature),
    }));
};
exports.getColdRooms = getColdRooms;
// Helper function to safely parse the feature field
const parseFeature = (feature) => {
    if (!feature) {
        return [];
    }
    try {
        return JSON.parse(feature);
    }
    catch (error) {
        console.error('Error parsing feature:', feature, error);
        return [];
    }
};
const getColdRoomById = async (id) => {
    const [rows] = await db_1.default.query('SELECT * FROM cold_rooms WHERE id = ?', [id]);
    const coldRooms = rows;
    if (coldRooms.length === 0) {
        return null;
    }
    const coldRoom = coldRooms[0];
    if (typeof coldRoom.feature === 'string') {
        coldRoom.feature = JSON.parse(coldRoom.feature);
    }
    return coldRoom;
};
exports.getColdRoomById = getColdRoomById;
const updateColdRoom = async (id, coldRoom) => {
    const fields = [];
    const values = [];
    if (coldRoom.name !== undefined) {
        fields.push('name = ?');
        values.push(coldRoom.name);
    }
    if (coldRoom.price !== undefined) {
        fields.push('price = ?');
        values.push(coldRoom.price);
    }
    if (coldRoom.location !== undefined) {
        fields.push('location = ?');
        values.push(coldRoom.location);
    }
    if (coldRoom.capacity !== undefined) {
        fields.push('capacity = ?');
        values.push(coldRoom.capacity);
    }
    if (coldRoom.status !== undefined) {
        fields.push('status = ?');
        values.push(coldRoom.status);
    }
    if (coldRoom.unit !== undefined) {
        fields.push('unit = ?');
        values.push(coldRoom.unit);
    }
    if (coldRoom.size !== undefined) {
        fields.push('size = ?');
        values.push(coldRoom.size);
    }
    if (coldRoom.feature !== undefined) {
        fields.push('feature = ?');
        values.push(JSON.stringify(coldRoom.feature));
    }
    if (coldRoom.image !== undefined) {
        fields.push('image = ?');
        values.push(coldRoom.image);
    }
    values.push(id);
    if (fields.length === 0) {
        throw new Error('No fields provided to update');
    }
    const query = `UPDATE cold_rooms SET ${fields.join(', ')} WHERE id = ?`;
    await db_1.default.execute(query, values);
};
exports.updateColdRoom = updateColdRoom;
const deleteColdRoom = async (id) => {
    await db_1.default.execute('DELETE FROM cold_rooms WHERE id = ?', [id]);
};
exports.deleteColdRoom = deleteColdRoom;
