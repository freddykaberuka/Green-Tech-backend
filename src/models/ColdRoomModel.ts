import pool from '../config/db';

export interface ColdRoom {
    id?: number;
    name: string;
    location: string;
    capacity: number;
    status: string;
}

export const createColdRoom = async (coldRoom: ColdRoom): Promise<number> => {
    const query = `INSERT INTO cold_rooms (name, location, capacity, status) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [coldRoom.name, coldRoom.location, coldRoom.capacity, coldRoom.status]);
    return (result as any).insertId;
};

export const getColdRooms = async (): Promise<ColdRoom[]> => {
    const [rows] = await pool.query('SELECT * FROM cold_rooms');
    return rows as ColdRoom[];  // Explicitly cast rows as ColdRoom[]
};

export const getColdRoomById = async (id: number): Promise<ColdRoom | null> => {
    const [rows] = await pool.query('SELECT * FROM cold_rooms WHERE id = ?', [id]);
    const coldRooms = rows as ColdRoom[];  // Cast rows as ColdRoom[]
    return coldRooms.length ? coldRooms[0] : null;  // Now it will work with length and index
};

export const updateColdRoom = async (id: number, coldRoom: Partial<ColdRoom>): Promise<void> => {
    const query = `UPDATE cold_rooms SET name = ?, location = ?, capacity = ?, status = ? WHERE id = ?`;
    await pool.execute(query, [coldRoom.name, coldRoom.location, coldRoom.capacity, coldRoom.status, id]);
};

export const deleteColdRoom = async (id: number): Promise<void> => {
    await pool.execute('DELETE FROM cold_rooms WHERE id = ?', [id]);
};
