import { Request, Response } from 'express';
import { ColdRoomService } from '../services/ColdroomService';

const coldRoomService = new ColdRoomService();

export class ColdRoomController {
    async createColdRoom(req: Request, res: Response) {
        try {
            const coldRoomId = await coldRoomService.createColdRoom(req.body);
            res.status(201).json({ message: 'Cold room Created Successfull', id: coldRoomId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create cold room' });
        }
    }

    async getColdRooms(req: Request, res: Response) {
        try {
            const coldRooms = await coldRoomService.getColdRooms();
            res.status(200).json(coldRooms);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve cold rooms' });
        }
    }

    async getColdRoomById(req: Request, res: Response) {
        try {
            const coldRoomId = parseInt(req.params.id, 10);
            const coldRoom = await coldRoomService.getColdRoomById(coldRoomId);
            if (!coldRoom) return res.status(404).json({ message: 'Cold room not found' });
            res.status(200).json(coldRoom);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve cold room' });
        }
    }

    async updateColdRoom(req: Request, res: Response) {
        try {
            const coldRoomId = parseInt(req.params.id, 10);
            await coldRoomService.updateColdRoom(coldRoomId, req.body);
            res.status(200).json({ message: 'Cold room updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update cold room' });
        }
    }

    async deleteColdRoom(req: Request, res: Response) {
        try {
            const coldRoomId = parseInt(req.params.id, 10);
            await coldRoomService.deleteColdRoom(coldRoomId);
            res.status(200).json({ message: 'Cold room deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete cold room' });
        }
    }
}
