"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coldRoomController_1 = require("../controllers/coldRoomController");
const multer_1 = __importDefault(require("multer"));
const cloudinaryConfig_1 = require("../config/cloudinaryConfig"); // Ensure the path is correct
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: cloudinaryConfig_1.storage }); // Use Cloudinary storage for multer
const coldRoomController = new coldRoomController_1.ColdRoomController();
router.post('/', upload.single('image'), coldRoomController.createColdRoom);
router.get('/', coldRoomController.getColdRooms);
router.get('/:id', coldRoomController.getColdRoomById);
router.put('/:id', upload.single('image'), coldRoomController.updateColdRoom);
router.delete('/:id', coldRoomController.deleteColdRoom);
exports.default = router;
