"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColdRoomController = void 0;
const ColdroomService_1 = require("../services/ColdroomService");
const coldRoomService = new ColdroomService_1.ColdRoomService();
class ColdRoomController {
    async createColdRoom(req, res) {
        try {
            const imageUrl = req.file?.path;
            const coldRoomData = {
                ...req.body,
                image: imageUrl
            };
            const coldRoomId = await coldRoomService.createColdRoom(coldRoomData);
            const newColdRoom = await coldRoomService.getColdRoomById(coldRoomId);
            if (!newColdRoom) {
                return res.status(404).json({ error: 'Cold room not found after creation' });
            }
            res.status(201).json(newColdRoom);
        }
        catch (error) {
            console.error('Error creating cold room:', error.message);
            res.status(500).json({ error: 'Failed to create cold room', details: error.message });
        }
    }
    async getColdRooms(req, res) {
        try {
            const coldRooms = await coldRoomService.getColdRooms();
            res.status(200).json(coldRooms);
        }
        catch (error) {
            console.error('Error retrieving cold rooms:', error.message);
            res.status(500).json({ error: 'Failed to retrieve cold rooms', details: error.message });
        }
    }
    async getColdRoomById(req, res) {
        try {
            const coldRoomId = parseInt(req.params.id, 10);
            const coldRoom = await coldRoomService.getColdRoomById(coldRoomId);
            if (!coldRoom)
                return res.status(404).json({ message: 'Cold room not found' });
            res.status(200).json(coldRoom);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to retrieve cold room' });
        }
    }
    async updateColdRoom(req, res) {
        try {
            const coldRoomId = parseInt(req.params.id, 10);
            const imageUrl = req.file?.path;
            const coldRoomData = {
                ...req.body,
                image: imageUrl || req.body.image // Keep the old image URL if no new image is uploaded
            };
            await coldRoomService.updateColdRoom(coldRoomId, coldRoomData);
            const updatedColdRoom = await coldRoomService.getColdRoomById(coldRoomId);
            if (!updatedColdRoom) {
                return res.status(404).json({ error: 'Cold room not found after update' });
            }
            res.status(200).json(updatedColdRoom);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to update cold room', details: error.message });
        }
    }
    async deleteColdRoom(req, res) {
        try {
            const coldRoomId = parseInt(req.params.id, 10);
            await coldRoomService.deleteColdRoom(coldRoomId);
            res.status(200).json({ message: 'Cold room deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to delete cold room' });
        }
    }
}
exports.ColdRoomController = ColdRoomController;
