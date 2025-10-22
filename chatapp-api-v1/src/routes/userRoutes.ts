import express from "express";

import * as userController from "../controllers/userController";
import upload from "../middlewares/upload";
import auth from "../middlewares/authMiddleware";

const router = express.Router();

// Get all users
router.get("/", auth as any, userController.getAllUsers);

// Get online users
router.get("/online", auth as any, userController.getOnlineUsers);

// Update profile picture
router.put(
  "/profile-picture",
  auth as any,
  upload.single("profile_picture"),
  userController.updateProfilePicture
);

export default router;
