import express from "express";
import { createReview, listReviews } from "../controllers/reviewController.mjs";
import { authenticateToken } from "../middleware/auth.mjs";
import db from '../config/db.mjs'

const router = express.Router();

router.post("/", authenticateToken, createReview);
router.get("/:equipmentid", listReviews);

router.delete('/:id', async (req, res) => {
    const reviewId = req.params.id;
    try {
      await db.none('DELETE FROM reviews WHERE reviewid = $1', [reviewId]);
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ message: 'Error deleting review' });
    }
  });

export default router;
