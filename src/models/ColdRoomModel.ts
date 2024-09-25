import pool from '../config/db';

export interface ColdRoom {
    id?: number;
    name: string;
    price: number;
    location: string;
    capacity: number;
    status: string;
    unit: string;
    size: string;
    feature: string[];
    image?: string;
}

export const createColdRoom = async (coldRoom: ColdRoom): Promise<number> => {
    const query = `INSERT INTO cold_rooms (name, price, location, capacity, unit, status, size, feature, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [
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
    return (result as any).insertId;
};

export const getColdRooms = async (): Promise<ColdRoom[]> => {
    const [rows] = await pool.query('SELECT * FROM cold_rooms');
    
    if (!Array.isArray(rows)) {
        throw new Error("Expected an array of rows from the database");
    }

    return rows.map((row: any) => ({
        ...row,
        feature: parseFeature(row.feature),
    })) as ColdRoom[];
};

// Helper function to safely parse the feature field
const parseFeature = (feature: string | null): string[] => {
    if (!feature) {
        return [];
    }
    try {
        return JSON.parse(feature);
    } catch (error) {
        console.error('Error parsing feature:', feature, error);
        return [];
    }
};

export const getColdRoomById = async (id: number): Promise<ColdRoom | null> => {
    const [rows] = await pool.query('SELECT * FROM cold_rooms WHERE id = ?', [id]);
    const coldRooms = rows as ColdRoom[];
    
    if (coldRooms.length === 0) {
        return null;
    }

    const coldRoom = coldRooms[0];
    if (typeof coldRoom.feature === 'string') {
        coldRoom.feature = JSON.parse(coldRoom.feature);
    }

    return coldRoom;
};

export const updateColdRoom = async (id: number, coldRoom: Partial<ColdRoom>): Promise<void> => {
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
    await pool.execute(query, values);
};

export const deleteColdRoom = async (id: number): Promise<void> => {
    await pool.execute('DELETE FROM cold_rooms WHERE id = ?', [id]);
};
