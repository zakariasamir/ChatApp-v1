import express from "express";

import * as authController from "../controllers/authController";
import upload from "../middlewares/upload";
import auth from "../middlewares/authMiddleware";
import { validateRegister, validateLogin } from "../middlewares/validator";

const router = express.Router();

// Register user
router.post(
  "/register",
  upload.single("profile_picture"),
  validateRegister,
  authController.register
);

// Login user
router.post("/login", validateLogin, authController.login);

// Logout user
router.post("/logout", auth as any, authController.logout);

// Get current user
router.get("/me", auth as any, authController.getCurrentUser);

export default router;
