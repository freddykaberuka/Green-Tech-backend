import { createColdRoom, getColdRooms, getColdRoomById, updateColdRoom, deleteColdRoom, ColdRoom } from '../models/ColdRoomModel';

export class ColdRoomService {
    async createColdRoom(coldRoomData: ColdRoom): Promise<number> {
        try {
            return await createColdRoom(coldRoomData);
        } catch (error) {
            console.error('Error in ColdRoomService.createColdRoom:', error);
            throw error;
        }
    }

    async getColdRooms(): Promise<ColdRoom[]> {
        try {
            return await getColdRooms();
        } catch (error) {
            console.error('Error in ColdRoomService.getColdRooms:', error);
            throw error;
        }
    }

    async getColdRoomById(id: number): Promise<ColdRoom | null> {
        try {
            return await getColdRoomById(id);
        } catch (error) {
            console.error('Error in ColdRoomService.getColdRoomById:', error);
            throw error;
        }
    }

    async updateColdRoom(id: number, coldRoomData: Partial<ColdRoom>): Promise<void> {
        try {
            await updateColdRoom(id, coldRoomData);
        } catch (error) {
            console.error('Error in ColdRoomService.updateColdRoom:', error);
            throw error;
        }
    }

    async deleteColdRoom(id: number): Promise<void> {
        try {
            await deleteColdRoom(id);
        } catch (error) {
            console.error('Error in ColdRoomService.deleteColdRoom:', error);
            throw error;
        }
    }
}
