import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import cloudinary from '../config/cloudinary';
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "secretbro";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, dob } = req.body;

    if (!username || !email || !password || !dob || !req.file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if username or email is taken
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already in use' });
    }

    const result = await cloudinary.uploader.upload_stream(
      { folder: 'avatars' },
      async (error, result) => {
        if (error || !result) {
          return res.status(500).json({ message: 'Failed to upload avatar' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            dob: new Date(dob),
            avatarUrl: result.secure_url,
          },
        });

        res.status(201).json({ message: 'User registered successfully', user });
      }
    );

    result.end(req.file.buffer); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }

};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
