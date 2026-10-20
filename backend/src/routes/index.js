import { Router } from "express";
import revenueRoutes from "./revenueRoutes.js";
import authRoutes from "./authRoutes.js";

const router = Router();

router.use("/revenues", revenueRoutes);
router.use("/auth", authRoutes);

export default router;
