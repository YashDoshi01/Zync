import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import friendsRouter from './routes/friends.routes';
dotenv.config();        

const app = express();
app.use(cors());
app.use(express.json());
    
app.use('/api/auth', authRoutes);
app.use('/api/friends', friendsRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
