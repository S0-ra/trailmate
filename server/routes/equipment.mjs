import express from "express";
import {
  createEquipment,
  getEquipment,
  getEquipmentDetails,
  modifyEquipment,
  removeEquipment,
  searchEquipment,
  getAllImagesByEquipmentId,
  getPrimaryImageByEquipmentId,
  getAvgRating,
  getReviewCount,
} from "../controllers/equipmentController.mjs";
import { authenticateToken, authorizeRoles } from "../middleware/auth.mjs";
import { getRating } from "../models/equipment.mjs";
import db from "../config/db.mjs";

const router = express.Router();

router.get("/", getEquipment);
router.get("/:id", getEquipmentDetails);
router.get("/search", searchEquipment);
router.get("/:equipmentid/images", getAllImagesByEquipmentId);
router.get("/:equipmentid/images/primary", getPrimaryImageByEquipmentId);
router.get("/:id/average-rating", getAvgRating);
router.get("/:id/reviews/count", getReviewCount);

router.post(
  "/",
  authenticateToken,
  authorizeRoles(["admin", "vendor"]),
  createEquipment
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin", "vendor"]),
  modifyEquipment
);
router.delete("/:id", removeEquipment);

router.get("/rating/:equipmentId", async (req, res) => {
  try {
    const { equipmentId } = req.params;
    const result = await getRating(equipmentId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error occured while getting rating" });
  }
});

router.get("/price/:equipmentId", async (req, res) => {
  try {
    const { equipmentId } = req.params;

    // Query using db.one to ensure exactly one result is returned
    const result = await db.one('SELECT price FROM equipment WHERE equipmentid = $1', [equipmentId]);

    // Send the price directly from the result
    res.json({ price: result.price });
  } catch (err) {
    console.error("Error fetching price:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;
