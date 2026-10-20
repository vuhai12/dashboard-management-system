import { loginService } from "../services/authService.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  try {
    const { username, password } = req.body ?? {};

    // Validate input
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !username.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    // Call service
    const result = await loginService(username, password);

    // Set refresh token cookie
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/api/auth",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Return response
    return res.status(200).json({
      message: "Login successful",
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    console.error("Login error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export function getCurrentUser(req, res) {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
}

export const refreshAccessToken = (req, res) => {
  const { id, role } = req.user;

  const accessToken = jwt.sign(
    {
      id,
      role,
      type: "access",
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN },
  );

  return res.status(200).json({
    success: true,
    message: "Access token refreshed successfully",
    data: {
      accessToken,
    },
  });
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "lax",
    path: "/api/auth",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
