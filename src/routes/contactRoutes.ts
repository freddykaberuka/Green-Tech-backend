import { Router } from 'express';
import { submitContactQuery } from '../controllers/contactController';

const router = Router();

router.post('/submit-query', submitContactQuery);

export default router;
