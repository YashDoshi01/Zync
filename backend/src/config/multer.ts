// config/multer.ts
import multer from 'multer';

const storage = multer.memoryStorage(); // using memory for buffer upload to Cloudinary
const upload = multer({ storage });

export default upload;
