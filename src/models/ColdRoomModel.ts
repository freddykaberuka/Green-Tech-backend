import pool from '../config/db';

export interface ColdRoom {
    id?: number;
    name: string;
    price: number;
    location: string;
    capacity: number;
    status: string;
    unit: string;
}

export const createColdRoom = async (coldRoom: ColdRoom): Promise<number> => {
    const query = `INSERT INTO cold_rooms (name, price, location, capacity, unit, status) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [
        coldRoom.name,
        coldRoom.price,
        coldRoom.location,
        coldRoom.capacity,
        coldRoom.unit,
        coldRoom.status
    ]);
    return (result as any).insertId;
};

export const getColdRooms = async (): Promise<ColdRoom[]> => {
    const [rows] = await pool.query('SELECT * FROM cold_rooms');
    return rows as ColdRoom[];
};

export const getColdRoomById = async (id: number): Promise<ColdRoom | null> => {
    const [rows] = await pool.query('SELECT * FROM cold_rooms WHERE id = ?', [id]);
    const coldRooms = rows as ColdRoom[];
    return coldRooms.length ? coldRooms[0] : null;
};

export const updateColdRoom = async (id: number, coldRoom: Partial<ColdRoom>): Promise<void> => {
    try {
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
        values.push(id);
        if (fields.length === 0) {
            throw new Error('No fields provided to update');
        }
        const query = `UPDATE cold_rooms SET ${fields.join(', ')} WHERE id = ?`;

        await pool.execute(query, values);
        console.log(`ColdRoom with id ${id} updated`);
    } catch (error) {
        console.error('Error updating cold room:', error);
        throw error;
    }
};

export const deleteColdRoom = async (id: number): Promise<void> => {
    await pool.execute('DELETE FROM cold_rooms WHERE id = ?', [id]);
};
