import express, { RequestHandler } from 'express';
import { login, register } from '../controllers/auth.controllers';

const router = express.Router();

router.post('/register', register as RequestHandler);
router.post('/login', login as RequestHandler);

export default router;
