import express from "express";
import db from "../config/db.mjs";
import {
  registerUser,
  loginUser,
  getUserDetails,
  updateUser,
  deleteUser,
} from "../controllers/userController.mjs";
import { authenticateToken, authorizeRoles } from "../middleware/auth.mjs";
import { getAllUsers } from "../models/user.mjs";
import { message } from "antd";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/count", async (req, res) => {
  try {
    const result = await db.one("SELECT COUNT(*) AS total_users FROM users");
    const totalUsers = parseInt(result.total_users, 10);

    res.status(200).json({
      success: true,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching total user count:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch total user count.",
    });
  }
});

router.get("/users/:id", getUserDetails);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/users/count", async (req, res) => {
  try {
    const result = await db.one("SELECT COUNT(*) AS total_users FROM users");
    const totalUsers = parseInt(result.total_users, 10);

    res.status(200).json({
      success: true,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching total user count:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch total user count.",
    });
  }
});

router.get("/users/name/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const result = await db.oneOrNone(
      "SELECT name from users where userid=$1",
      [userid]
    );
    res.status(200).json(result);
  } catch (error) {
    console.log("Error fetching user name");
    res.status(500).json({ message: "Failed to get username" });
  }
});

router.get("/all-users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
});



export default router;
