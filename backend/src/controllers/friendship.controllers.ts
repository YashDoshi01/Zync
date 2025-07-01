// src/controllers/friend.ts
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';

const prisma = new PrismaClient();

export const sendFriendRequest = async (req: AuthenticatedRequest, res: Response) => {
  const { friendId } = req.body;
  const userId = req.user?.id;
  
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (userId === friendId) {
    return res.status(400).json({ error: "You cannot friend yourself." });
  }

  try {
    const existing = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });

    if (existing) {
      return res.status(400).json({ error: "Friend request already sent or already friends." });
    }

    const newRequest = await prisma.friendship.create({
      data: {
        userId,
        friendId,
        status: "PENDING",
      },
    });

    return res.status(201).json({ message: "Friend request sent.", request: newRequest });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

export const acceptFriendRequest = async (req: AuthenticatedRequest, res: Response) => {
  const { requestId } = req.params;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const request = await prisma.friendship.findUnique({ where: { id: requestId } });
  console.log(request);

  if (!request || request.friendId === userId || request.status !== "PENDING") {
    return res.status(400).json({ error: "Invalid friend request." });
  }

  const accepted = await prisma.friendship.update({
    where: { id: requestId },
    data: { status: "ACCEPTED" },
  });

  return res.status(200).json({ message: "Friend request accepted", friend: accepted });
};
export const getFriends = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const friends = await prisma.friendship.findMany({
    where: {
      OR: [
        { userId, status: "ACCEPTED" },
        { friendId: userId, status: "ACCEPTED" },
      ],
    },
  });

  return res.status(200).json({ friends });
};
export const getFriendRequests = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const requests = await prisma.friendship.findMany({
    where: {
      friendId: userId,
      status: "PENDING",
    },
  });

  return res.status(200).json({ requests });
};
export const removeFriend = async (req: AuthenticatedRequest, res: Response) => {
  const { friendId } = req.params;
  const userId = req.user?.id;

  const existing = await prisma.friendship.findFirst({
    where: {
      OR: [
        { userId, friendId, status: "ACCEPTED" },
        { userId: friendId, friendId: userId, status: "ACCEPTED" },
      ],
    },
  });

  if (!existing) return res.status(404).json({ error: "Friend not found." });

  await prisma.friendship.delete({ where: { id: existing.id } });

  return res.status(200).json({ message: "Friend removed" });
};

