import { createColdRoom, getColdRooms, getColdRoomById, updateColdRoom, deleteColdRoom, ColdRoom } from '../models/ColdRoomModel';

export class ColdRoomService {
    async createColdRoom(coldRoomData: ColdRoom): Promise<number> {
        return await createColdRoom(coldRoomData);
    }

    async getColdRooms(): Promise<ColdRoom[]> {
        return await getColdRooms();
    }

    async getColdRoomById(id: number): Promise<ColdRoom | null> {
        return await getColdRoomById(id);
    }

    async updateColdRoom(id: number, coldRoomData: Partial<ColdRoom>): Promise<void> {
        await updateColdRoom(id, coldRoomData);
    }

    async deleteColdRoom(id: number): Promise<void> {
        await deleteColdRoom(id);
    }
}
