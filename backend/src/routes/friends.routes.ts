import { Router } from "express";
import {
  sendFriendRequest,
  getFriends,
  getFriendRequests,
  acceptFriendRequest,
  removeFriend,
} from "../controllers/friendship.controllers";
import { authenticate } from "../middlewares/auth";

const friendsRouter = Router();


friendsRouter.post("/add", authenticate, sendFriendRequest);

friendsRouter.get("/", authenticate, getFriends);

friendsRouter.get("/requests", authenticate, getFriendRequests);

friendsRouter.patch("/accept/:requestId", authenticate, acceptFriendRequest);

friendsRouter.delete("/remove/:friendId", authenticate, removeFriend);

export default friendsRouter;

