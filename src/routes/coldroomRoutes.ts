import { Router } from 'express';
import { ColdRoomController } from '../controllers/coldRoomController';

const router = Router();
const coldRoomController = new ColdRoomController();

router.post('/', coldRoomController.createColdRoom);
router.get('/', coldRoomController.getColdRooms);
router.get('/:id', coldRoomController.getColdRoomById);
router.put('/:id', coldRoomController.updateColdRoom);
router.delete('/:id', coldRoomController.deleteColdRoom);

export default router;
