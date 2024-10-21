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
    roomType: string;
}

export const createColdRoom = async (coldRoom: ColdRoom): Promise<number> => {
    // Base query for columns
    let query = `INSERT INTO cold_rooms (name, price, location, capacity, unit, status, size, feature, roomType`;
    let values = [coldRoom.name, coldRoom.price, coldRoom.location, coldRoom.capacity, coldRoom.unit, coldRoom.status, coldRoom.size, JSON.stringify(coldRoom.feature), coldRoom.roomType];

    // Add image column if the image is provided
    if (coldRoom.image) {
        query += `, image`;
    }

    // Complete the query by closing the column part and adding placeholders for the values
    query += `) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?`;

    // Add placeholder for image if it exists
    if (coldRoom.image) {
        query += `, ?`;
        values.push(coldRoom.image); // Add the image value to the values array
    }

    // Close the values part
    query += `)`;

    // Execute the query with the values array
    const [result] = await pool.execute(query, values);
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
        roomType: row.roomType,
    })) as ColdRoom[];
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
    if (coldRoom.roomType !== undefined) {
        fields.push('roomType = ?'); // Add roomType to update query
        values.push(coldRoom.roomType);
    }

    values.push(id);
    if (fields.length === 0) {
        throw new Error('No fields provided to update');
    }

    const query = `UPDATE cold_rooms SET ${fields.join(', ')} WHERE id = ?`;
    await pool.execute(query, values);
};

// Reintroduce the deleteColdRoom function
export const deleteColdRoom = async (id: number): Promise<void> => {
    await pool.execute('DELETE FROM cold_rooms WHERE id = ?', [id]);
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
