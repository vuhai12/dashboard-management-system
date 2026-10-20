import bcrypt from "bcrypt";
import User from "../models/User.js";

export async function initializeAdmin() {
  const existingAdmin = await User.findOne({
    where: { name: "admin" },
  });

  if (existingAdmin) {
    console.log("Admin account already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin", 10);

  await User.create({
    name: "admin",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Default admin account created.");
}
