import express, { RequestHandler } from 'express';
import { login, register } from '../controllers/auth.controllers';
import upload from '../config/multer';
const router = express.Router();

router.post('/register',upload.single('avatar') , register as RequestHandler);
router.post('/login', login as RequestHandler);

export default router;
