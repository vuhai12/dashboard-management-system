import { Router } from "express";
import {
  getWeeklyRevenuesController,
  createRevenueController,
  updateRevenueController,
  getRevenueDashboardController,
} from "../controllers/revenueController.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import { isAdmin } from "../middlewares/verifyRole.js";

const router = Router();

router.get("/week", verifyAccessToken, isAdmin, getWeeklyRevenuesController);

router.post("/week", verifyAccessToken, isAdmin, createRevenueController);

router.patch("/week/:id", verifyAccessToken, isAdmin, updateRevenueController);

router.get("/dashboard", getRevenueDashboardController);

export default router;
