"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColdRoomService = void 0;
const ColdRoomModel_1 = require("../models/ColdRoomModel");
class ColdRoomService {
    async createColdRoom(coldRoomData) {
        return await (0, ColdRoomModel_1.createColdRoom)(coldRoomData);
    }
    async getColdRooms() {
        return await (0, ColdRoomModel_1.getColdRooms)();
    }
    async getColdRoomById(id) {
        return await (0, ColdRoomModel_1.getColdRoomById)(id);
    }
    async updateColdRoom(id, coldRoomData) {
        await (0, ColdRoomModel_1.updateColdRoom)(id, coldRoomData);
    }
    async deleteColdRoom(id) {
        await (0, ColdRoomModel_1.deleteColdRoom)(id);
    }
}
exports.ColdRoomService = ColdRoomService;
