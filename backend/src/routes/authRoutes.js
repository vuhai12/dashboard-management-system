import { Router } from "express";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import { isAdmin } from "../middlewares/verifyRole.js";
import {
  refreshAccessToken,
  logout,
  login,
  getCurrentUser,
} from "../controllers/authController.js";
import { verifyRefreshToken } from "../middlewares/verifyRefreshToken.js";

const router = Router();

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", verifyRefreshToken, refreshAccessToken);

router.get("/me", verifyAccessToken, isAdmin, getCurrentUser);

export default router;
