import { Router } from 'express';
import { ColdRoomController } from '../controllers/coldRoomController';
import multer from 'multer';
import { storage } from '../config/cloudinaryConfig'; // Ensure the path is correct

const router = Router();
const upload = multer({ storage }); // Use Cloudinary storage for multer

const coldRoomController = new ColdRoomController();

router.post('/', upload.single('image'), coldRoomController.createColdRoom);
router.get('/', coldRoomController.getColdRooms);
router.get('/:id', coldRoomController.getColdRoomById);
router.put('/:id', upload.single('image'), coldRoomController.updateColdRoom);
router.delete('/:id', coldRoomController.deleteColdRoom);

export default router;
