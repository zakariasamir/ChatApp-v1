import express from "express";

import * as roomController from "../controllers/roomController";
import auth from "../middlewares/authMiddleware";
import { validateCreateRoom } from "../middlewares/validator";

const router = express.Router();

// Get all rooms
router.get("/", auth as any, roomController.getAllRooms);

// Create room
router.post("/", auth as any, validateCreateRoom, roomController.createRoom);

export default router;
